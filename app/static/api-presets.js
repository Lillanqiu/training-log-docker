const apiPresetList = document.querySelector("#api-preset-list");
const quickApiPresetSelect = document.querySelector("#quick-api-select");
const addApiPresetButton = document.querySelector("#add-api-preset");
const apiFormatInput = document.querySelector("#api-format");
const apiBaseUrlInput = document.querySelector("#api-base-url");
const apiKeyField = document.querySelector("#api-key-field");
const apiKeyInput = document.querySelector("#api-key");
const apiModelInput = document.querySelector("#api-model");
const apiModelsInput = document.querySelector("#api-models");
const apiGpuModelInput = document.querySelector("#api-gpu-model");
const applyModelGroupButton = document.querySelector("#apply-model-group");
const fetchModelsButton = document.querySelector("#fetch-models");
const modelGroupStatus = document.querySelector("#model-group-status");

const savedConfigPresetName = "当前保存配置";
const ollamaLocalBaseUrl = "http://host.docker.internal:11434";
const defaultApiPresets = [
  {
    name: "OpenAI 官方",
    format: "openai",
    base_url: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    models: ["gpt-4.1-mini", "gpt-4.1", "gpt-4o-mini"],
    builtin: true,
  },
  {
    name: "本机 OpenAI 兼容",
    format: "openai",
    base_url: "http://localhost:1234/v1",
    model: "local-model",
    models: ["local-model"],
    builtin: true,
  },
  {
    name: "Ollama 本机",
    format: "ollama",
    base_url: ollamaLocalBaseUrl,
    model: "gemma4:latest",
    models: ["gemma4:latest", "gemma4:31b", "gemma4:26b"],
    builtin: true,
  },
  {
    name: "DeepSeek 兼容",
    format: "openai",
    base_url: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
    models: ["deepseek-chat", "deepseek-reasoner"],
    builtin: true,
  },
];
const defaultPresetNames = new Set(defaultApiPresets.map((preset) => preset.name));

let apiPresets = loadApiPresets();
let selectedApiPresetName = "";
let isApplyingApiPreset = false;

renderApiPresets();
updateModelOptions(readModelGroup());
syncApiKeyVisibility();

window.addEventListener("api-config-loaded", (event) => {
  syncApiPresetStateAfterLoad(event.detail || {});
});

apiModelsInput.addEventListener("input", () => {
  updateModelOptions(readModelGroup());
  modelGroupStatus.textContent = "模型组已修改，点击“确定模型组”后生效。";
  modelGroupStatus.className = "";
});

apiFormatInput.addEventListener("change", () => {
  if (isApplyingApiPreset) return;
  selectedApiPresetName = "";
  renderApiPresets();
  syncApiKeyVisibility();
  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
});

applyModelGroupButton.addEventListener("click", () => {
  applyModelGroup();
});

fetchModelsButton.addEventListener("click", () => {
  fetchAvailableModels();
});

addApiPresetButton.addEventListener("click", () => {
  const name = window.prompt("新建 API 配置名称");
  if (!name) return;
  const value = name.trim();
  if (!value) return;
  if (defaultPresetNames.has(value)) {
    window.alert("系统预设名称不能重复，请换一个名称。");
    return;
  }
  const preset = upsertApiPreset({
    ...readCurrentApiPreset(),
    name: value,
    builtin: false,
  });
  if (!preset) return;
  selectedApiPresetName = preset.name;
  renderApiPresets();
  applyApiPreset(preset);
});

apiPresetList.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const target = event.target.closest(".preset-chip");
  if (!target) return;
  const preset = findApiPreset(target.dataset.name);
  if (!preset || preset.builtin) {
    window.alert("系统预设不能删除。");
    return;
  }
  if (!window.confirm(`删除 API 配置 ${preset.name}？`)) return;
  apiPresets = apiPresets.filter((item) => item.name !== preset.name);
  if (selectedApiPresetName === preset.name) selectedApiPresetName = "";
  saveApiPresets();
  renderApiPresets();
});

quickApiPresetSelect?.addEventListener("change", () => {
  const preset = findApiPreset(quickApiPresetSelect.value);
  if (preset) applyApiPreset(preset);
});

