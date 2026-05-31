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

const defaultApiPresets = [
  { name: "OpenAI 官方", format: "openai", base_url: "https://api.openai.com/v1", model: "gpt-4.1-mini", models: ["gpt-4.1-mini", "gpt-4.1", "gpt-4o-mini"], builtin: true },
  { name: "本机 OpenAI 兼容", format: "openai", base_url: "http://localhost:1234/v1", model: "local-model", models: ["local-model"], builtin: true },
  { name: "Ollama 本机", format: "ollama", base_url: "http://localhost:11434", model: "qwen2.5:7b", models: ["qwen2.5:7b", "qwen2.5:14b", "llama3.1:8b"], builtin: true },
  { name: "DeepSeek 兼容", format: "openai", base_url: "https://api.deepseek.com/v1", model: "deepseek-chat", models: ["deepseek-chat", "deepseek-reasoner"], builtin: true },
];

let apiPresets = loadApiPresets();
let selectedApiPresetName = "";
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
  applyPresetForFormat(apiFormatInput.value);
  syncApiKeyVisibility();
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
  const existing = apiPresets.find((preset) => preset.name === value);
  if (existing?.builtin) {
    window.alert("系统预设不能覆盖，请换一个名称。");
    return;
  }
  const preset = {
    ...readCurrentApiPreset(),
    name: value,
    builtin: false,
  };
  apiPresets = apiPresets.filter((item) => item.name !== value);
  apiPresets.push(preset);
  selectedApiPresetName = value;
  saveApiPresets();
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
  const preset = findApiPreset(selectedApiPresetName);
  const status = document.querySelector("#api-test-status");
  if (!preset || preset.builtin) {
    if (status) {
      status.className = "error-text";
      status.textContent = "请先点击“新建配置”，选中新建的 API 配置后再保存。";
    }
    return false;
  }
  Object.assign(preset, readCurrentApiPreset(), { name: preset.name, builtin: false });
  saveApiPresets();
  renderApiPresets();
  if (status) {
    status.className = "ok-text";
    status.textContent = `已保存到配置：${preset.name}`;
  }
  return true;
};

function loadApiPresets() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("apiPresets") || "[]");
    if (Array.isArray(saved) && saved.length) {
      const normalized = saved.map((preset) => ({
        name: String(preset.name || "").trim(),
        format: preset.format || "openai",
        base_url: preset.base_url || "",
        model: preset.model || "",
        models: normalizeModelList(preset.models || preset.model || ""),
        api_key: preset.api_key || "",
        gpu_model: preset.gpu_model || "",
        builtin: Boolean(preset.builtin) || defaultApiPresets.some((defaultPreset) => defaultPreset.name === String(preset.name || "").trim()),
      })).filter((preset) => preset.name);
      return mergeDefaultPresets(normalized);
    }
  } catch {
    // Ignore invalid localStorage content.
  }
  return [...defaultApiPresets];
}

function mergeDefaultPresets(saved) {
  const savedNames = new Set(saved.map((preset) => preset.name));
  const missingDefaults = defaultApiPresets.filter((preset) => !savedNames.has(preset.name));
  return [...missingDefaults, ...saved];
}

function saveApiPresets() {
  window.localStorage.setItem("apiPresets", JSON.stringify(apiPresets));
}

window.exportApiPresetBackup = function exportApiPresetBackup() {
  return apiPresets.filter((preset) => !preset.builtin);
};

window.importApiPresetBackup = function importApiPresetBackup(presets) {
  if (!Array.isArray(presets)) return;
  const normalized = presets.map((preset) => ({
    name: String(preset.name || "").trim(),
    format: preset.format || "openai",
    base_url: preset.base_url || "",
    model: preset.model || "",
    models: normalizeModelList(preset.models || preset.model || ""),
    api_key: preset.api_key || "",
    gpu_model: preset.gpu_model || "",
    builtin: false,
  })).filter((preset) => preset.name);
  apiPresets = mergeDefaultPresets(normalized);
  selectedApiPresetName = "";
  saveApiPresets();
  renderApiPresets();
};

