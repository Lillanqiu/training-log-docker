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
const geminiTierFilterField = document.querySelector("#gemini-tier-filter-field");
const geminiTierFilterInput = document.querySelector("#gemini-tier-filter");
const geminiPurposeFilterField = document.querySelector("#gemini-purpose-filter-field");
const geminiPurposeFilterInput = document.querySelector("#gemini-purpose-filter");
const applyModelGroupButton = document.querySelector("#apply-model-group");
const fetchModelsButton = document.querySelector("#fetch-models");
const modelGroupStatus = document.querySelector("#model-group-status");

const savedConfigPresetName = "当前保存配置";
const ollamaLocalBaseUrl = "http://host.docker.internal:11434";
const geminiOfficialBaseUrl = "https://generativelanguage.googleapis.com/v1beta";
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
    name: "Google Gemini 官方",
    format: "gemini",
    base_url: geminiOfficialBaseUrl,
    model: "gemini-3.5-flash",
    gemini_tier_filter: "free",
    gemini_purpose_filter: "text",
    models: [
      "gemini-3.5-flash",
      "gemini-3-flash",
      "gemini-3.1-flash-lite",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-2.5-flash-tts",
      "gemini-3.1-flash-tts",
      "gemini-robotics-er-1.6-preview",
      "gemini-robotics-er-1.5-preview",
      "gemma-4-26b",
      "gemma-4-31b",
      "gemini-2.5-pro",
      "gemini-3.1-pro-preview",
      "computer-use-preview",
      "nano-banana",
    ],
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
const geminiFreeTierModelIds = new Set([
  "gemini-3.5-flash",
  "gemini-3-flash",
  "gemini-3.1-flash-lite",
  "gemini-3.1-flash-tts",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash-tts",
  "gemini-2.5-flash-lite-preview-09-2025",
  "gemini-robotics-er-1.6-preview",
  "gemini-robotics-er-1.5-preview",
  "gemma-4-26b",
  "gemma-4-31b",
]);
const geminiRestrictedTierModelIds = new Set([
  "computer-use-preview",
  "nano-banana",
  "gemini-2.5-pro",
  "gemini-3.1-pro-preview",
  "gemini-3.1-pro-preview-customtools",
]);
const deprecatedGeminiModelPrefixes = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];
const legacyGeminiAliasIds = new Set([
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
]);
const legacyGeminiPreviewPrefixes = [
  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite-preview",
  "gemini-2.5-flash-lite-preview",
];
const rawModelCatalogByFormat = Object.create(null);

let apiPresets = loadApiPresets();
let selectedApiPresetName = "";
let isApplyingApiPreset = false;

renderApiPresets();
rememberModelCatalog(readModelGroup());
updateModelOptions(readModelGroup());
syncApiKeyVisibility();
syncGeminiTierFilterControls();

window.addEventListener("api-config-loaded", (event) => {
  syncApiPresetStateAfterLoad(event.detail || {});
});

apiModelsInput.addEventListener("input", () => {
  rememberModelCatalog(readModelGroup());
  updateModelOptions(readModelGroup());
  modelGroupStatus.textContent = "模型组已修改，点击“确定模型组”后生效。";
  modelGroupStatus.className = "";
});

apiFormatInput.addEventListener("change", () => {
  if (isApplyingApiPreset) return;
  selectedApiPresetName = "";
  renderApiPresets();
  syncApiKeyVisibility();
  syncGeminiTierFilterControls();
  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
});

geminiTierFilterInput?.addEventListener("change", () => {
  applyGeminiTierFilterToCurrentCatalog();
});