window.saveCurrentApiPreset = function saveCurrentApiPreset() {
  const current = readCurrentApiPreset();
  const selectedPreset = findApiPreset(selectedApiPresetName);
  const matchingPreset = findBestPresetMatch(current);
  let targetPreset = null;

  if (selectedPreset && !selectedPreset.builtin) {
    targetPreset = upsertApiPreset({
      ...current,
      name: selectedPreset.name,
      builtin: false,
    });
  } else if (matchingPreset?.builtin) {
    selectedApiPresetName = matchingPreset.name;
    saveApiPresets();
    targetPreset = matchingPreset;
  } else if (matchingPreset) {
    targetPreset = upsertApiPreset({
      ...matchingPreset,
      ...current,
      name: matchingPreset.name,
      builtin: false,
    });
  } else {
    targetPreset = upsertApiPreset({
      ...current,
      name: savedConfigPresetName,
      builtin: false,
    });
  }

  if (!targetPreset) {
    const fallback = findBestPresetMatch(current);
    if (!fallback) return false;
    targetPreset = fallback;
  }

  selectedApiPresetName = targetPreset.name;
  renderApiPresets();
  const status = document.querySelector("#api-test-status");
  if (status) {
    status.className = "ok-text";
    status.textContent = `已保存到配置：${targetPreset.name}`;
  }
  return true;
};

function loadApiPresets() {
  let saved = [];
  try {
    const raw = JSON.parse(window.localStorage.getItem("apiPresets") || "[]");
    if (Array.isArray(raw)) saved = raw;
  } catch {
    saved = [];
  }
  const merged = canonicalizeApiPresets(saved);
  window.localStorage.setItem("apiPresets", JSON.stringify(merged));
  return merged;
}

function saveApiPresets() {
  apiPresets = canonicalizeApiPresets(apiPresets);
  if (selectedApiPresetName && !findApiPreset(selectedApiPresetName)) {
    selectedApiPresetName = "";
  }
  window.localStorage.setItem("apiPresets", JSON.stringify(apiPresets));
}

function canonicalizeApiPresets(presets) {
  const normalized = [];
  const seenNames = new Set();
  const seenConnections = new Set();

  function pushPreset(preset, { allowReservedName = false } = {}) {
    const item = normalizeApiPreset(preset);
    if (!item) return null;
    if (!allowReservedName && defaultPresetNames.has(item.name)) return null;
    const connectionKey = presetConnectionKey(item);
    if (seenNames.has(item.name) || seenConnections.has(connectionKey)) return null;
    seenNames.add(item.name);
    seenConnections.add(connectionKey);
    normalized.push(item);
    return item;
  }

  defaultApiPresets.forEach((preset) => {
    pushPreset({ ...preset, builtin: true }, { allowReservedName: true });
  });

  (Array.isArray(presets) ? presets : []).forEach((preset) => {
    pushPreset({ ...preset, builtin: false });
  });

  return orderApiPresets(normalized);
}

function normalizeApiPreset(preset) {
  const name = String(preset?.name || "").trim();
  const format = preset?.format === "ollama" ? "ollama" : "openai";
  const base_url = normalizePresetBaseUrl(preset?.base_url, format);
  let models = normalizeModelListForFormat(preset?.models || preset?.model || "", format);
  let model = normalizeModelName(String(preset?.model || "").trim(), format);

  if (!name) return null;
  if (isDeprecatedApiPreset({ name, format, base_url })) return null;
  if (!model && models.length) model = models[0];
  if (model && !models.includes(model)) {
    models = normalizeModelListForFormat([model, ...models], format);
  }
  if (format === "ollama" && !model) {
    model = defaultApiPresets.find((presetItem) => presetItem.name === "Ollama 本机")?.model || "";
    if (model && !models.includes(model)) {
      models = normalizeModelListForFormat([model, ...models], format);
    }
  }
  if (!base_url && !model && !models.length) return null;

  return {
    name,
    format,
    base_url,
    model,
    models,
    api_key: format === "ollama" ? "" : String(preset?.api_key || ""),
    gpu_model: format === "ollama" ? String(preset?.gpu_model || "").trim() : "",
    builtin: Boolean(preset?.builtin),
  };
}

function normalizePresetBaseUrl(baseUrl, format) {
  let value = String(baseUrl || "").trim().replace(/\/+$/, "");
  if (format !== "ollama") return value;
  if (/^https?:\/\/(?:localhost|127\.0\.0\.1):11434$/i.test(value)) {
    return ollamaLocalBaseUrl;
  }
  return value;
}

function isDeprecatedApiPreset(preset) {
  if (!preset || preset.format !== "ollama") return false;
  if (/网关|云端/i.test(String(preset.name || ""))) return true;
  return /^https?:\/\/(?:host\.docker\.internal|127\.0\.0\.1|localhost):11435$/i.test(String(preset.base_url || ""));
}