function renderApiPresets() {
  const activeName = selectedApiPresetName;
  const visiblePresets = apiPresets.filter((preset) => !(preset.builtin && preset.format === "ollama"));
  apiPresetList.replaceChildren(
    ...visiblePresets.map((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `preset-chip${preset.name === activeName ? " active" : ""}`;
      button.dataset.name = preset.name;
      button.title = preset.builtin ? "系统预设：只能应用，不能覆盖或删除" : "左键应用；右键删除；保存配置会写入这里";
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

function applyApiPreset(preset) {
  selectedApiPresetName = preset.name;
  apiFormatInput.value = preset.format || "openai";
  apiBaseUrlInput.value = preset.base_url || "";
  const models = normalizeModelList(preset.models || preset.model || "");
  apiModelsInput.value = models.join("\n");
  updateModelOptions(models, preset.model || models[0] || "");
  if (!preset.builtin) {
    apiKeyInput.value = preset.format === "ollama" ? "" : preset.api_key || "";
  }
  if (apiGpuModelInput) {
    apiGpuModelInput.value = preset.format === "ollama" ? preset.gpu_model || "" : "";
  }
  syncApiKeyVisibility();
  const status = document.querySelector("#api-test-status");
  if (status) {
    status.className = preset.builtin ? "" : "ok-text";
    status.textContent = preset.builtin ? `已应用系统预设：${preset.name}` : `已选择配置：${preset.name}`;
  }
  renderApiPresets();
  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
  window.dispatchEvent(new CustomEvent("api-preset-applied", { detail: { name: preset.name } }));
}

function applyPresetForFormat(format) {
  const currentPreset = findApiPreset(selectedApiPresetName);
  if (currentPreset?.format === format) return;
  if (format === "ollama") {
    const ollamaPreset = apiPresets.find((preset) => preset.format === "ollama");
    if (ollamaPreset) applyApiPreset(ollamaPreset);
    return;
  }
  const openaiPreset = apiPresets.find((preset) => preset.name === "OpenAI 官方") || apiPresets.find((preset) => preset.format === "openai");
  if (openaiPreset) applyApiPreset(openaiPreset);
}

window.syncApiPresetStateAfterLoad = syncApiPresetStateAfterLoad;

function syncApiPresetStateAfterLoad(config = {}) {
  const format = config.format || apiFormatInput.value || "openai";
  const baseUrl = config.base_url || apiBaseUrlInput.value || "";
  const model = config.model || apiModelInput.value || "";
  const matchingPreset = findMatchingPreset(format, baseUrl);
  if (matchingPreset) {
    selectedApiPresetName = matchingPreset.name;
    const models = normalizeModelList([...(matchingPreset.models || []), matchingPreset.model || "", model]);
    apiModelsInput.value = models.join("\n");
    updateModelOptions(models, model || matchingPreset.model || models[0] || "");
  } else {
    selectedApiPresetName = "";
    const models = normalizeModelList(readModelGroup().concat(model));
    apiModelsInput.value = models.join("\n");
    updateModelOptions(models, model);
  }
  syncApiKeyVisibility();
  renderApiPresets();
  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
}

function readCurrentApiPreset() {
  const models = normalizeModelList(readModelGroup().concat(apiModelInput.value));
  const apiFormat = apiFormatInput.value;
  return {
    format: apiFormat,
    base_url: apiBaseUrlInput.value,
    api_key: apiFormat === "ollama" ? "" : apiKeyInput.value,
    model: apiModelInput.value,
    gpu_model: apiFormat === "ollama" ? apiGpuModelInput?.value.trim() || "" : "",
    models,
  };
}

function syncApiKeyVisibility() {
  const isOllama = apiFormatInput.value === "ollama";
  apiKeyField.classList.toggle("hidden", isOllama);
  apiKeyInput.disabled = isOllama;
  if (isOllama) {
    apiKeyInput.value = "";
  }
}

function findApiPreset(name) {
  return apiPresets.find((preset) => preset.name === name);
}

function findMatchingPreset(format, baseUrl) {
  return apiPresets.find((preset) => preset.format === format && preset.base_url === baseUrl) ||
    apiPresets.find((preset) => preset.format === format && !baseUrl);
}

function readModelGroup() {
  return normalizeModelList(apiModelsInput.value);
}

function normalizeModelList(value) {
  const raw = Array.isArray(value) ? value.join("\n") : String(value || "");
  const seen = new Set();
  const models = [];
  raw.split(/[\n,，;；]+/).forEach((item) => {
    const model = normalizeOllamaModelName(item.trim());
    if (!model || seen.has(model)) return;
    seen.add(model);
    models.push(model);
  });
  return models;
}

function normalizeOllamaModelName(model) {
  if (apiFormatInput.value !== "ollama" || model.includes(":")) return model;
  const suffixes = ["latest", "128b", "72b", "70b", "32b", "31b", "27b", "26b", "14b", "13b", "8b", "7b", "4b", "3b", "1.5b"];
  const lower = model.toLowerCase();
  const suffix = suffixes.find((item) => lower.endsWith(item) && model.length > item.length);
  return suffix ? `${model.slice(0, -suffix.length)}:${model.slice(-suffix.length)}` : model;
}

function updateModelOptions(models, preferredModel = "") {
  const currentModel = (preferredModel || apiModelInput.value).trim();
  const normalizedModels = normalizeModelList(models);
  const optionModels = normalizedModels.length ? normalizedModels : normalizeModelList(currentModel);
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
    const models = normalizeModelList(payload.models || []);
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
  Object.assign(preset, current, { name: preset.name, builtin: false, model: apiModelInput.value, models });
  saveApiPresets();
  renderApiPresets();
}