geminiPurposeFilterInput?.addEventListener("change", () => {
  applyGeminiTierFilterToCurrentCatalog();
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

function normalizeApiFormat(format) {
  const value = String(format || "").trim().toLowerCase();
  return ["openai", "gemini", "ollama"].includes(value) ? value : "openai";
}

function isOllamaFormat(format) {
  return normalizeApiFormat(format) === "ollama";
}

function normalizeGeminiTierFilter(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "paid") return "restricted";
  return ["all", "free", "restricted"].includes(normalized) ? normalized : "free";
}

function normalizeGeminiPurposeFilter(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return ["text", "tts", "image", "computer_use", "robotics", "gemma", "other", "all"].includes(normalized)
    ? normalized
    : "text";
}

function normalizeGeminiModelId(model) {
  const value = String(model || "").trim();
  return value.toLowerCase().startsWith("models/") ? value.slice(7) : value;
}

function isDeprecatedGeminiModel(model) {
  const normalized = normalizeGeminiModelId(model).toLowerCase();
  return deprecatedGeminiModelPrefixes.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}-`));
}

function isLegacyGeminiAliasModel(model) {
  const normalized = normalizeGeminiModelId(model).toLowerCase();
  return legacyGeminiAliasIds.has(normalized) || legacyGeminiPreviewPrefixes.some((prefix) => normalized.startsWith(prefix));
}

function isVisibleGeminiModel(model) {
  const normalized = normalizeGeminiModelId(model).toLowerCase();
  if (!normalized) return false;
  return !isDeprecatedGeminiModel(normalized) && !isLegacyGeminiAliasModel(normalized);
}

function geminiModelPurpose(model) {
  const normalized = normalizeGeminiModelId(model).toLowerCase();
  if (!normalized) return "other";
  if (normalized.includes("computer-use")) return "computer_use";
  if (normalized.includes("robotics")) return "robotics";
  if (normalized.startsWith("gemma")) return "gemma";
  if (normalized.includes("tts") || normalized.includes("native-audio")) return "tts";
  if (normalized.includes("nano-banana") || normalized.includes("preview-image") || normalized.includes("imagen") || normalized.includes("-image")) {
    return "image";
  }
  if (
    normalized.startsWith("gemini")
    && !normalized.includes("robotics")
    && !normalized.includes("computer-use")
    && !normalized.includes("tts")
    && !normalized.includes("image")
  ) {
    return "text";
  }
  return "other";
}

function geminiModelMatchesPurpose(model, purposeFilter = normalizeGeminiPurposeFilter(geminiPurposeFilterInput?.value)) {
  const purpose = geminiModelPurpose(model);
  if (purposeFilter === "all") return true;
  if (purposeFilter === "text") {
    return purpose === "text" || purpose === "gemma";
  }
  return purpose === purposeFilter;
}

function geminiModelTier(model) {
  const normalized = normalizeGeminiModelId(model).toLowerCase();
  if (geminiFreeTierModelIds.has(normalized)) return "free";
  if (geminiRestrictedTierModelIds.has(normalized)) return "restricted";
  if (normalized.includes("computer-use")) return "restricted";
  if (normalized.includes("nano-banana") || normalized.includes("preview-image")) return "restricted";
  if (normalized.includes("-pro") && !normalized.includes("flash")) return "restricted";
  if (normalized.includes("robotics")) return "free";
  if (normalized.startsWith("gemma")) return "free";
  if (normalized.includes("tts")) return "free";
  if (normalized.includes("flash")) return "free";
  return "unknown";
}

function rememberModelCatalog(models, format = normalizeApiFormat(apiFormatInput.value)) {
  const normalized = normalizeModelListForFormat(models, format);
  rawModelCatalogByFormat[format] = format === "gemini"
    ? normalized.filter((model) => isVisibleGeminiModel(model))
    : normalized;
}

function geminiTierFilterLabel(filter = normalizeGeminiTierFilter(geminiTierFilterInput?.value)) {
  if (filter === "free") return "当前免费层可用";
  if (filter === "restricted") return "显示但当前层无配额";
  return "全部";
}

function geminiPurposeFilterLabel(filter = normalizeGeminiPurposeFilter(geminiPurposeFilterInput?.value)) {
  if (filter === "text") return "文本生成";
  if (filter === "tts") return "TTS / 语音输出";
  if (filter === "image") return "图片 / 图像";
  if (filter === "computer_use") return "Computer Use";
  if (filter === "robotics") return "Robotics";
  if (filter === "gemma") return "Gemma 开放模型";
  if (filter === "other") return "其他模型";
  return "全部用途";
}

function countGeminiModelsByTier(models) {
  return normalizeModelListForFormat(models, "gemini").reduce((counts, model) => {
    if (!isVisibleGeminiModel(model)) return counts;
    counts[geminiModelTier(model)] += 1;
    return counts;
  }, { free: 0, restricted: 0, unknown: 0 });
}

function countGeminiModelsByPurpose(models) {
  return normalizeModelListForFormat(models, "gemini").reduce((counts, model) => {
    if (!isVisibleGeminiModel(model)) return counts;
    const purpose = geminiModelPurpose(model);
    counts[purpose] = (counts[purpose] || 0) + 1;
    if (purpose === "gemma") {
      counts.text = (counts.text || 0) + 1;
    }
    return counts;
  }, { text: 0, tts: 0, image: 0, computer_use: 0, robotics: 0, gemma: 0, other: 0 });
}

function filterGeminiModelsByTier(models, tierFilter = normalizeGeminiTierFilter(geminiTierFilterInput?.value)) {
  const normalized = normalizeModelListForFormat(models, "gemini").filter((model) => isVisibleGeminiModel(model));
  if (tierFilter === "all") return normalized;
  return normalized.filter((model) => geminiModelTier(model) === tierFilter);
}

function filterGeminiModelsByPurpose(models, purposeFilter = normalizeGeminiPurposeFilter(geminiPurposeFilterInput?.value)) {
  const normalized = normalizeModelListForFormat(models, "gemini").filter((model) => isVisibleGeminiModel(model));
  if (purposeFilter === "all") return normalized;
  return normalized.filter((model) => geminiModelMatchesPurpose(model, purposeFilter));
}

function visibleModelsForFormat(models, format = normalizeApiFormat(apiFormatInput.value)) {
  const normalized = normalizeModelListForFormat(models, format);
  if (format !== "gemini") return normalized;
  return filterGeminiModelsByPurpose(filterGeminiModelsByTier(normalized));
}

function syncGeminiTierFilterControls() {
  const isGemini = normalizeApiFormat(apiFormatInput.value) === "gemini";
  geminiTierFilterField?.classList.toggle("hidden", !isGemini);
  geminiPurposeFilterField?.classList.toggle("hidden", !isGemini);
  if (geminiTierFilterInput) geminiTierFilterInput.disabled = !isGemini;
  if (geminiPurposeFilterInput) geminiPurposeFilterInput.disabled = !isGemini;
  if (!isGemini) return;
  applyGeminiTierFilterToCurrentCatalog({ silent: true });
}

function applyGeminiTierFilterToCurrentCatalog({ silent = false } = {}) {
  if (normalizeApiFormat(apiFormatInput.value) !== "gemini") return;
  const rawModels = rawModelCatalogByFormat.gemini?.length
    ? rawModelCatalogByFormat.gemini
    : normalizeModelListForFormat(apiModelsInput.value, "gemini");
  const visibleModels = filterGeminiModelsByTier(rawModels);
  const filteredByPurpose = filterGeminiModelsByPurpose(visibleModels);
  const tierCounts = countGeminiModelsByTier(rawModels);
  const purposeCounts = countGeminiModelsByPurpose(rawModels);
  apiModelsInput.value = filteredByPurpose.join("\n");
  updateModelOptions(filteredByPurpose, apiModelInput.value.trim());
  if (silent) return;
  modelGroupStatus.className = filteredByPurpose.length ? "ok-text" : "";
  if (!filteredByPurpose.length && rawModels.length) {
    modelGroupStatus.textContent = `当前过滤条件下没有匹配模型。已识别免费层 ${tierCounts.free} 个、当前层无配额 ${tierCounts.restricted} 个；文本 ${purposeCounts.text}、TTS ${purposeCounts.tts}、图片 ${purposeCounts.image}。`;
    return;
  }
  modelGroupStatus.textContent = `当前按“${geminiTierFilterLabel()} + ${geminiPurposeFilterLabel()}”显示 ${filteredByPurpose.length} 个模型。`;
}

function normalizeApiPreset(preset) {
  const name = String(preset?.name || "").trim();
  const format = normalizeApiFormat(preset?.format);
  const gemini_tier_filter = normalizeGeminiTierFilter(preset?.gemini_tier_filter);
  const gemini_purpose_filter = normalizeGeminiPurposeFilter(preset?.gemini_purpose_filter);
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
    api_key: isOllamaFormat(format) ? "" : String(preset?.api_key || ""),
    gpu_model: isOllamaFormat(format) ? String(preset?.gpu_model || "").trim() : "",
    gemini_tier_filter,
    gemini_purpose_filter,
    builtin: Boolean(preset?.builtin),
  };
}

function normalizePresetBaseUrl(baseUrl, format) {
  let value = String(baseUrl || "").trim().replace(/\/+$/, "");
  if (format === "gemini" && /^https?:\/\/generativelanguage\.googleapis\.com$/i.test(value)) {
    return geminiOfficialBaseUrl;
  }
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
    ["Google Gemini 官方", 1],
    ["本机 OpenAI 兼容", 2],
    ["Ollama 本机", 3],
    ["DeepSeek 兼容", 4],
    [savedConfigPresetName, 5],
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
  const models = normalizeModelListForFormat(preset.models || preset.model || "", normalizeApiFormat(preset.format));
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
  const format = normalizeApiFormat(config.format);
  const geminiTierFilter = normalizeGeminiTierFilter(config.gemini_tier_filter);
  const geminiPurposeFilter = normalizeGeminiPurposeFilter(config.gemini_purpose_filter);
  const model = normalizeModelName(config.model || "", format);
  const models = normalizeModelListForFormat(config.models || model || "", format);

  apiFormatInput.value = format;
  if (geminiTierFilterInput) {
    geminiTierFilterInput.value = geminiTierFilter;
  }
  if (geminiPurposeFilterInput) {
    geminiPurposeFilterInput.value = geminiPurposeFilter;
  }
  apiBaseUrlInput.value = normalizePresetBaseUrl(config.base_url || "", format);
  if (!options.preserveBuiltinKey || !config.builtin) {
    apiKeyInput.value = isOllamaFormat(format) ? "" : (config.api_key || "");
  } else if (isOllamaFormat(format)) {
    apiKeyInput.value = "";
  }
  if (apiGpuModelInput) {
    apiGpuModelInput.value = isOllamaFormat(format) ? (config.gpu_model || "") : "";
  }
  rememberModelCatalog(models, format);
  const visibleModels = visibleModelsForFormat(models, format);
  apiModelsInput.value = visibleModels.join("\n");
  replaceModelOptions(visibleModels, model || visibleModels[0] || "");
  syncApiKeyVisibility();
  syncGeminiTierFilterControls();
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
        gemini_tier_filter: normalizedConfig.gemini_tier_filter || matchingPreset.gemini_tier_filter || "free",
        gemini_purpose_filter: normalizedConfig.gemini_purpose_filter || matchingPreset.gemini_purpose_filter || "text",
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
        gemini_tier_filter: normalizedConfig.gemini_tier_filter || matchingPreset.gemini_tier_filter || "free",
        gemini_purpose_filter: normalizedConfig.gemini_purpose_filter || matchingPreset.gemini_purpose_filter || "text",
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
  syncGeminiTierFilterControls();
  window.updateApiSummary?.();
  window.syncOllamaModelControls?.();
}

function normalizeLoadedConfig(config = {}) {
  const format = normalizeApiFormat(config.format);
  let base_url = normalizePresetBaseUrl(config.base_url || "", format);
  let model = normalizeModelName(config.model || "", format);
  let models = normalizeModelListForFormat(config.models || model || "", format);

  if (format === "ollama" && (!base_url || isDeprecatedApiPreset({ name: "", format, base_url }))) {
    base_url = ollamaLocalBaseUrl;
  }
  if (format === "gemini" && !base_url) {
    base_url = geminiOfficialBaseUrl;
  }
  if (format === "ollama" && !model) {
    model = defaultApiPresets.find((preset) => preset.name === "Ollama 本机")?.model || "";
  }
  if (format === "gemini" && !model) {
    model = defaultApiPresets.find((preset) => preset.name === "Google Gemini 官方")?.model || "";
  }
  if (model && !models.includes(model)) {
    models = normalizeModelListForFormat([model, ...models], format);
  }

  return {
    format,
    base_url,
    model,
    models,
    api_key: isOllamaFormat(format) ? "" : String(config.api_key || ""),
    gpu_model: isOllamaFormat(format) ? String(config.gpu_model || "").trim() : "",
    gemini_tier_filter: Object.prototype.hasOwnProperty.call(config, "gemini_tier_filter")
      ? normalizeGeminiTierFilter(config.gemini_tier_filter)
      : (format === "gemini" ? "free" : ""),
    gemini_purpose_filter: Object.prototype.hasOwnProperty.call(config, "gemini_purpose_filter")
      ? normalizeGeminiPurposeFilter(config.gemini_purpose_filter)
      : (format === "gemini" ? "text" : ""),
  };
}

function findBestPresetMatch(config = {}) {
  const format = normalizeApiFormat(config.format);
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
  const format = normalizeApiFormat(apiFormatInput.value);
  const model = normalizeModelName(apiModelInput.value, format);
  const sourceModels = format === "gemini"
    ? (rawModelCatalogByFormat.gemini?.length ? rawModelCatalogByFormat.gemini : [...readModelGroup(), model])
    : [...readModelGroup(), model];
  const models = normalizeModelListForFormat(sourceModels, format);

  return {
    format,
    base_url: normalizePresetBaseUrl(apiBaseUrlInput.value, format),
    api_key: isOllamaFormat(format) ? "" : apiKeyInput.value,
    model,
    gpu_model: isOllamaFormat(format) ? (apiGpuModelInput?.value.trim() || "") : "",
    gemini_tier_filter: normalizeGeminiTierFilter(geminiTierFilterInput?.value),
    gemini_purpose_filter: normalizeGeminiPurposeFilter(geminiPurposeFilterInput?.value),
    models,
  };
}

function syncApiKeyVisibility() {
  const format = normalizeApiFormat(apiFormatInput.value);
  const isOllama = isOllamaFormat(format);
  apiKeyField.classList.remove("hidden");
  apiKeyInput.disabled = false;
  apiKeyInput.placeholder = isOllama
    ? "Ollama 本地接口可留空"
    : (format === "gemini" ? "AIza..." : "sk-...");
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
  const format = normalizeApiFormat(apiFormatInput.value);
  const models = readModelGroup();
  if (!models.length) {
    modelGroupStatus.className = "error-text";
    modelGroupStatus.textContent = "请先填写至少一个模型。";
    return false;
  }
  rememberModelCatalog(models, format);
  const visibleModels = visibleModelsForFormat(models, format);
  if (!visibleModels.length) {
    modelGroupStatus.className = "error-text";
    modelGroupStatus.textContent = "当前过滤条件下没有匹配模型，请切换 Gemini 可用性/用途过滤后再试。";
    return false;
  }
  apiModelsInput.value = visibleModels.join("\n");
  updateModelOptions(visibleModels);
  if (!visibleModels.includes(apiModelInput.value.trim())) {
    apiModelInput.value = visibleModels[0];
  }
  modelGroupStatus.className = "ok-text";
  if (format === "gemini") {
    const tierCounts = countGeminiModelsByTier(models);
    const purposeCounts = countGeminiModelsByPurpose(models);
    modelGroupStatus.textContent = `已确定 ${models.length} 个 Gemini 模型；当前按“${geminiTierFilterLabel()} + ${geminiPurposeFilterLabel()}”显示 ${visibleModels.length} 个（免费层 ${tierCounts.free} / 当前层无配额 ${tierCounts.restricted} / 文本 ${purposeCounts.text} / TTS ${purposeCounts.tts} / 图片 ${purposeCounts.image}）。`;
  } else {
    modelGroupStatus.textContent = `已确定 ${visibleModels.length} 个模型，当前模型：${apiModelInput.value}`;
  }
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
    const format = normalizeApiFormat(apiFormatInput.value);
    const models = normalizeModelListForFormat(payload.models || [], format);
    if (!models.length) {
      throw new Error("接口没有返回可用模型。");
    }
    rememberModelCatalog(models, format);
    const visibleModels = visibleModelsForFormat(models, format);
    if (!visibleModels.length) {
      throw new Error(`接口已返回模型，但当前过滤条件“${geminiTierFilterLabel()} + ${geminiPurposeFilterLabel()}”下没有可显示项。`);
    }
    apiModelsInput.value = visibleModels.join("\n");
    updateModelOptions(visibleModels);
    if (!visibleModels.includes(apiModelInput.value.trim())) {
      apiModelInput.value = visibleModels[0];
    }
    saveFetchedModelsToPreset(models);
    modelGroupStatus.className = "ok-text";
    if (format === "gemini") {
      const tierCounts = countGeminiModelsByTier(models);
      const purposeCounts = countGeminiModelsByPurpose(models);
      modelGroupStatus.textContent = `已获取 ${models.length} 个 Gemini 模型；当前按“${geminiTierFilterLabel()} + ${geminiPurposeFilterLabel()}”显示 ${visibleModels.length} 个（免费层 ${tierCounts.free} / 当前层无配额 ${tierCounts.restricted}${tierCounts.unknown ? ` / 未归类 ${tierCounts.unknown}` : ""} / 文本 ${purposeCounts.text} / TTS ${purposeCounts.tts} / 图片 ${purposeCounts.image} / Computer Use ${purposeCounts.computer_use} / Robotics ${purposeCounts.robotics} / Gemma ${purposeCounts.gemma}）。`;
    } else {
      modelGroupStatus.textContent = payload.message || `已获取 ${visibleModels.length} 个模型。`;
    }
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