function presetConnectionKey(preset) {
  return [preset.format || "", preset.base_url || "", preset.model || ""].join("|").toLowerCase();
}

function renderApiPresets() {
  const activeName = selectedApiPresetName;
  const visiblePresets = orderedApiPresets();
  apiPresetList.replaceChildren(
    ...visiblePresets.map((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `preset-chip${preset.name === activeName ? " active" : ""}`;
      button.dataset.name = preset.name;
      button.title = preset.builtin
        ? "系统预设：点击即可应用"
        : "左键应用；右键删除；保存配置会写入这里";
      button.textContent = preset.name;
      button.addEventListener("click", () => applyApiPreset(preset));
      return button;
    })
  );

  if (quickApiPresetSelect) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "请选择 API 配置";
    quickApiPresetSelect.replaceChildren(
      placeholder,
      ...visiblePresets.map((preset) => {
        const option = document.createElement("option");
        option.value = preset.name;
        option.textContent = preset.name;
        return option;
      })
    );
    quickApiPresetSelect.value = visiblePresets.some((preset) => preset.name === activeName) ? activeName : "";
  }
}

function orderedApiPresets() {
  return orderApiPresets(apiPresets);
}

function orderApiPresets(presets) {
  const priority = new Map([
    ["OpenAI 官方", 0],
    ["本机 OpenAI 兼容", 1],
    ["Ollama 本机", 2],
    ["DeepSeek 兼容", 3],
    [savedConfigPresetName, 4],
  ]);

  return [...presets].sort((left, right) => {
    const leftPriority = priority.has(left.name) ? priority.get(left.name) : 10;
    const rightPriority = priority.has(right.name) ? priority.get(right.name) : 10;
    if (leftPriority !== rightPriority) return leftPriority - rightPriority;
    if (left.builtin !== right.builtin) return left.builtin ? -1 : 1;
    return left.name.localeCompare(right.name, "zh-CN");
  });
}

function applyApiPreset(preset) {
  const models = normalizeModelListForFormat(preset.models || preset.model || "", preset.format || "openai");
  const mergedConfig = {
    ...preset,
    models,
    model: preset.model || models[0] || "",
  };

  withApiPresetGuard(() => {
    selectedApiPresetName = preset.name;
    applyConfigToForm(mergedConfig, { preserveBuiltinKey: true });
    const status = document.querySelector("#api-test-status");
    if (status) {
      status.className = preset.builtin ? "" : "ok-text";
      status.textContent = preset.builtin ? `已应用系统预设：${preset.name}` : `已选择配置：${preset.name}`;
    }
    renderApiPresets();
    window.updateApiSummary?.();
    window.syncOllamaModelControls?.();
    window.dispatchEvent(new CustomEvent("api-preset-applied", { detail: { name: preset.name } }));
  });
}

function applyConfigToForm(config, options = {}) {
  const format = config.format || "openai";
  const model = normalizeModelName(config.model || "", format);
  const models = normalizeModelListForFormat(config.models || model || "", format);

  apiFormatInput.value = format;
  apiBaseUrlInput.value = normalizePresetBaseUrl(config.base_url || "", format);
  if (!options.preserveBuiltinKey || !config.builtin) {
    apiKeyInput.value = format === "ollama" ? "" : (config.api_key || "");
  } else if (format === "ollama") {
    apiKeyInput.value = "";
  }
  if (apiGpuModelInput) {
    apiGpuModelInput.value = format === "ollama" ? (config.gpu_model || "") : "";
  }
  apiModelsInput.value = models.join("\n");
  replaceModelOptions(models, model || models[0] || "");
  syncApiKeyVisibility();
}

function withApiPresetGuard(callback) {
  isApplyingApiPreset = true;
  try {
    callback();
  } finally {
    isApplyingApiPreset = false;
  }
}

window.syncApiPresetStateAfterLoad = syncApiPresetStateAfterLoad;

function syncApiPresetStateAfterLoad(config = {}) {
  const normalizedConfig = normalizeLoadedConfig(config);
  const matchingPreset = findBestPresetMatch(normalizedConfig);

  if (matchingPreset) {
    selectedApiPresetName = matchingPreset.name;
    if (!matchingPreset.builtin) {
      const mergedPreset = upsertApiPreset({
        ...matchingPreset,
        ...normalizedConfig,
        name: matchingPreset.name,
        builtin: false,
        models: normalizeModelListForFormat(
          [
            ...(matchingPreset.models || []),
            ...(normalizedConfig.models || []),
            normalizedConfig.model || "",
          ],
          normalizedConfig.format
        ),
      });
      if (mergedPreset) selectedApiPresetName = mergedPreset.name;
    } else {
      saveApiPresets();
    }
    applyConfigToForm(
      {
        ...matchingPreset,
        ...normalizedConfig,
        models: normalizeModelListForFormat(
          [
            ...(matchingPreset.models || []),
            ...(normalizedConfig.models || []),
            normalizedConfig.model || "",
          ],
          normalizedConfig.format
        ),
      },
      { preserveBuiltinKey: false }
    );
  } else if (normalizedConfig.base_url || normalizedConfig.model) {
    const savedPreset = upsertApiPreset({
      ...normalizedConfig,
      name: savedConfigPresetName,
      builtin: false,
    });
    if (savedPreset) {
      selectedApiPresetName = savedPreset.name;
      applyConfigToForm(savedPreset, { preserveBuiltinKey: false });
    }
  } else {
    selectedApiPresetName = "";
  }

  renderApiPresets();
  syncApiKeyVisibility();
  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
}

function normalizeLoadedConfig(config = {}) {
  const format = config.format === "ollama" ? "ollama" : "openai";
  let base_url = normalizePresetBaseUrl(config.base_url || "", format);
  let model = normalizeModelName(config.model || "", format);
  let models = normalizeModelListForFormat(config.models || model || "", format);

  if (format === "ollama" && (!base_url || isDeprecatedApiPreset({ name: "", format, base_url }))) {
    base_url = ollamaLocalBaseUrl;
  }
  if (format === "ollama" && !model) {
    model = defaultApiPresets.find((preset) => preset.name === "Ollama 本机")?.model || "";
  }
  if (model && !models.includes(model)) {
    models = normalizeModelListForFormat([model, ...models], format);
  }

  return {
    format,
    base_url,
    model,
    models,
    api_key: format === "ollama" ? "" : String(config.api_key || ""),
    gpu_model: format === "ollama" ? String(config.gpu_model || "").trim() : "",
  };
}

function findBestPresetMatch(config = {}) {
  const format = config.format || "openai";
  const baseUrl = normalizePresetBaseUrl(config.base_url || "", format);
  const model = normalizeModelName(config.model || "", format);

  return apiPresets.find((preset) =>
    preset.format === format && preset.base_url === baseUrl && preset.model === model
  ) || apiPresets.find((preset) =>
    preset.format === format && preset.base_url === baseUrl
  ) || null;
}

function upsertApiPreset(preset) {
  const normalized = normalizeApiPreset(preset);
  if (!normalized) return null;

  apiPresets = apiPresets.filter((item) => item.name !== normalized.name);
  apiPresets.push(normalized);
  saveApiPresets();

  return findApiPreset(normalized.name) || findBestPresetMatch(normalized);
}

function readCurrentApiPreset() {
  const format = apiFormatInput.value === "ollama" ? "ollama" : "openai";
  const model = normalizeModelName(apiModelInput.value, format);
  const models = normalizeModelListForFormat([...readModelGroup(), model], format);

  return {
    format,
    base_url: normalizePresetBaseUrl(apiBaseUrlInput.value, format),
    api_key: format === "ollama" ? "" : apiKeyInput.value,
    model,
    gpu_model: format === "ollama" ? (apiGpuModelInput?.value.trim() || "") : "",
    models,
  };
}

function syncApiKeyVisibility() {
  const isOllama = apiFormatInput.value === "ollama";
  apiKeyField.classList.remove("hidden");
  apiKeyInput.disabled = false;
  apiKeyInput.placeholder = isOllama ? "Ollama 本地接口可留空" : "sk-...";
}

function findApiPreset(name) {
  return apiPresets.find((preset) => preset.name === name) || null;
}

function readModelGroup() {
  return normalizeModelList(apiModelsInput.value);
}

function normalizeModelList(value) {
  return normalizeModelListForFormat(value, apiFormatInput.value);
}

function normalizeModelListForFormat(value, format = apiFormatInput.value) {
  const raw = Array.isArray(value) ? value.join("\n") : String(value || "");
  const seen = new Set();
  const models = [];

  raw.split(/[\n,，;；]+/).forEach((item) => {
    const model = normalizeModelName(item.trim(), format);
    if (!model || seen.has(model)) return;
    seen.add(model);
    models.push(model);
  });

  return models;
}

function normalizeModelName(model, format = apiFormatInput.value) {
  const trimmed = String(model || "").trim();
  if (!trimmed) return "";
  if (format !== "ollama") return trimmed;
  if (isDeprecatedOllamaModel(trimmed)) return "";

  if (trimmed.includes(":")) {
    return trimmed;
  }

  const suffixes = ["latest", "128b", "72b", "70b", "32b", "31b", "27b", "26b", "14b", "13b", "8b", "7b", "4b", "3b", "1.5b"];
  const lower = trimmed.toLowerCase();
  const suffix = suffixes.find((item) => lower.endsWith(item) && trimmed.length > item.length);
  return suffix ? `${trimmed.slice(0, -suffix.length)}:${trimmed.slice(-suffix.length)}` : trimmed;
}

function isDeprecatedOllamaModel(model) {
  const value = String(model || "").trim().toLowerCase();
  return /(?:^|:|-)(?:cloud)$/.test(value) || /-cloud$/.test(value);
}

function updateModelOptions(models, preferredModel = "") {
  const currentModel = normalizeModelName(preferredModel || apiModelInput.value, apiFormatInput.value);
  const normalizedModels = normalizeModelList(models);
  const optionModels = normalizedModels.length ? normalizedModels : normalizeModelList(currentModel);
  replaceModelOptions(optionModels, currentModel);
}

function replaceModelOptions(optionModels, currentModel = "") {
  apiModelInput.replaceChildren(
    ...optionModels.map((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      return option;
    })
  );

  if (currentModel && optionModels.includes(currentModel)) {
    apiModelInput.value = currentModel;
  } else if (optionModels.length) {
    apiModelInput.value = optionModels[0];
  } else {
    apiModelInput.value = "";
  }

  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
}

function applyModelGroup() {
  const models = readModelGroup();
  if (!models.length) {
    modelGroupStatus.className = "error-text";
    modelGroupStatus.textContent = "请先填写至少一个模型。";
    return false;
  }
  updateModelOptions(models);
  if (!models.includes(apiModelInput.value.trim())) {
    apiModelInput.value = models[0];
  }
  modelGroupStatus.className = "ok-text";
  modelGroupStatus.textContent = `已确定 ${models.length} 个模型，当前模型：${apiModelInput.value}`;
  return true;
}

async function fetchAvailableModels() {
  fetchModelsButton.disabled = true;
  modelGroupStatus.className = "";
  modelGroupStatus.textContent = "正在获取模型...";
  try {
    const response = await postJsonWithRetry("/api/models", readApiConfig());
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "获取模型失败");
    }
    const format = apiFormatInput.value === "ollama" ? "ollama" : "openai";
    const models = normalizeModelListForFormat(payload.models || [], format);
    if (!models.length) {
      throw new Error("接口没有返回可用模型。");
    }
    apiModelsInput.value = models.join("\n");
    updateModelOptions(models);
    if (!models.includes(apiModelInput.value.trim())) {
      apiModelInput.value = models[0];
    }
    saveFetchedModelsToPreset(models);
    modelGroupStatus.className = "ok-text";
    modelGroupStatus.textContent = payload.message || `已获取 ${models.length} 个模型。`;
  } catch (error) {
    modelGroupStatus.className = "error-text";
    modelGroupStatus.textContent = humanFetchError(error);
  } finally {
    fetchModelsButton.disabled = false;
  }
}

function saveFetchedModelsToPreset(models) {
  const preset = findApiPreset(selectedApiPresetName);
  if (!preset || preset.builtin) return;
  const current = readCurrentApiPreset();
  Object.assign(preset, current, {
    name: preset.name,
    builtin: false,
    model: apiModelInput.value,
    models: normalizeModelListForFormat(models, current.format),
  });
  saveApiPresets();
  renderApiPresets();
}

window.exportApiPresetBackup = function exportApiPresetBackup() {
  return apiPresets.filter((preset) => !preset.builtin);
};

window.importApiPresetBackup = function importApiPresetBackup(presets) {
  if (!Array.isArray(presets)) return;
  apiPresets = canonicalizeApiPresets([
    ...apiPresets.filter((preset) => !preset.builtin),
    ...presets.map((preset) => ({ ...preset, builtin: false })),
  ]);
  selectedApiPresetName = "";
  saveApiPresets();
  renderApiPresets();
};
