const form = document.querySelector("#fill-form");
const workspace = document.querySelector(".workspace");
const workspaceResizer = document.querySelector("#workspace-resizer");
const loginScreen = document.querySelector("#login-screen");
const appShell = document.querySelector("#app-shell");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");
const currentUserName = document.querySelector("#current-user-name");
const logoutButton = document.querySelector("#logout-button");
const results = document.querySelector("#results");
const statusPill = document.querySelector("#ai-status");
const copyButton = document.querySelector("#copy-json");
const saveConfigButton = document.querySelector("#save-config-now");
const testApiButton = document.querySelector("#test-api");
const preloadModelButton = document.querySelector("#preload-model");
const restartModelButton = document.querySelector("#restart-model");
const unloadModelButton = document.querySelector("#unload-model");
const apiTestStatus = document.querySelector("#api-test-status");
const downloadSlot = document.querySelector("#download-slot");
const generatedUserNote = document.querySelector("#generated-user-note");
const historyList = document.querySelector("#generation-history-list");
const historyStatus = document.querySelector("#history-status");
const historyRefreshButton = document.querySelector("#history-refresh");
const historyWriterFilter = document.querySelector("#history-writer-filter");
const historyUseWriterButton = document.querySelector("#history-use-writer");
const batchProgressPanel = document.querySelector("#batch-progress");
const batchProgressTitle = document.querySelector("#batch-progress-title");
const batchProgressCount = document.querySelector("#batch-progress-count");
const batchProgressFill = document.querySelector("#batch-progress-fill");
const batchProgressDetail = document.querySelector("#batch-progress-detail");
const cancelBatchButton = document.querySelector("#cancel-batch");
const resumePanel = document.querySelector("#resume-panel");
const resumeStatus = document.querySelector("#resume-status");
const resumeRefreshButton = document.querySelector("#resume-refresh");
const resumeJobList = document.querySelector("#resume-job-list");
const previewPanel = document.querySelector("#preview-panel");
const previewList = document.querySelector("#preview-list");
const previewConfirmed = document.querySelector("#preview-confirmed");
const importPlanButton = document.querySelector("#import-plan");
const parsePlanFileButton = document.querySelector("#parse-plan-file");
const planFileStatus = document.querySelector("#plan-file-status");
const openRequirementsButton = document.querySelector("#open-requirements");
const importStatus = document.querySelector("#import-status");
const planPicker = document.querySelector("#plan-picker");
const planRecords = document.querySelector("#plan-records");
const toggleAllRecordsButton = document.querySelector("#toggle-all-records");
const selectedRecordsInput = document.querySelector("#selected-records");
const selectedModulesInput = document.querySelector("#selected-modules");
const moduleTeacherMapInput = document.querySelector("#module-teacher-map");
const manualModuleInput = document.querySelector("#manual-module");
const defaultCoachSelect = document.querySelector("#default-coach");
const linkModuleTeacherInput = document.querySelector("#link-module-teacher");
const legacyModuleChecks = [...document.querySelectorAll(".module-check")];
const moduleList = document.querySelector("#module-list");
const teacherList = document.querySelector("#teacher-list");
const addModuleButton = document.querySelector("#add-module");
const addTeacherButton = document.querySelector("#add-teacher");
const apiSettingsToggle = document.querySelector("#api-settings-toggle");
const apiSettingsPanel = document.querySelector("#api-settings-panel");
const apiSettingsClose = document.querySelector("#api-settings-close");
const settingsCancelButton = document.querySelector("#settings-cancel");
const settingsSaveCloseButton = document.querySelector("#settings-save-close");
const settingsCard = document.querySelector(".settings-card");
const quickApiSettingsDetailButton = document.querySelector("#quick-api-settings-detail");
const quickApiTestButton = document.querySelector("#quick-api-test");
const quickPreloadModelButton = document.querySelector("#quick-preload-model");
const quickRestartModelButton = document.querySelector("#quick-restart-model");
const quickUnloadModelButton = document.querySelector("#quick-unload-model");
const gpuModelField = document.querySelector("#gpu-model-field");
const gpuModelInput = document.querySelector("#api-gpu-model");
const gpuOptions = document.querySelector("#gpu-options");
const gpuActions = document.querySelector("#gpu-actions");
const fetchGpusButton = document.querySelector("#fetch-gpus");
const gpuStatus = document.querySelector("#gpu-status");
const currentApiSummary = document.querySelector("#current-api-summary");
const quickApiTestStatus = document.querySelector("#quick-api-test-status");
const requirePasswordInput = document.querySelector("#require-password");
const authSettingsStatus = document.querySelector("#auth-settings-status");
const exportAccountDataButton = document.querySelector("#export-account-data");
const restoreAccountDataButton = document.querySelector("#restore-account-data");
const restoreAccountFileInput = document.querySelector("#restore-account-file");
const accountBackupStatus = document.querySelector("#account-backup-status");
const templateFileInput = document.querySelector("#file");
const previewTemplateButton = document.querySelector("#preview-template");
const templatePreviewStatus = document.querySelector("#template-preview-status");
const templatePreviewPanel = document.querySelector("#template-preview-panel");
const templatePreviewName = document.querySelector("#template-preview-name");
const templatePreviewFields = document.querySelector("#template-preview-fields");
const templatePreviewText = document.querySelector("#template-preview-text");
const promptPresetSelect = document.querySelector("#prompt-preset-select");
const newPromptPresetButton = document.querySelector("#new-prompt-preset");
const savePromptPresetButton = document.querySelector("#save-prompt-preset");
const deletePromptPresetButton = document.querySelector("#delete-prompt-preset");
const setDefaultPromptPresetButton = document.querySelector("#set-default-prompt-preset");
const promptPresetStatus = document.querySelector("#prompt-preset-status");
const skillsPresetSelect = document.querySelector("#skills-preset-select");
const newSkillsPresetButton = document.querySelector("#new-skills-preset");
const saveSkillsPresetButton = document.querySelector("#save-skills-preset");
const deleteSkillsPresetButton = document.querySelector("#delete-skills-preset");
const setDefaultSkillsPresetButton = document.querySelector("#set-default-skills-preset");
const skillsPresetStatus = document.querySelector("#skills-preset-status");
const customModeInput = document.querySelector("#custom-mode");
const promptModeButton = document.querySelector("#prompt-mode");
const skillsModeButton = document.querySelector("#skills-mode");
const promptSourceControls = [...document.querySelectorAll(".prompt-source")];
const skillsSourceControls = [...document.querySelectorAll(".skills-source")];
const customPromptInput = document.querySelector("#custom-prompt");
const customSkillsInput = document.querySelector("#custom-skills");
const batchModeInput = document.querySelector("#batch-mode");
const manualModeButton = document.querySelector("#manual-mode");
const batchFillModeButton = document.querySelector("#batch-fill-mode");
const requirementsSourceModeInput = document.querySelector("#requirements-source-mode");
const requirementsLinkModeButton = document.querySelector("#requirements-link-mode");
const requirementsTextModeButton = document.querySelector("#requirements-text-mode");
const manualFillPanels = [...document.querySelectorAll(".manual-fill-panel")];
const autoFillPanels = [...document.querySelectorAll(".auto-fill-panel")];
const requirementsLinkSourceControls = [...document.querySelectorAll(".requirements-link-source")];
const requirementsTextSourceControls = [...document.querySelectorAll(".requirements-text-source")];
const planSourceControls = [
  "#requirements-source-mode",
  "#requirements-url",
  "#requirements-text",
  "#requirements-cookie",
  "#requirements-user-agent",
  "#requirements-referer",
  "#plan-file",
  "#form-schema",
].map((selector) => document.querySelector(selector)).filter(Boolean);

let modules = ["A", "B", "C"];
let teachers = ["A模块老师", "B模块老师", "C模块老师"];
let moduleTeacherMap = {};

let lastPayload = null;
let importedRecords = [];
let importedPlanSignature = "";
let batchProgressTimer = null;
let currentBatchJobId = "";
let batchPollFailures = 0;
const DEFAULT_BATCH_POLL_DELAY = 1200;
let currentBatchPollDelay = DEFAULT_BATCH_POLL_DELAY;
const criticalClickBindings = new WeakSet();
let promptPresets = loadPromptPresets();
let skillsPresets = loadSkillsPresets();
let generationDefault = loadGenerationDefault();

bindTopActionButtons();
loadSavedConfig();
renderPromptPresets(generationDefault.prompt_preset);
renderSkillsPresets(generationDefault.skills_preset);
applyPromptPreset(promptPresetSelect.value, { silent: true });
applySkillsPreset(skillsPresetSelect.value, { silent: true });
setCustomMode(generationDefault.mode, { silent: true });
renderModuleTeacherControls();
apiSettingsPanel.classList.add("hidden");
if (new URLSearchParams(window.location.search).get("settings") === "1") {
  apiSettingsPanel.classList.remove("hidden");
}
setRequirementsSourceMode("text", { silent: true });
setFillMode(true);
updateApiSummary();
syncOllamaModelControls();
initAuth();
initWorkspaceResizer();
moveGenerationSettingsToSettingsPanel();

function bindCriticalClick(element, handler) {
  if (!element || criticalClickBindings.has(element)) return;
  criticalClickBindings.add(element);
  element.addEventListener("click", handler);
}

function restoreTopActionButtons() {
  [
    batchFillModeButton,
    manualModeButton,
    requirementsTextModeButton,
    requirementsLinkModeButton,
    quickApiSettingsDetailButton,
    quickApiTestButton,
    importPlanButton,
    parsePlanFileButton,
  ].forEach((button) => {
    if (!button) return;
    button.disabled = false;
    button.removeAttribute("aria-disabled");
  });
}

function bindTopActionButtons() {
  bindCriticalClick(batchFillModeButton, () => setFillMode(true));
  bindCriticalClick(manualModeButton, () => setFillMode(false));
  bindCriticalClick(requirementsLinkModeButton, () => setRequirementsSourceMode("link"));
  bindCriticalClick(requirementsTextModeButton, () => setRequirementsSourceMode("text"));
  bindCriticalClick(quickApiSettingsDetailButton, () => {
    apiSettingsPanel?.classList.remove("hidden");
  });
  bindCriticalClick(quickApiTestButton, () => runApiTest());
  bindCriticalClick(importPlanButton, async () => {
    await importPlan();
  });
  bindCriticalClick(parsePlanFileButton, async () => {
    await parseUploadedPlanFile();
  });
  restoreTopActionButtons();
}

function moveGenerationSettingsToSettingsPanel() {
  if (!settingsCard || !customModeInput || settingsCard.querySelector("#generation-settings")) return;
  const controls = [
    customModeInput.closest(".custom-mode"),
    promptPresetSelect?.closest(".prompt-presets"),
    customPromptInput?.closest("label"),
    skillsPresetSelect?.closest(".prompt-presets"),
    customSkillsInput?.closest("label"),
  ].filter(Boolean);
  if (!controls.length) return;

  const section = document.createElement("section");
  section.id = "generation-settings";
  section.className = "generation-settings";
  const title = document.createElement("h3");
  title.textContent = "生成要求";
  section.append(title, ...controls);
  const footer = settingsCard.querySelector(".settings-footer");
  if (footer) {
    settingsCard.insertBefore(section, footer);
  } else {
    settingsCard.append(section);
  }
}

function initWorkspaceResizer() {
  if (!workspace || !workspaceResizer) return;
  restoreWorkspaceLeftWidth();
  window.requestAnimationFrame(restoreWorkspaceLeftWidth);
  window.setTimeout(restoreWorkspaceLeftWidth, 250);

  let dragStartX = 0;
  let dragStartWidth = 0;

  workspaceResizer.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 820px)").matches) return;
    event.preventDefault();
    dragStartX = event.clientX;
    dragStartWidth = form.getBoundingClientRect().width;
    workspace.classList.add("resizing");
    workspaceResizer.setPointerCapture(event.pointerId);
  });

  workspaceResizer.addEventListener("pointermove", (event) => {
    if (!workspace.classList.contains("resizing")) return;
    setWorkspaceLeftWidth(dragStartWidth + event.clientX - dragStartX);
  });

  workspaceResizer.addEventListener("pointerup", (event) => {
    workspace.classList.remove("resizing");
    if (workspaceResizer.hasPointerCapture(event.pointerId)) {
      workspaceResizer.releasePointerCapture(event.pointerId);
    }
  });

  workspaceResizer.addEventListener("pointercancel", () => {
    workspace.classList.remove("resizing");
  });

  workspaceResizer.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const bounds = workspaceResizeBounds();
    const current = form.getBoundingClientRect().width;
    if (event.key === "Home") setWorkspaceLeftWidth(bounds.min);
    if (event.key === "End") setWorkspaceLeftWidth(bounds.max);
    if (event.key === "ArrowLeft") setWorkspaceLeftWidth(current - 32);
    if (event.key === "ArrowRight") setWorkspaceLeftWidth(current + 32);
  });

  window.addEventListener("resize", () => {
    const current = form.getBoundingClientRect().width;
    if (current > 0) setWorkspaceLeftWidth(current, { persist: false });
  });
}

function restoreWorkspaceLeftWidth() {
  const savedWidth = Number(window.localStorage.getItem("workspace-left-width") || 0);
  if (savedWidth > 0) {
    setWorkspaceLeftWidth(savedWidth, { persist: false });
  }
}

function setWorkspaceLeftWidth(width, options = {}) {
  const bounds = workspaceResizeBounds();
  if (bounds.max <= bounds.min) return;
  const nextWidth = Math.max(bounds.min, Math.min(bounds.max, Math.round(width)));
  workspace.style.setProperty("--left-pane-width", `${nextWidth}px`);
  workspaceResizer.setAttribute("aria-valuemin", String(bounds.min));
  workspaceResizer.setAttribute("aria-valuemax", String(bounds.max));
  workspaceResizer.setAttribute("aria-valuenow", String(nextWidth));
  if (options.persist !== false) {
    window.localStorage.setItem("workspace-left-width", String(nextWidth));
  }
}

function workspaceResizeBounds() {
  const width = workspace.getBoundingClientRect().width;
  const gap = 20;
  const minLeft = Math.min(420, Math.max(280, width * 0.28));
  const minRight = Math.min(520, Math.max(320, width * 0.26));
  return {
    min: Math.round(minLeft),
    max: Math.round(Math.max(minLeft, width - minRight - gap)),
  };
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "正在登录...";
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.querySelector("#login-username").value.trim(),
        password: document.querySelector("#login-password").value,
      }),
    });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "登录失败");
    }
    showAuthenticatedApp(payload.user);
    await loadSavedConfig();
    // 登录完成后再发一次 auth-changed，触发共享设置和共享默认值的刷新
    window.dispatchEvent(new CustomEvent("auth-changed", { detail: { user: payload.user } }));
    loginStatus.textContent = "";
  } catch (error) {
    loginStatus.textContent = error.message;
  }
});

logoutButton?.addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.reload();
});

requirePasswordInput?.addEventListener("change", async () => {
  await saveAuthSettings(requirePasswordInput.checked);
});

exportAccountDataButton?.addEventListener("click", () => exportAccountData());
restoreAccountDataButton?.addEventListener("click", () => restoreAccountFileInput?.click());
restoreAccountFileInput?.addEventListener("change", () => {
  const file = restoreAccountFileInput.files?.[0];
  if (file) restoreAccountData(file);
  restoreAccountFileInput.value = "";
});
previewTemplateButton?.addEventListener("click", () => previewTemplate());
historyRefreshButton?.addEventListener("click", () => loadGenerationHistory());
historyWriterFilter?.addEventListener("change", () => loadGenerationHistory());
historyUseWriterButton?.addEventListener("click", () => {
  const writer = document.querySelector("#default-writer")?.value?.trim() || "";
  historyWriterFilter.value = writer;
  loadGenerationHistory();
});
resumeRefreshButton?.addEventListener("click", () => loadResumeJobs());

legacyModuleChecks.forEach((check) => {
  check.closest(".module-option").remove();
});

addModuleButton.addEventListener("click", () => addModule());
addTeacherButton.addEventListener("click", () => addTeacher());
planSourceControls.forEach((control) => {
  control.addEventListener("input", () => clearImportedRecords("任务内容已修改，请重新导入训练计划。"));
  control.addEventListener("change", () => clearImportedRecords("任务内容已修改，请重新导入训练计划。"));
});
manualModuleInput.addEventListener("change", applyManualTeacherAssociation);
manualModuleInput.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  showOptionMenu(event, {
    createLabel: "新建模块",
    deleteLabel: "删除当前模块",
    currentValue: manualModuleInput.value,
    onCreate: addModule,
    onDelete: deleteModule,
  });
});
defaultCoachSelect.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  showOptionMenu(event, {
    createLabel: "新建老师",
    deleteLabel: "删除当前老师",
    currentValue: defaultCoachSelect.value,
    onCreate: addTeacher,
    onDelete: deleteTeacher,
  });
});
apiSettingsToggle?.addEventListener("click", () => {
  apiSettingsPanel.classList.remove("hidden");
});
apiSettingsClose.addEventListener("click", () => {
  apiSettingsPanel.classList.add("hidden");
});
settingsCancelButton?.addEventListener("click", () => {
  apiSettingsPanel.classList.add("hidden");
});
settingsSaveCloseButton?.addEventListener("click", () => {
  if (window.saveCurrentApiPreset?.() === false) return;
  apiSettingsPanel.classList.add("hidden");
});
apiSettingsPanel.addEventListener("click", (event) => {
  if (event.target === apiSettingsPanel) {
    apiSettingsPanel.classList.add("hidden");
  }
});
bindCriticalClick(quickApiSettingsDetailButton, () => {
  apiSettingsPanel?.classList.remove("hidden");
});
bindCriticalClick(quickApiTestButton, () => runApiTest());
quickPreloadModelButton?.addEventListener("click", () => preloadModelButton?.click());
quickRestartModelButton?.addEventListener("click", () => restartModelButton?.click());
quickUnloadModelButton?.addEventListener("click", () => unloadModelButton?.click());
fetchGpusButton?.addEventListener("click", () => fetchGpuModels());
["#api-format", "#api-base-url", "#api-model"].forEach((selector) => {
  const control = document.querySelector(selector);
  control?.addEventListener("input", updateApiSummary);
  control?.addEventListener("change", updateApiSummary);
  control?.addEventListener("input", syncOllamaModelControls);
  control?.addEventListener("change", syncOllamaModelControls);
});
promptPresetSelect.addEventListener("change", () => applyPromptPreset(promptPresetSelect.value));
newPromptPresetButton.addEventListener("click", () => createPromptPreset());
savePromptPresetButton.addEventListener("click", () => savePromptPreset());
deletePromptPresetButton.addEventListener("click", () => deletePromptPreset());
setDefaultPromptPresetButton?.addEventListener("click", () => setDefaultGenerationPreset("prompt"));
skillsPresetSelect.addEventListener("change", () => applySkillsPreset(skillsPresetSelect.value));
newSkillsPresetButton.addEventListener("click", () => createSkillsPreset());
saveSkillsPresetButton.addEventListener("click", () => saveSkillsPreset());
deleteSkillsPresetButton.addEventListener("click", () => deleteSkillsPreset());
setDefaultSkillsPresetButton?.addEventListener("click", () => setDefaultGenerationPreset("skills"));
promptModeButton.addEventListener("click", () => setCustomMode("prompt"));
skillsModeButton.addEventListener("click", () => setCustomMode("skills"));
cancelBatchButton.addEventListener("click", async () => {
  const jobId = currentBatchJobId;
  if (!jobId) {
    batchProgressDetail.textContent = "任务还没有创建成功，当前没有可取消的后台任务。";
    setCancelBatchButton(false, false);
    return;
  }
  setCancelBatchButton(false, true, "正在取消");
  batchProgressDetail.textContent = "正在取消批量生成...";
  try {
    const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "取消请求失败");
    }
    window.clearTimeout(batchProgressTimer);
    scheduleBatchPoll(jobId, 350);
  } catch (error) {
    batchProgressDetail.textContent = humanFetchError(error);
    setCancelBatchButton(true, true);
  }
});
bindCriticalClick(manualModeButton, () => setFillMode(false));
bindCriticalClick(batchFillModeButton, () => setFillMode(true));
bindCriticalClick(requirementsLinkModeButton, () => setRequirementsSourceMode("link"));
bindCriticalClick(requirementsTextModeButton, () => setRequirementsSourceMode("text"));
moduleList.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  if (event.target.closest(".config-row")) return;
  addModule();
});
teacherList.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  if (event.target.closest(".config-row")) return;
  addTeacher();
});

openRequirementsButton.addEventListener("click", () => {
  const url = document.querySelector("#requirements-url").value.trim();
  if (!url) {
    importStatus.textContent = "请先填写任务文档链接。";
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.append(link);
  link.click();
  link.remove();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  syncSelectedModules();
  const batchMode = batchModeInput.checked;
  if (batchMode && selectedRecordsInput.value && importedPlanSignature !== currentPlanSignature()) {
    clearImportedRecords("任务内容已变化，正在重新导入训练计划...");
  }
  if (batchMode && !selectedRecordsInput.value) {
    const imported = await importPlan();
    if (!imported) {
      statusPill.textContent = "失败";
      results.className = "results empty";
      results.textContent = "请先粘贴任务文档正文，或点击“导入训练计划”并勾选要生成的对象。";
      return;
    }
  }
  syncSelectedRecords();
  if (batchMode && !selectedRecordsInput.value) {
    statusPill.textContent = "失败";
    results.className = "results empty";
    results.textContent = "没有选中任何训练对象，请先在“选择要生成的对象”里勾选。";
    return;
  }
  statusPill.textContent = "处理中";
  const saveOnGenerate = document.querySelector("#save-config").checked;
  if (saveOnGenerate && window.saveCurrentApiPreset && !window.saveCurrentApiPreset()) {
    statusPill.textContent = "失败";
    results.className = "results empty";
    results.textContent = "当前 API 配置保存失败，请检查地址、模型和预设后重试。";
    return;
  }
  results.className = "results empty";
  results.textContent = "正在读取文档和任务内容，并生成写入内容...";
  downloadSlot.replaceChildren();
  previewPanel.classList.add("hidden");
  previewList.replaceChildren();
  if (previewConfirmed) previewConfirmed.checked = true;
  generatedUserNote?.classList.add("hidden");
  copyButton.disabled = true;
  if (batchMode) {
    await runBatchJob();
    return;
  } else {
    resetBatchProgress();
  }

  try {
    const response = await fetch("/api/fill", {
      method: "POST",
      body: new FormData(form),
    });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "请求失败");
    }
    lastPayload = payload;
    finishBatchProgress(payload);
    renderResults(payload);
    copyButton.disabled = false;
  } catch (error) {
    failBatchProgress(humanFetchError(error));
    statusPill.textContent = "失败";
    results.className = "results empty";
    results.textContent = humanFetchError(error);
  }
});

bindCriticalClick(importPlanButton, async () => {
  await importPlan();
});

async function parseUploadedPlanFile() {
  const planFile = document.querySelector("#plan-file").files[0];
  if (!planFile) {
    planFileStatus.textContent = "请先在“训练计划 Excel”里选择 XLSX/CSV 文件。";
    return;
  }
  const templateFile = document.querySelector("#file").files[0];
  if (templateFile && /\.(xlsx|xlsm|csv|tsv)$/i.test(templateFile.name)) {
    planFileStatus.textContent = "你把训练计划表格选到了“训练日志模板”位置，请改选到上面的“训练计划 Excel”。";
    return;
  }
  const imported = await importPlan();
  planFileStatus.textContent = imported ? "表格解析完成，请勾选要生成的训练计划。" : "表格解析失败，请检查列名或内容。";
}

bindCriticalClick(parsePlanFileButton, async () => {
  await parseUploadedPlanFile();
});

async function importPlan() {
  syncSelectedModules();
  const planSignature = currentPlanSignature();
  const url = document.querySelector("#requirements-url").value.trim();
  const pastedText = document.querySelector("#requirements-text").value.trim();
  const cookie = document.querySelector("#requirements-cookie").value.trim();
  if (!pastedText && !cookie && /kdocs\.cn/i.test(url)) {
    importStatus.textContent = "金山文档链接无法直接导入时，请先在金山表格里复制“模块、训练计划”等内容，粘贴到“任务文档内容”框后再导入。";
    planPicker.classList.add("hidden");
    planRecords.replaceChildren();
    return false;
  }

  importPlanButton.disabled = true;
  importStatus.textContent = requirementsSourceModeInput?.value === "text"
    ? "正在识别粘贴内容里的训练计划..."
    : "正在读取链接并识别训练计划...";
  planPicker.classList.add("hidden");
  planRecords.replaceChildren();
  importedRecords = [];
  selectedRecordsInput.value = "";
  importedPlanSignature = "";

  try {
    const response = await fetch("/api/import-plan", {
      method: "POST",
      body: new FormData(form),
    });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "导入失败");
    }
    importedRecords = payload.records || [];
    importedPlanSignature = planSignature;
    renderPlanPicker(importedRecords);
    setFillMode(true);
    importStatus.textContent = `已导入 ${importedRecords.length} 个对象`;
    return importedRecords.length > 0;
  } catch (error) {
    importStatus.textContent = error.message;
    return false;
  } finally {
    importPlanButton.disabled = false;
  }
}

async function initAuth() {
  try {
    const response = await fetch("/api/session");
    const payload = await readResponse(response);
    if (response.ok && payload.authenticated) {
      showAuthenticatedApp(payload.user);
      syncAuthSettings(payload.auth_required);
      await loadSavedConfig();
      return;
    }
  } catch {
    // Keep the login screen visible when the session check fails.
  }
  showLoginScreen();
}

function showAuthenticatedApp(user) {
  loginScreen?.classList.add("hidden");
  appShell?.classList.remove("hidden");
  if (currentUserName) {
    currentUserName.textContent = user?.display_name || user?.username || "已登录";
  }
  loadAuthSettings();
  loadGenerationHistory();
  loadResumeJobs();
  window.requestAnimationFrame(restoreWorkspaceLeftWidth);
}

function showLoginScreen() {
  appShell?.classList.add("hidden");
  loginScreen?.classList.remove("hidden");
}

async function loadAuthSettings() {
  if (!requirePasswordInput) return;
  try {
    const response = await fetch("/api/auth-settings");
    const payload = await readResponse(response);
    if (!response.ok) return;
    syncAuthSettings(payload.require_password);
  } catch {
    // The app can still work with the default checked state.
  }
}

function syncAuthSettings(requirePassword) {
  if (!requirePasswordInput) return;
  requirePasswordInput.checked = requirePassword !== false;
  if (authSettingsStatus) {
    authSettingsStatus.textContent = requirePasswordInput.checked ? "当前：需要密码" : "当前：免密码进入";
    authSettingsStatus.className = requirePasswordInput.checked ? "" : "ok-text";
  }
}

async function saveAuthSettings(requirePassword) {
  if (!authSettingsStatus) return;
  authSettingsStatus.className = "";
  authSettingsStatus.textContent = "正在保存...";
  try {
    const response = await fetch("/api/auth-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ require_password: requirePassword }),
    });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "保存失败");
    }
    syncAuthSettings(payload.require_password);
  } catch (error) {
    authSettingsStatus.className = "error-text";
    authSettingsStatus.textContent = error.message;
    requirePasswordInput.checked = !requirePassword;
  }
}

async function exportAccountData() {
  if (!accountBackupStatus) return;
  accountBackupStatus.className = "";
  accountBackupStatus.textContent = "正在导出配置...";
  try {
    const response = await fetch("/api/account-backup");
    const serverBackup = await readResponse(response);
    if (!response.ok) throw new Error(serverBackup.detail || "导出失败");
    const payload = { ...serverBackup, client: buildClientBackup() };
    downloadJson(payload, `training-log-config-backup-${safeBackupName(serverBackup.user?.username || "user")}-${backupDateStamp()}.json`);
    accountBackupStatus.className = "ok-text";
    accountBackupStatus.textContent = "配置已导出。";
  } catch (error) {
    accountBackupStatus.className = "error-text";
    accountBackupStatus.textContent = humanFetchError(error);
  }
}

async function restoreAccountData(file) {
  if (!accountBackupStatus) return;
  try {
    const payload = JSON.parse(await file.text());
    if (!window.confirm("导入配置会覆盖当前 API 配置、填写模板、提示词、Skills、模块和老师配置。继续？")) return;
    accountBackupStatus.className = "";
    accountBackupStatus.textContent = "正在导入配置...";
    const response = await postJsonWithRetry("/api/account-backup", payload);
    const result = await readResponse(response);
    if (!response.ok) throw new Error(result.detail || "恢复失败");
    restoreClientBackup(payload.client || {});
    accountBackupStatus.className = "ok-text";
    accountBackupStatus.textContent = "配置已导入，正在刷新...";
    window.setTimeout(() => window.location.reload(), 800);
  } catch (error) {
    accountBackupStatus.className = "error-text";
    accountBackupStatus.textContent = error instanceof SyntaxError ? "备份文件不是有效 JSON。" : humanFetchError(error);
  }
}

function buildClientBackup() {
  syncSelectedModules();
  return {
    api_presets: window.exportApiPresetBackup?.() || [],
    prompt_presets: promptPresets.filter((preset) => !preset.builtin),
    skills_presets: skillsPresets.filter((preset) => !preset.builtin),
    generation_default: generationDefault,
    ui_state: {
      form_schema: document.querySelector("#form-schema")?.value || "",
      custom_mode: customModeInput?.value || "prompt",
      custom_prompt: customPromptInput?.value || "",
      custom_skills: customSkillsInput?.value || "",
      prompt_preset: promptPresetSelect?.value || "",
      skills_preset: skillsPresetSelect?.value || "",
      output_format: document.querySelector("#output-format")?.value || "docx",
      output_package_mode: document.querySelector("#output-package-mode")?.value || "folder",
      default_writer: document.querySelector("#default-writer")?.value || "",
      default_coach: defaultCoachSelect?.value || "",
      start_date: document.querySelector("#start-date")?.value || "",
      selected_modules: modules,
      teachers,
      module_teacher_map: moduleTeacherMap,
      link_module_teacher: Boolean(linkModuleTeacherInput?.checked),
    },
  };
}

function restoreClientBackup(client) {
  window.importApiPresetBackup?.(client.api_presets || []);
  if (Array.isArray(client.prompt_presets)) window.localStorage.setItem("promptPresets", JSON.stringify(client.prompt_presets));
  if (Array.isArray(client.skills_presets)) window.localStorage.setItem("skillsPresets", JSON.stringify(client.skills_presets));
  if (client.generation_default && typeof client.generation_default === "object") {
    saveGenerationDefault(normalizeGenerationDefault(client.generation_default));
  }
  const state = client.ui_state || {};
  if (Array.isArray(state.selected_modules) && state.selected_modules.length) modules = state.selected_modules.map(String);
  if (Array.isArray(state.teachers) && state.teachers.length) teachers = state.teachers.map(String);
  if (state.module_teacher_map && typeof state.module_teacher_map === "object") moduleTeacherMap = { ...state.module_teacher_map };
  if (linkModuleTeacherInput) linkModuleTeacherInput.checked = Boolean(state.link_module_teacher);
  setLocalFormValue("#form-schema", state.form_schema);
  setLocalFormValue("#custom-prompt", state.custom_prompt);
  setLocalFormValue("#custom-skills", state.custom_skills);
  setLocalFormValue("#output-format", state.output_format);
  setLocalFormValue("#output-package-mode", state.output_package_mode);
  setLocalFormValue("#default-writer", state.default_writer);
  setLocalFormValue("#start-date", state.start_date);
  renderModuleTeacherControls();
  if (state.default_coach && teachers.includes(state.default_coach)) defaultCoachSelect.value = state.default_coach;
  setCustomMode(state.custom_mode === "skills" ? "skills" : "prompt", { silent: true });
}

function setLocalFormValue(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.value = value;
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function backupDateStamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
}

function safeBackupName(value) {
  return String(value || "user").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "") || "user";
}

async function previewTemplate() {
  if (!templatePreviewStatus || !templatePreviewPanel) return;
  templatePreviewStatus.className = "";
  templatePreviewStatus.textContent = "正在读取模板...";
  previewTemplateButton.disabled = true;
  try {
    const formData = new FormData();
    const file = templateFileInput?.files?.[0];
    if (file) formData.append("file", file);
    const response = await fetch("/api/template-preview", {
      method: "POST",
      body: formData,
    });
    const payload = await readResponse(response);
    if (!response.ok) throw new Error(payload.detail || "模板预览失败");
    renderTemplatePreview(payload);
    templatePreviewStatus.className = "ok-text";
    templatePreviewStatus.textContent = payload.using_default ? "已预览内置默认模板。" : "已预览当前选择的模板。";
  } catch (error) {
    templatePreviewStatus.className = "error-text";
    templatePreviewStatus.textContent = humanFetchError(error);
  } finally {
    previewTemplateButton.disabled = false;
  }
}

function renderTemplatePreview(payload) {
  templatePreviewPanel.classList.remove("hidden");
  templatePreviewName.textContent = payload.filename || "模板";
  const fields = Array.isArray(payload.fields) ? payload.fields : [];
  if (fields.length) {
    templatePreviewFields.replaceChildren(
      ...fields.map((field) => {
        const chip = document.createElement("span");
        chip.className = "template-field-chip";
        chip.textContent = field.name || String(field);
        return chip;
      })
    );
  } else {
    const empty = document.createElement("span");
    empty.className = "subtle";
    empty.textContent = "未识别到明确字段，将按模板文本继续处理。";
    templatePreviewFields.replaceChildren(empty);
  }
  const text = payload.text_preview || "模板里没有可提取的文本内容。";
  templatePreviewText.textContent = payload.truncated ? `${text}\n\n... 已截断，仅显示前 5000 字。` : text;
}

function syncSelectedModules() {
  const selected = [...moduleList.querySelectorAll(".module-enabled:checked")].map((check) => check.value);
  selectedModulesInput.value = JSON.stringify(selected);
  moduleTeacherMapInput.value = JSON.stringify(moduleTeacherMap);
  applyManualTeacherAssociation();
  if (importedRecords.length && importedPlanSignature && importedPlanSignature !== currentPlanSignature()) {
    clearImportedRecords("模块配置已修改，请重新导入训练计划。");
  }
}

function defaultPromptPresets() {
  return [
    {
      name: "默认训练日志",
      builtin: true,
      prompt: "",
    },
    {
      name: "实操复盘强化",
      builtin: true,
      prompt: "学习笔记要更像学生个人实操复盘，围绕命令、配置对象、验证结果和排错步骤展开。总结要写出训练目标达成情况、不足之处和下一步改进，不要空泛。",
    },
  ];
}

function defaultSkillsPresets() {
  return [
    {
      name: "默认 Skills",
      builtin: true,
      skills: "",
    },
    {
      name: "系统管理实操",
      builtin: true,
      skills: "Linux 服务配置复盘\n网络排错步骤拆解\nWindows Server 角色服务总结",
    },
  ];
}

function loadPromptPresets() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("promptPresets") || "[]");
    const normalized = Array.isArray(saved) ? saved.map((preset) => ({
      name: String(preset.name || "").trim(),
      prompt: String(preset.prompt || ""),
      builtin: Boolean(preset.builtin),
    })).filter((preset) => preset.name) : [];
    const defaultNames = new Set(normalized.map((preset) => preset.name));
    return [...defaultPromptPresets().filter((preset) => !defaultNames.has(preset.name)), ...normalized];
  } catch {
    return defaultPromptPresets();
  }
}

function loadSkillsPresets() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("skillsPresets") || "[]");
    const normalized = Array.isArray(saved) ? saved.map((preset) => ({
      name: String(preset.name || "").trim(),
      skills: String(preset.skills || ""),
      builtin: Boolean(preset.builtin),
    })).filter((preset) => preset.name) : [];
    const defaultNames = new Set(normalized.map((preset) => preset.name));
    return [...defaultSkillsPresets().filter((preset) => !defaultNames.has(preset.name)), ...normalized];
  } catch {
    return defaultSkillsPresets();
  }
}

function savePromptPresets() {
  const customPresets = promptPresets.filter((preset) => !preset.builtin);
  window.localStorage.setItem("promptPresets", JSON.stringify(customPresets));
  if (typeof scheduleShareAutoSync === "function") scheduleShareAutoSync();
}

function saveSkillsPresets() {
  const customPresets = skillsPresets.filter((preset) => !preset.builtin);
  window.localStorage.setItem("skillsPresets", JSON.stringify(customPresets));
  if (typeof scheduleShareAutoSync === "function") scheduleShareAutoSync();
}

function loadGenerationDefault() {
  try {
    return normalizeGenerationDefault(JSON.parse(window.localStorage.getItem("generationDefault") || "{}"));
  } catch {
    return normalizeGenerationDefault({});
  }
}

function normalizeGenerationDefault(value) {
  const payload = value && typeof value === "object" ? value : {};
  return {
    mode: payload.mode === "skills" ? "skills" : "prompt",
    prompt_preset: String(payload.prompt_preset || "").trim(),
    skills_preset: String(payload.skills_preset || "").trim(),
  };
}

function saveGenerationDefault(value = generationDefault) {
  generationDefault = normalizeGenerationDefault(value);
  window.localStorage.setItem("generationDefault", JSON.stringify(generationDefault));
}

function presetOptionLabel(preset, isDefault) {
  const tags = [];
  if (preset.builtin) tags.push("系统");
  if (isDefault) tags.push("默认");
  return tags.length ? `${preset.name}（${tags.join(" / ")}）` : preset.name;
}

function renderPromptPresets(selectedName = promptPresetSelect.value || promptPresets[0]?.name || "") {
  promptPresetSelect.replaceChildren(
    ...promptPresets.map((preset) => {
      const option = document.createElement("option");
      option.value = preset.name;
      option.textContent = presetOptionLabel(preset, preset.name === generationDefault.prompt_preset);
      return option;
    })
  );
  promptPresetSelect.value = promptPresets.some((preset) => preset.name === selectedName) ? selectedName : promptPresets[0]?.name || "";
  updatePromptPresetButtons();
}

function applyPromptPreset(name, options = {}) {
  const preset = promptPresets.find((item) => item.name === name);
  if (!preset) return;
  customPromptInput.value = preset.prompt || "";
  promptPresetStatus.className = preset.builtin ? "" : "ok-text";
  if (!options.silent) {
    promptPresetStatus.textContent = `已选择：${preset.name}`;
  }
  updatePromptPresetButtons();
}

function createPromptPreset() {
  const name = window.prompt("新建提示词名称");
  const value = String(name || "").trim();
  if (!value) return;
  const existing = promptPresets.find((preset) => preset.name === value);
  if (existing?.builtin) {
    window.alert("系统提示词不能覆盖，请换一个名称。");
    return;
  }
  const preset = {
    name: value,
    prompt: customPromptInput.value,
    builtin: false,
  };
  promptPresets = promptPresets.filter((item) => item.name !== value);
  promptPresets.push(preset);
  savePromptPresets();
  renderPromptPresets(value);
  promptPresetStatus.className = "ok-text";
  promptPresetStatus.textContent = `已新建：${value}`;
}

function savePromptPreset() {
  const name = promptPresetSelect.value;
  const preset = promptPresets.find((item) => item.name === name);
  if (!preset || preset.builtin) {
    promptPresetStatus.className = "error-text";
    promptPresetStatus.textContent = "系统提示词不能保存覆盖，请先新建提示词。";
    return;
  }
  preset.prompt = customPromptInput.value;
  savePromptPresets();
  promptPresetStatus.className = "ok-text";
  promptPresetStatus.textContent = `已保存：${name}`;
}

function deletePromptPreset() {
  const name = promptPresetSelect.value;
  const preset = promptPresets.find((item) => item.name === name);
  if (!preset || preset.builtin) {
    promptPresetStatus.className = "error-text";
    promptPresetStatus.textContent = "系统提示词不能删除。";
    return;
  }
  if (!window.confirm(`删除提示词配置 ${name}？`)) return;
  promptPresets = promptPresets.filter((item) => item.name !== name);
  if (generationDefault.prompt_preset === name) {
    saveGenerationDefault({ ...generationDefault, prompt_preset: "" });
  }
  savePromptPresets();
  renderPromptPresets();
  promptPresetStatus.className = "ok-text";
  promptPresetStatus.textContent = `已删除：${name}`;
}

function updatePromptPresetButtons() {
  const preset = promptPresets.find((item) => item.name === promptPresetSelect.value);
  const useSkills = customModeInput.value === "skills";
  const locked = !preset || preset.builtin || useSkills;
  newPromptPresetButton.disabled = useSkills;
  savePromptPresetButton.disabled = locked;
  deletePromptPresetButton.disabled = locked;
  if (setDefaultPromptPresetButton) {
    setDefaultPromptPresetButton.disabled = !preset || useSkills;
  }
}

function renderSkillsPresets(selectedName = skillsPresetSelect.value || skillsPresets[0]?.name || "") {
  skillsPresetSelect.replaceChildren(
    ...skillsPresets.map((preset) => {
      const option = document.createElement("option");
      option.value = preset.name;
      option.textContent = presetOptionLabel(preset, preset.name === generationDefault.skills_preset);
      return option;
    })
  );
  skillsPresetSelect.value = skillsPresets.some((preset) => preset.name === selectedName) ? selectedName : skillsPresets[0]?.name || "";
  updateSkillsPresetButtons();
}

function applySkillsPreset(name, options = {}) {
  const preset = skillsPresets.find((item) => item.name === name);
  if (!preset) return;
  customSkillsInput.value = preset.skills || "";
  skillsPresetStatus.className = preset.builtin ? "" : "ok-text";
  if (!options.silent) {
    skillsPresetStatus.textContent = `已选择：${preset.name}`;
  }
  updateSkillsPresetButtons();
}

function createSkillsPreset() {
  const name = window.prompt("新建 Skills 名称");
  const value = String(name || "").trim();
  if (!value) return;
  const existing = skillsPresets.find((preset) => preset.name === value);
  if (existing?.builtin) {
    window.alert("系统 Skills 不能覆盖，请换一个名称。");
    return;
  }
  const preset = {
    name: value,
    skills: customSkillsInput.value,
    builtin: false,
  };
  skillsPresets = skillsPresets.filter((item) => item.name !== value);
  skillsPresets.push(preset);
  saveSkillsPresets();
  renderSkillsPresets(value);
  skillsPresetStatus.className = "ok-text";
  skillsPresetStatus.textContent = `已新建：${value}`;
}

function saveSkillsPreset() {
  const name = skillsPresetSelect.value;
  const preset = skillsPresets.find((item) => item.name === name);
  if (!preset || preset.builtin) {
    skillsPresetStatus.className = "error-text";
    skillsPresetStatus.textContent = "系统 Skills 不能保存覆盖，请先新建 Skills。";
    return;
  }
  preset.skills = customSkillsInput.value;
  saveSkillsPresets();
  skillsPresetStatus.className = "ok-text";
  skillsPresetStatus.textContent = `已保存：${name}`;
}

function deleteSkillsPreset() {
  const name = skillsPresetSelect.value;
  const preset = skillsPresets.find((item) => item.name === name);
  if (!preset || preset.builtin) {
    skillsPresetStatus.className = "error-text";
    skillsPresetStatus.textContent = "系统 Skills 不能删除。";
    return;
  }
  if (!window.confirm(`删除 Skills 配置 ${name}？`)) return;
  skillsPresets = skillsPresets.filter((item) => item.name !== name);
  if (generationDefault.skills_preset === name) {
    saveGenerationDefault({ ...generationDefault, skills_preset: "" });
  }
  saveSkillsPresets();
  renderSkillsPresets();
  skillsPresetStatus.className = "ok-text";
  skillsPresetStatus.textContent = `已删除：${name}`;
}

function updateSkillsPresetButtons() {
  const preset = skillsPresets.find((item) => item.name === skillsPresetSelect.value);
  const useSkills = customModeInput.value === "skills";
  const locked = !preset || preset.builtin || !useSkills;
  newSkillsPresetButton.disabled = !useSkills;
  saveSkillsPresetButton.disabled = locked;
  deleteSkillsPresetButton.disabled = locked;
  if (setDefaultSkillsPresetButton) {
    setDefaultSkillsPresetButton.disabled = !preset || !useSkills;
  }
}

function setDefaultGenerationPreset(mode) {
  if (mode === "skills") {
    const preset = skillsPresets.find((item) => item.name === skillsPresetSelect.value);
    if (!preset) return;
    saveGenerationDefault({
      ...generationDefault,
      mode: "skills",
      skills_preset: preset.name,
      prompt_preset: generationDefault.prompt_preset || promptPresetSelect.value || "",
    });
    renderSkillsPresets(preset.name);
    renderPromptPresets(promptPresetSelect.value);
    setCustomMode("skills", { silent: true });
    applySkillsPreset(preset.name, { silent: true });
    skillsPresetStatus.className = "ok-text";
    skillsPresetStatus.textContent = `已设为默认 Skills：${preset.name}`;
    return;
  }

  const preset = promptPresets.find((item) => item.name === promptPresetSelect.value);
  if (!preset) return;
  saveGenerationDefault({
    ...generationDefault,
    mode: "prompt",
    prompt_preset: preset.name,
    skills_preset: generationDefault.skills_preset || skillsPresetSelect.value || "",
  });
  renderPromptPresets(preset.name);
  renderSkillsPresets(skillsPresetSelect.value);
  setCustomMode("prompt", { silent: true });
  applyPromptPreset(preset.name, { silent: true });
  promptPresetStatus.className = "ok-text";
  promptPresetStatus.textContent = `已设为默认提示词：${preset.name}`;
}

function setCustomMode(mode, options = {}) {
  const useSkills = mode === "skills";
  const previousMode = customModeInput.value;
  customModeInput.value = useSkills ? "skills" : "prompt";
  promptModeButton.classList.toggle("active", !useSkills);
  skillsModeButton.classList.toggle("active", useSkills);
  promptModeButton.setAttribute("aria-pressed", useSkills ? "false" : "true");
  skillsModeButton.setAttribute("aria-pressed", useSkills ? "true" : "false");
  promptSourceControls.forEach((item) => item.classList.toggle("hidden", useSkills));
  skillsSourceControls.forEach((item) => item.classList.toggle("hidden", !useSkills));
  customPromptInput.disabled = useSkills;
  promptPresetSelect.disabled = useSkills;
  customSkillsInput.disabled = !useSkills;
  skillsPresetSelect.disabled = !useSkills;
  updatePromptPresetButtons();
  updateSkillsPresetButtons();
}

function currentPlanSignature() {
  const planFile = document.querySelector("#plan-file");
  return JSON.stringify({
    requirements_url: document.querySelector("#requirements-url").value.trim(),
    requirements_text: document.querySelector("#requirements-text").value.trim(),
    requirements_cookie: document.querySelector("#requirements-cookie").value.trim(),
    requirements_user_agent: document.querySelector("#requirements-user-agent").value.trim(),
    requirements_referer: document.querySelector("#requirements-referer").value.trim(),
    plan_file: planFile?.files?.[0] ? `${planFile.files[0].name}:${planFile.files[0].size}:${planFile.files[0].lastModified}` : "",
    form_schema: document.querySelector("#form-schema").value.trim(),
    selected_modules: selectedModulesInput.value,
    module_teacher_map: moduleTeacherMapInput.value,
  });
}

function clearImportedRecords(message = "") {
  if (!importedRecords.length && !selectedRecordsInput.value) return;
  importedRecords = [];
  selectedRecordsInput.value = "";
  importedPlanSignature = "";
  planRecords.replaceChildren();
  planPicker.classList.add("hidden");
  if (message) {
    importStatus.textContent = message;
  }
}

function renderModuleTeacherControls() {
  moduleList.replaceChildren(...modules.map((name) => createModuleRow(name)));
  teacherList.replaceChildren(...teachers.map((name) => createTeacherRow(name)));
  renderManualModuleOptions();
  renderManualTeacherOptions();
  syncSelectedModules();
}

function createModuleRow(name) {
  const row = document.createElement("label");
  row.className = "config-row";

  const checkbox = document.createElement("input");
  checkbox.className = "module-enabled";
  checkbox.type = "checkbox";
  checkbox.value = name;
  checkbox.checked = true;
  checkbox.addEventListener("change", syncSelectedModules);

  const title = document.createElement("span");
  title.textContent = `${name} 模块`;

  const select = document.createElement("select");
  select.innerHTML = `<option value="">不关联</option>${teachers.map((teacher) => `<option value="${escapeHtml(teacher)}">${escapeHtml(teacher)}</option>`).join("")}`;
  select.value = moduleTeacherMap[name] || "";
  select.addEventListener("change", () => {
    moduleTeacherMap[name] = select.value;
    syncSelectedModules();
    applyManualTeacherAssociation();
  });

  row.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteModule(name);
  });

  row.append(checkbox, title, select);
  return row;
}

function createTeacherRow(name) {
  const row = document.createElement("div");
  row.className = "config-row teacher-row";
  const title = document.createElement("span");
  title.textContent = name;
  row.append(title);
  row.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteTeacher(name);
  });
  return row;
}

function addModule() {
  const name = window.prompt("输入模块名称，例如 D 或 Linux");
  if (!name) return;
  const value = name.trim().toUpperCase();
  if (!value || modules.includes(value)) return;
  modules.push(value);
  renderModuleTeacherControls();
}

function addTeacher() {
  const name = window.prompt("输入授课老师名称");
  if (!name) return;
  const value = name.trim();
  if (!value || teachers.includes(value)) return;
  teachers.push(value);
  renderModuleTeacherControls();
}

function deleteModule(name) {
  if (!window.confirm(`删除模块 ${name}？`)) return;
  modules = modules.filter((item) => item !== name);
  delete moduleTeacherMap[name];
  renderModuleTeacherControls();
}

function deleteTeacher(name) {
  if (!window.confirm(`删除老师 ${name}？`)) return;
  teachers = teachers.filter((item) => item !== name);
  Object.entries(moduleTeacherMap).forEach(([moduleName, teacherName]) => {
    if (teacherName === name) {
      moduleTeacherMap[moduleName] = "";
    }
  });
  renderModuleTeacherControls();
}

function renderManualModuleOptions() {
  const current = manualModuleInput.value;
  const options = [
    `<option value="">请选择模块</option>`,
    ...modules.map((moduleName) => `<option value="${escapeHtml(moduleName)}">${escapeHtml(moduleName)} 模块</option>`),
  ];
  manualModuleInput.innerHTML = options.join("");
  if (current && modules.includes(current)) {
    manualModuleInput.value = current;
  }
}

function renderManualTeacherOptions() {
  const current = defaultCoachSelect.value;
  const options = [
    `<option value="">请选择授课老师</option>`,
    ...teachers.map((teacher) => `<option value="${escapeHtml(teacher)}">${escapeHtml(teacher)}</option>`),
  ];
  defaultCoachSelect.innerHTML = options.join("");
  if (current && teachers.includes(current)) {
    defaultCoachSelect.value = current;
  }
}

function applyManualTeacherAssociation() {
  if (!linkModuleTeacherInput.checked) return;
  const moduleKey = resolveManualModuleKey(manualModuleInput.value);
  const teacher = moduleTeacherMap[moduleKey] || "";
  if (teacher) {
    if (!teachers.includes(teacher)) {
      teachers.push(teacher);
      renderManualTeacherOptions();
    }
    defaultCoachSelect.value = teacher;
  }
}

function resolveManualModuleKey(value) {
  const normalized = String(value || "").trim().toUpperCase();
  if (!normalized) return "";
  const exact = modules.find((name) => name.toUpperCase() === normalized);
  if (exact) return exact;
  const prefix = modules.find((name) => normalized.startsWith(`${name.toUpperCase()}-`));
  if (prefix) return prefix;
  return normalized.split(/[-\s/，、]/)[0] || "";
}

function showOptionMenu(event, { createLabel, deleteLabel, currentValue, onCreate, onDelete }) {
  hideOptionMenu();
  const menu = document.createElement("div");
  menu.className = "context-menu";

  const createButton = document.createElement("button");
  createButton.type = "button";
  createButton.textContent = createLabel;
  createButton.addEventListener("click", () => {
    hideOptionMenu();
    onCreate();
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = deleteLabel;
  deleteButton.disabled = !currentValue;
  deleteButton.addEventListener("click", () => {
    hideOptionMenu();
    if (currentValue) onDelete(currentValue);
  });

  menu.append(createButton, deleteButton);
  document.body.append(menu);
  const left = Math.min(event.clientX, window.innerWidth - 190);
  const top = Math.min(event.clientY, window.innerHeight - 96);
  menu.style.left = `${Math.max(8, left)}px`;
  menu.style.top = `${Math.max(8, top)}px`;
  window.setTimeout(() => {
    document.addEventListener("click", hideOptionMenu, { once: true });
  }, 0);
}

function hideOptionMenu() {
  document.querySelector(".context-menu")?.remove();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

toggleAllRecordsButton.addEventListener("click", () => {
  const checks = [...planRecords.querySelectorAll("input[type='checkbox']")];
  const shouldCheck = checks.some((check) => !check.checked);
  checks.forEach((check) => {
    check.checked = shouldCheck;
  });
  syncSelectedRecords();
});

saveConfigButton.addEventListener("click", async () => {
  saveConfigButton.disabled = true;
  try {
    if (window.saveCurrentApiPreset && !window.saveCurrentApiPreset()) {
      return;
    }
    const response = await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readApiConfig()),
    });
    if (!response.ok) {
      const payload = await readResponse(response);
      throw new Error(payload.detail || "保存失败");
    }
    saveConfigButton.textContent = "已保存";
  } catch (error) {
    saveConfigButton.textContent = error.message;
  } finally {
    window.setTimeout(() => {
      saveConfigButton.disabled = false;
      saveConfigButton.textContent = "保存配置";
    }, 1400);
  }
});

testApiButton.addEventListener("click", () => runApiTest());

async function runApiTest() {
  [testApiButton, quickApiTestButton].forEach((button) => {
    if (button) button.disabled = true;
  });
  setApiTestStatus("", "");
  const isOllama = document.querySelector("#api-format").value === "ollama";
  setApiTestStatus("", isOllama ? "正在检查 Ollama 和当前模型..." : "正在测试 API...");
  try {
    const response = await postJsonWithRetry("/api/test-api", readApiConfig());
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "API 测试失败");
    }
    setApiTestStatus("ok-text", payload.message || "API 可用");
  } catch (error) {
    setApiTestStatus("error-text", humanFetchError(error));
  } finally {
    [testApiButton, quickApiTestButton].forEach((button) => {
      if (button) button.disabled = false;
    });
  }
}

function setApiTestStatus(className, text) {
  [apiTestStatus, quickApiTestStatus].forEach((status) => {
    if (!status) return;
    status.className = [status === quickApiTestStatus ? "api-summary" : "", className].filter(Boolean).join(" ");
    status.textContent = text;
  });
}

preloadModelButton.addEventListener("click", () => runOllamaModelAction("preload", "正在预加载 Ollama 模型，首次加载大模型可能需要一会儿..."));
restartModelButton.addEventListener("click", () => runOllamaModelAction("restart", "正在重启 Ollama 模型..."));
unloadModelButton.addEventListener("click", () => runOllamaModelAction("unload", "正在关闭 Ollama 模型..."));

async function runOllamaModelAction(action, pendingText) {
  const endpoints = {
    preload: "/api/preload-model",
    restart: "/api/restart-model",
    unload: "/api/unload-model",
  };
  setOllamaActionButtonsDisabled(true);
  apiTestStatus.className = "";
  apiTestStatus.textContent = pendingText;
  try {
    const response = await postJsonWithRetry(endpoints[action], readApiConfig());
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "操作失败");
    }
    apiTestStatus.className = "ok-text";
    apiTestStatus.textContent = payload.message || "操作完成";
  } catch (error) {
    apiTestStatus.className = "error-text";
    apiTestStatus.textContent = humanFetchError(error);
  } finally {
    setOllamaActionButtonsDisabled(false);
    syncOllamaModelControls();
  }
}

function setOllamaActionButtonsDisabled(disabled) {
  [preloadModelButton, restartModelButton, unloadModelButton, quickPreloadModelButton, quickRestartModelButton, quickUnloadModelButton]
    .forEach((button) => {
      if (button) button.disabled = disabled;
    });
}

async function postJsonWithRetry(url, payload) {
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
}

function humanFetchError(error) {
  if (error instanceof TypeError && /fetch/i.test(error.message)) {
    return "浏览器没有连到本工具后端。请确认 Docker 服务正在运行，然后按 Ctrl+F5 刷新页面再试。";
  }
  return error.message;
}

copyButton.addEventListener("click", async () => {
  if (!lastPayload) return;
  await navigator.clipboard.writeText(JSON.stringify(lastPayload.answers, null, 2));
  copyButton.textContent = "已复制";
  window.setTimeout(() => {
    copyButton.textContent = "复制结果 JSON";
  }, 1200);
});

async function loadSavedConfig() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) return;
    const config = await response.json();
    const apiFormat = document.querySelector("#api-format");
    const apiBaseUrl = document.querySelector("#api-base-url");
    const apiKey = document.querySelector("#api-key");
    const apiModel = document.querySelector("#api-model");
    const model = config.model || "";
    apiFormat.value = config.format || "openai";
    apiBaseUrl.value = config.base_url || "";
    apiKey.value = config.api_key || "";
    gpuModelInput.value = config.gpu_model || "";
    if (model && ![...apiModel.options].some((option) => option.value === model)) {
      apiModel.append(new Option(model, model));
    }
    apiModel.value = model;
    window.dispatchEvent(new CustomEvent("api-config-loaded", { detail: config }));
    updateApiSummary();
    syncOllamaModelControls();
  } catch {
    // Ignore missing config on first run.
  }
}

window.updateApiSummary = updateApiSummary;

function updateApiSummary() {
  if (!currentApiSummary) return;
  const format = document.querySelector("#api-format")?.value === "ollama" ? "Ollama" : "OpenAI 兼容";
  const model = document.querySelector("#api-model")?.value || "未选择模型";
  const baseUrl = document.querySelector("#api-base-url")?.value || "未填写地址";
  const gpu = format === "Ollama" && gpuModelInput?.value ? ` / ${gpuModelInput.value}` : "";
  currentApiSummary.textContent = `当前 API：${format} / ${model}${gpu} / ${baseUrl}`;
}

window.syncOllamaModelControls = syncOllamaModelControls;

function syncOllamaModelControls() {
  const isOllama = document.querySelector("#api-format")?.value === "ollama";
  [preloadModelButton, restartModelButton, unloadModelButton, quickPreloadModelButton, quickRestartModelButton, quickUnloadModelButton]
    .forEach((button) => {
      if (!button) return;
      button.classList.toggle("hidden", !isOllama);
      button.disabled = !isOllama;
    });
  gpuModelField?.classList.toggle("hidden", !isOllama);
  gpuActions?.classList.toggle("hidden", !isOllama);
  if (gpuModelInput) gpuModelInput.disabled = !isOllama;
  if (fetchGpusButton) fetchGpusButton.disabled = !isOllama;
}

function readApiConfig() {
  const format = document.querySelector("#api-format").value;
  return {
    format,
    base_url: document.querySelector("#api-base-url").value,
    api_key: document.querySelector("#api-key").value,
    model: document.querySelector("#api-model").value,
    gpu_model: format === "ollama" ? gpuModelInput.value.trim() : "",
  };
}

async function fetchGpuModels() {
  fetchGpusButton.disabled = true;
  gpuStatus.className = "";
  gpuStatus.textContent = "正在读取 GPU...";
  try {
    const response = await postJsonWithRetry("/api/gpus", readApiConfig());
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "读取 GPU 失败");
    }
    gpuOptions.replaceChildren(
      ...(payload.gpus || []).map((gpu) => {
        const option = document.createElement("option");
        option.value = gpu.name || gpu;
        return option;
      })
    );
    if (!gpuModelInput.value && payload.gpus?.length) {
      gpuModelInput.value = payload.gpus[0].name || payload.gpus[0];
      updateApiSummary();
    }
    gpuStatus.className = payload.gpus?.length ? "ok-text" : "";
    gpuStatus.textContent = payload.message || `已读取 ${payload.gpus?.length || 0} 个 GPU。`;
  } catch (error) {
    gpuStatus.className = "error-text";
    gpuStatus.textContent = humanFetchError(error);
  } finally {
    fetchGpusButton.disabled = false;
  }
}

gpuModelInput?.addEventListener("input", updateApiSummary);
gpuModelInput?.addEventListener("change", updateApiSummary);

function renderResults(payload) {
  statusPill.textContent = payload.used_ai ? "AI 已启用" : "本地兜底";
  renderPreview(payload);
  renderGeneratedUserNote(payload);
  renderDownload(payload.download_url, payload.folder_path, payload.folder_files, payload.folder_zip_url);
  loadGenerationHistory();
  loadResumeJobs();
  results.className = "results";
  if (payload.batch && Array.isArray(payload.records)) {
    renderBatchResults(payload.records);
    return;
  }
  const statCard = createGenerationStatsNode(payload.generation_stats);
  const answerCards = payload.answers.map((answer) => {
    const card = document.createElement("article");
    card.className = "answer";

    const top = document.createElement("div");
    top.className = "answer-top";

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = answer.name || "未命名字段";

    const confidence = document.createElement("div");
    confidence.className = "confidence";
    const score = Number(answer.confidence || 0);
    confidence.textContent = `置信度 ${Math.round(score * 100)}%`;

    const value = document.createElement("div");
    value.className = "value";
    value.textContent = answer.value || "未判断";

    const reason = document.createElement("div");
    reason.className = "reason";
    reason.textContent = answer.reason || "";

    top.append(name, confidence);
    card.append(top, value, reason);
    return card;
  });
  results.replaceChildren(
    ...(statCard ? [statCard] : []),
    ...answerCards
  );
}

previewConfirmed?.addEventListener("change", () => {
  const links = downloadSlot.querySelectorAll("a");
  links.forEach((link) => {
    link.classList.toggle("disabled-link", !previewConfirmed.checked);
    link.setAttribute("aria-disabled", previewConfirmed.checked ? "false" : "true");
  });
});

function renderPlanPicker(records) {
  planRecords.replaceChildren();
  if (!records.length) {
    planPicker.classList.remove("hidden");
    planRecords.textContent = "没有从链接或正文中识别到可生成对象。";
    return;
  }

  records.forEach((record, index) => {
    const label = document.createElement("label");
    label.className = "record-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.dataset.index = String(index);
    checkbox.addEventListener("change", syncSelectedRecords);

    const content = document.createElement("span");
    content.className = "record-content";

    const text = document.createElement("span");
    text.className = "record-title";
    text.textContent = describeRecord(record, index);

    const count = document.createElement("small");
    count.textContent = previewRecordMeta(record);

    content.append(text, count);
    label.append(checkbox, content);
    planRecords.append(label);
  });

  planPicker.classList.remove("hidden");
  syncSelectedRecords();
}

function describeRecord(record, index) {
  const answers = Array.isArray(record.answers) ? record.answers : [];
  const moduleValue = findAnswerValue(answers, ["模块", "训练模块"]);
  const planValue = findAnswerValue(answers, ["训练计划", "训练任务"]);
  if (moduleValue || planValue) {
    return `${index + 1}. ${moduleValue || "未识别模块"} - ${planValue || "未识别训练计划"}`;
  }
  return `${index + 1}. ${record.title || "训练日志"}`;
}

function previewRecordMeta(record) {
  const dateText = recordDateValue(record) || "未识别";
  return `日期：${dateText}`;
}

function findAnswerValue(answers, names) {
  const hit = answers.find((answer) => names.includes(answer.name) && answer.value);
  return hit ? hit.value : "";
}

function recordDateValue(record) {
  const answers = Array.isArray(record.answers) ? record.answers : [];
  const direct = extractDateText(record.date || record.source?.date || "");
  if (direct) return direct;

  const namedDate = findAnswerValue(answers, ["日期", "训练日期", "鏃ユ湡", "璁粌鏃ユ湡"]);
  const parsedNamedDate = extractDateText(namedDate);
  if (parsedNamedDate) return parsedNamedDate;
  if (namedDate) return String(namedDate).replace(/\s*00:00:00\s*$/, "").trim();

  const candidates = [
    record.title,
    findAnswerValue(answers, ["训练计划", "训练任务", "模块", "训练模块"]),
    ...answers.map((answer) => answer.value),
  ];
  for (const value of candidates) {
    const parsed = extractDateText(value);
    if (parsed) return parsed;
  }
  return "";
}

function extractDateText(value) {
  const text = String(value || "").replace(/\s*00:00:00\s*$/, "").trim();
  if (!text) return "";

  const fullDate = text.match(/\d{4}[-/.年]\s*\d{1,2}[-/.月]\s*\d{1,2}\s*日?/);
  if (fullDate) {
    return fullDate[0]
      .replace(/\s+/g, "")
      .replace(/[年月/.]/g, "-")
      .replace(/日$/, "")
      .replace(/-+/g, "-");
  }

  const chineseDate = text.match(/\d{1,2}\s*月\s*\d{1,2}\s*日?/);
  if (chineseDate) return chineseDate[0].replace(/\s+/g, "").replace(/日?$/, "日");

  const slashDate = text.match(/(^|[^\d])(\d{1,2})[/-](\d{1,2})($|[^\d])/);
  if (slashDate) {
    const month = Number(slashDate[2]);
    const day = Number(slashDate[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${month}月${day}日`;
    }
  }
  return "";
}

function syncSelectedRecords() {
  if (!importedRecords.length) {
    selectedRecordsInput.value = "";
    return;
  }
  const selected = [...planRecords.querySelectorAll("input[type='checkbox']:checked")]
    .map((check) => importedRecords[Number(check.dataset.index)])
    .filter(Boolean);
  selectedRecordsInput.value = JSON.stringify(selected);
}

function selectedRecordCount() {
  try {
    const records = JSON.parse(selectedRecordsInput.value || "[]");
    return Array.isArray(records) ? records.length : 0;
  } catch {
    return 0;
  }
}

async function runBatchJob() {
  startBatchProgress(selectedRecordCount());
  try {
    const response = await fetch("/api/fill-job", {
      method: "POST",
      body: new FormData(form),
    });
    const job = await readResponse(response);
    if (!response.ok) {
      throw new Error(job.detail || "批量任务创建失败");
    }
    currentBatchJobId = job.id;
    batchPollFailures = 0;
    setCancelBatchButton(true, true);
    renderBatchJobProgress(job);
    loadResumeJobs();
    scheduleBatchPoll(job.id, Math.min(currentBatchPollDelay, 1200));
  } catch (error) {
    failBatchProgress(humanFetchError(error));
    statusPill.textContent = "失败";
    results.className = "results empty";
    results.textContent = humanFetchError(error);
  }
}

function startBatchProgress(total) {
  window.clearTimeout(batchProgressTimer);
  currentBatchJobId = "";
  batchPollFailures = 0;
  currentBatchPollDelay = DEFAULT_BATCH_POLL_DELAY;
  const safeTotal = Math.max(total, 1);
  batchProgressPanel.classList.remove("hidden");
  setCancelBatchButton(false, false);
  updateBatchProgress(0, "批量生成中", `0/${safeTotal}`, "正在提交后台任务...");
}

async function pollBatchJob(jobId) {
  const response = await fetch(`/api/jobs/${jobId}`);
  const job = await readResponse(response);
  if (!response.ok) {
    const error = new Error(job.detail || "读取批量任务进度失败");
    error.status = response.status;
    throw error;
  }
  batchPollFailures = 0;
  renderBatchJobProgress(job);
  if (job.status === "complete") {
    currentBatchJobId = "";
    setCancelBatchButton(false, false);
    lastPayload = job.result;
    renderResults(job.result);
    copyButton.disabled = false;
    return;
  }
  if (job.status === "failed") {
    currentBatchJobId = "";
    setCancelBatchButton(false, false);
    loadResumeJobs();
    if (job.partial_result) {
      lastPayload = job.partial_result;
      renderResults(job.partial_result);
      copyButton.disabled = false;
      failBatchProgress(job.message || job.error || "批量生成失败，已导出已完成部分。", job.partial_result, {
        title: batchFailureTitle(job.message || job.error || ""),
      });
      return;
    }
    const failureMessage = job.message || job.error || "批量生成失败";
    failBatchProgress(failureMessage, null, { title: batchFailureTitle(failureMessage) });
    statusPill.textContent = "失败";
    results.className = "results empty";
    results.textContent = failureMessage;
    return;
  }
  if (job.status === "canceled") {
    currentBatchJobId = "";
    setCancelBatchButton(false, false);
    updateBatchProgress(0, "批量生成已取消", batchProgressCount.textContent || "0/0", job.message || "批量生成已取消。");
    statusPill.textContent = "已取消";
    results.className = "results empty";
    results.textContent = "批量生成已取消。已完成的篇数会保留，可以在“未完成批量任务”里继续生成剩余内容。";
    loadResumeJobs();
    return;
  }
  setCancelBatchButton(true, true);
  scheduleBatchPoll(jobId);
}

function scheduleBatchPoll(jobId, delay = currentBatchPollDelay) {
  window.clearTimeout(batchProgressTimer);
  batchProgressTimer = window.setTimeout(() => {
    pollBatchJob(jobId).catch((error) => handleBatchPollError(jobId, error));
  }, Number(delay) || DEFAULT_BATCH_POLL_DELAY);
}

function handleBatchPollError(jobId, error) {
  if (currentBatchJobId !== jobId) return;
  const retryable = !error.status || error.status >= 500;
  if (retryable && batchPollFailures < 8) {
    batchPollFailures += 1;
    statusPill.textContent = "重连中";
    batchProgressTitle.textContent = "连接中断，正在重试";
    batchProgressDetail.textContent = `${humanFetchError(error)} 正在第 ${batchPollFailures} 次重试...`;
    setCancelBatchButton(true, true);
    scheduleBatchPoll(jobId, Math.min(currentBatchPollDelay + batchPollFailures * 1000, 10000));
    return;
  }
  failBatchProgress(humanFetchError(error), null, {
    keepJobId: retryable,
    canCancel: retryable,
    title: retryable ? "连接中断" : "",
  });
  statusPill.textContent = "失败";
  results.className = "results empty";
  results.textContent = humanFetchError(error);
}

function setCancelBatchButton(enabled, visible = true, label = "取消生成") {
  cancelBatchButton.disabled = !enabled;
  cancelBatchButton.classList.toggle("hidden", !visible);
  cancelBatchButton.textContent = label;
}

function renderBatchJobProgress(job) {
  currentBatchPollDelay = batchPollDelayFromJob(job);
  const total = Math.max(Number(job.total) || 0, 1);
  const completed = Math.min(Number(job.completed) || 0, total);
  const percent = Math.round((completed / total) * 100);
  const title = job.status === "complete" ? "批量生成完成" : "批量生成中";
  updateBatchProgress(percent, title, `${completed}/${total}`, job.message || "正在生成...");
}

function batchPollDelayFromJob(job) {
  const value = Number(job?.poll_interval_ms);
  if (Number.isFinite(value) && value >= 800) {
    return Math.min(Math.max(value, 800), 8000);
  }
  return job?.api_format === "ollama" ? 3000 : DEFAULT_BATCH_POLL_DELAY;
}

function updateBatchProgress(percent, title, count, detail) {
  batchProgressTitle.textContent = title;
  batchProgressCount.textContent = count;
  batchProgressFill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  batchProgressDetail.textContent = detail;
}

function finishBatchProgress(payload) {
  if (!payload?.batch) {
    resetBatchProgress();
    return;
  }
  window.clearTimeout(batchProgressTimer);
  const total = Array.isArray(payload.records) ? payload.records.length : selectedRecordCount();
  updateBatchProgress(100, "批量生成完成", `${total}/${total}`, payload.used_ai ? "已使用当前模型生成并写入完成。" : "已使用本地兜底生成并写入完成。");
}

function failBatchProgress(message, partialPayload = null, options = {}) {
  window.clearTimeout(batchProgressTimer);
  if (!options.keepJobId) {
    currentBatchJobId = "";
  }
  setCancelBatchButton(Boolean(options.canCancel && currentBatchJobId), Boolean(options.canCancel && currentBatchJobId));
  if (batchProgressPanel.classList.contains("hidden")) return;
  batchProgressTitle.textContent = options.title || (partialPayload ? "批量生成中断" : "批量生成失败");
  batchProgressDetail.textContent = message || "生成失败，请检查任务内容和 API 配置。";
}

function batchFailureTitle(message) {
  const raw = String(message || "");
  // 后端会在失败信息里带上 [AI_XXX] 错误码，优先把它显示在标题上，方便一眼定位。
  const codeMatch = raw.match(/\[(AI_[A-Z0-9_]+|PDF_[A-Z0-9_]+)\]/);
  const code = codeMatch ? codeMatch[1] : "";
  const text = raw.toLowerCase();
  let label = "批量生成中断";
  if (code === "AI_BAD_JSON" || text.includes("json") || text.includes("records must") || text.includes("输出格式")) {
    label = "模型输出格式错误";
  } else if (code === "AI_TIMEOUT" || text.includes("timeout") || text.includes("超时")) {
    label = "模型请求超时";
  } else if (code === "AI_AUTH") {
    label = "API 密钥/权限错误";
  } else if (code === "AI_RATE_LIMIT") {
    label = "API 触发限流";
  } else if (code === "AI_MODEL_NOT_FOUND") {
    label = "模型名不存在";
  } else if (code === "AI_UPSTREAM" || code === "AI_UNAVAILABLE" || code === "AI_SERVER") {
    label = "API 服务异常";
  }
  return code ? `${label}（${code}）` : label;
}

function resetBatchProgress() {
  window.clearTimeout(batchProgressTimer);
  currentBatchJobId = "";
  batchPollFailures = 0;
  batchProgressPanel.classList.add("hidden");
  setCancelBatchButton(false, false);
  batchProgressFill.style.width = "0";
  batchProgressCount.textContent = "0/0";
  batchProgressDetail.textContent = "正在准备生成任务...";
}

function setFillMode(batchMode) {
  batchModeInput.checked = batchMode;
  manualModeButton.classList.toggle("active", !batchMode);
  batchFillModeButton.classList.toggle("active", batchMode);
  manualModeButton.setAttribute("aria-pressed", batchMode ? "false" : "true");
  batchFillModeButton.setAttribute("aria-pressed", batchMode ? "true" : "false");
  manualFillPanels.forEach((panel) => panel.classList.toggle("hidden", batchMode));
  autoFillPanels.forEach((panel) => panel.classList.toggle("hidden", !batchMode));
  setPanelFieldsDisabled(manualFillPanels, batchMode);
  setPanelFieldsDisabled(autoFillPanels, !batchMode);
  if (batchMode) {
    setRequirementsSourceMode(requirementsSourceModeInput?.value || "text", { silent: true });
  }
  restoreTopActionButtons();
}

function setRequirementsSourceMode(mode, options = {}) {
  const useText = mode === "text";
  if (requirementsSourceModeInput) requirementsSourceModeInput.value = useText ? "text" : "link";
  requirementsLinkModeButton?.classList.toggle("active", !useText);
  requirementsTextModeButton?.classList.toggle("active", useText);
  requirementsLinkModeButton?.setAttribute("aria-pressed", useText ? "false" : "true");
  requirementsTextModeButton?.setAttribute("aria-pressed", useText ? "true" : "false");
  requirementsLinkSourceControls.forEach((control) => control.classList.toggle("hidden", useText));
  requirementsTextSourceControls.forEach((control) => control.classList.toggle("hidden", !useText));
  setPanelFieldsDisabled(requirementsLinkSourceControls, useText);
  setPanelFieldsDisabled(requirementsTextSourceControls, !useText);
  if (!options.silent) {
    clearImportedRecords("任务来源已切换，请重新导入训练计划。");
  }
  restoreTopActionButtons();
}

function setPanelFieldsDisabled(panels, disabled) {
  panels.forEach((panel) => {
    panel.querySelectorAll("input, textarea, select, button").forEach((control) => {
      control.disabled = disabled;
    });
  });
}

async function readResponse(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
}

function renderBatchResults(records) {
  results.replaceChildren(
    ...records.map((record, index) => {
      const card = document.createElement("article");
      card.className = "answer";

      const title = document.createElement("div");
      title.className = "name";
      title.textContent = `${index + 1}. ${record.title || "训练日志"}`;

      const summary = document.createElement("div");
      summary.className = "reason";
      summary.textContent = `已生成 ${Array.isArray(record.answers) ? record.answers.length : 0} 个字段`;
      const stats = createGenerationStatsNode(record.generation_stats);

      card.append(title, summary);
      if (stats) card.append(stats);
      return card;
    })
  );
}

function renderGeneratedUserNote(payload) {
  if (!generatedUserNote) return;
  const generatedUser = String(payload?.generated_user || "").trim();
  if (!generatedUser) {
    generatedUserNote.classList.add("hidden");
    generatedUserNote.textContent = "";
    return;
  }
  generatedUserNote.classList.remove("hidden");
  generatedUserNote.textContent = `生成用户：${generatedUser}。本次记录已写入历史记录，可在电脑重启后继续查找下载。`;
}

// 兜底：在历史区域整体加一道 contextmenu 监听，遇到点在卡里就阻止浏览器默认菜单，
// 找到对应卡片冒泡触发后，浏览器自带菜单就不会再跳出来了。
(function attachHistoryPanelContextmenu() {
  const panel = document.querySelector(".history-panel");
  if (!panel) return;
  panel.addEventListener("contextmenu", (event) => {
    const card = event.target.closest && event.target.closest(".history-item");
    if (card) {
      event.preventDefault();
    }
  });
  const resume = document.querySelector("#resume-panel");
  if (resume) {
    resume.addEventListener("contextmenu", (event) => {
      const card = event.target.closest && event.target.closest(".resume-job-item");
      if (card) {
        event.preventDefault();
      }
    });
  }
})();

async function loadGenerationHistory() {
  if (!historyList || !historyStatus) return;
  const writer = historyWriterFilter?.value?.trim() || "";
  historyStatus.className = "";
  historyStatus.textContent = "正在读取历史记录...";
  try {
    const query = new URLSearchParams({ limit: "80" });
    if (writer) query.set("writer", writer);
    const response = await fetch(`/api/history?${query.toString()}`);
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "读取历史记录失败");
    }
    renderGenerationHistory(payload.items || [], payload);
  } catch (error) {
    historyList.replaceChildren();
    historyStatus.className = "error-text";
    historyStatus.textContent = humanFetchError(error);
  }
}

async function loadResumeJobs() {
  if (!resumePanel || !resumeJobList || !resumeStatus) return;
  resumeStatus.className = "";
  resumeStatus.textContent = "正在检查未完成任务...";
  try {
    const response = await fetch("/api/resume-jobs");
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "读取未完成任务失败");
    }
    renderResumeJobs(payload.items || []);
  } catch (error) {
    resumePanel.classList.remove("hidden");
    resumeJobList.replaceChildren();
    resumeStatus.className = "error-text";
    resumeStatus.textContent = humanFetchError(error);
  }
}

function renderResumeJobs(items) {
  resumeJobList.replaceChildren();
  if (!items.length) {
    resumePanel.classList.add("hidden");
    resumeStatus.textContent = "";
    return;
  }
  resumePanel.classList.remove("hidden");
  resumeStatus.className = "";
  resumeStatus.textContent = `发现 ${items.length} 个未完成批量任务，可以从已完成位置继续生成。`;
  resumeJobList.replaceChildren(...items.map(createResumeJobNode));
}

function createResumeJobNode(item) {
  const card = document.createElement("article");
  card.className = "resume-job-item";

  const top = document.createElement("div");
  top.className = "resume-job-top";
  const title = document.createElement("strong");
  title.textContent = item.title || "未完成批量任务";
  const badge = document.createElement("span");
  badge.textContent = resumeStatusLabel(item.status);
  top.append(title, badge);

  const meta = document.createElement("div");
  meta.className = "resume-job-meta";
  meta.textContent = [
    `进度：${Number(item.completed || 0)}/${Number(item.total || 0)}`,
    `剩余：${Number(item.remaining || 0)} 篇`,
    item.updated_at ? `更新：${formatHistoryTime(item.updated_at)}` : "",
  ].filter(Boolean).join(" / ");

  const message = document.createElement("p");
  message.className = "resume-job-message";
  message.textContent = item.message || "可以继续生成剩余文件。";

  const actions = document.createElement("div");
  actions.className = "resume-job-actions";
  const continueButton = document.createElement("button");
  continueButton.type = "button";
  continueButton.textContent = "继续生成";
  continueButton.addEventListener("click", () => continueResumeJob(item.id, continueButton));
  actions.append(continueButton);

  if (item.folder_zip_url) {
    const downloadLink = document.createElement("a");
    downloadLink.className = "resume-download-link";
    downloadLink.href = item.folder_zip_url;
    downloadLink.textContent = "下载已完成文件夹";
    actions.append(downloadLink);
  }

  const files = Array.isArray(item.folder_files) ? item.folder_files : [];
  if (files.length) {
    const count = document.createElement("span");
    count.className = "resume-file-count";
    count.textContent = `已完成文件：${files.length} 个`;
    actions.append(count);
  }

  card.append(top, meta, message, actions);

  // 右键菜单：从列表里删除这条未完成批量任务。
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const statusLabel = resumeStatusLabel(item.status);
    openContextMenu(event.clientX, event.clientY, [
      {
        label: "删除这个批量任务",
        danger: true,
        onClick: async () => {
          if (!window.confirm(`确定删除「${item.title || "未完成批量任务"}」吗？\n当前状态：${statusLabel}。\n（只是从列表里去掉，已经生成的文件夹仍会保留，可在下载里找到）`)) {
            return;
          }
          await deleteResumeJob(String(item.id || ""), card);
        },
      },
      { label: "取消" },
    ]);
  });

  return card;
}

async function deleteResumeJob(jobId, card) {
  if (!jobId) return;
  if (card) card.style.opacity = "0.5";
  try {
    const response = await fetch(`/api/resume-jobs/${encodeURIComponent(jobId)}`, { method: "DELETE" });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "删除失败");
    }
    if (card && card.parentNode) card.parentNode.removeChild(card);
    loadResumeJobs();
  } catch (error) {
    if (card) card.style.opacity = "";
    if (resumeStatus) {
      resumeStatus.className = "error-text";
      resumeStatus.textContent = humanFetchError(error);
    }
  }
}

function resumeStatusLabel(status) {
  if (status === "running") return "生成中";
  if (status === "failed") return "失败可继续";
  if (status === "canceled") return "已取消";
  if (status === "interrupted") return "中断可继续";
  return "未完成";
}

async function continueResumeJob(jobId, button) {
  if (!jobId) return;
  const oldText = button?.textContent || "继续生成";
  if (button) {
    button.disabled = true;
    button.textContent = "正在继续";
  }
  try {
    const response = await fetch(`/api/resume-jobs/${jobId}/continue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_config: readApiConfig() }),
    });
    const job = await readResponse(response);
    if (!response.ok) {
      throw new Error(job.detail || "继续任务失败");
    }
    currentBatchJobId = job.id;
    batchPollFailures = 0;
    batchProgressPanel.classList.remove("hidden");
    setCancelBatchButton(true, true);
    renderBatchJobProgress(job);
    scheduleBatchPoll(job.id, Math.min(currentBatchPollDelay, 1200));
    statusPill.textContent = "继续中";
    results.className = "results empty";
    results.textContent = "正在继续未完成的批量任务...";
    loadResumeJobs();
  } catch (error) {
    resumeStatus.className = "error-text";
    resumeStatus.textContent = humanFetchError(error);
    if (button) {
      button.disabled = false;
      button.textContent = oldText;
    }
  }
}

function renderGenerationHistory(items, payload = {}) {
  historyList.replaceChildren();
  if (!items.length) {
    historyStatus.className = "";
    historyStatus.textContent = historyWriterFilter?.value?.trim()
      ? "没有找到这个填写人的历史记录。"
      : "还没有历史记录。生成完成后会自动出现在这里。";
    return;
  }
  const modeTip = payload.auth_required
    ? "当前按登录账号显示历史记录。"
    : "免密码模式下，历史记录按“填写人”区分；多人同机使用时请填写不同姓名。";
  historyStatus.className = "";
  historyStatus.textContent = `已读取 ${items.length} 条历史。${modeTip}`;
  historyList.replaceChildren(...items.map(createHistoryItemNode));
}

function createHistoryItemNode(item) {
  const card = document.createElement("article");
  card.className = "history-item";
  if (!item.available) card.classList.add("missing");
  card.dataset.historyId = String(item.id || "");
  const recoveredFlag = Boolean(item.recovered) || String(item.id || "").startsWith("discovered-");
  if (recoveredFlag) card.dataset.recovered = "1";

  const top = document.createElement("div");
  top.className = "history-item-top";
  const title = document.createElement("strong");
  title.textContent = item.title || "训练日志";
  // 填写人徽标：让“是谁生成的”一眼看到，免去翻 meta 行。
  const writerName = (item.generated_user || "").trim();
  if (writerName && writerName !== "未填写") {
    const writerBadge = document.createElement("span");
    writerBadge.className = "history-writer-badge";
    writerBadge.textContent = `填写人：${writerName}`;
    writerBadge.title = `这条记录的填写人是 ${writerName}`;
    top.append(title, writerBadge);
  } else {
    top.append(title);
  }
  const time = document.createElement("span");
  time.className = "history-time";
  time.textContent = formatHistoryTime(item.created_at);
  top.append(time);

  const meta = document.createElement("div");
  meta.className = "history-meta";
  const stats = item.stats || {};
  const recovered = recoveredFlag;
  // 速率仍以输出 token 为口径（输入是 prompt 解码，速度本来就远高于生成）。
  const durationSec = Number(stats.duration_seconds || 0);
  const parallelCount = Number(stats.parallel || 0);
  const outputTok = Number(stats.output_tokens || 0);
  const totalTok = Number(stats.total_tokens || 0);
  const speedTok = outputTok > 0 ? outputTok : totalTok;
  const tps = (durationSec > 0 && speedTok > 0) ? (speedTok / durationSec).toFixed(1) : "";
  const tokenText = totalTok ? `Token ${totalTok}` : "Token 未统计";
  const durationLabel = parallelCount > 1 ? `耗时 ${durationSec.toFixed(1)} 秒（${parallelCount} 路并发）` : (durationSec ? `耗时 ${durationSec.toFixed(1)} 秒` : "耗时未统计");
  const durationText = durationLabel;
  const speedText = tps ? `速率 ${tps} token/s` : "";
  meta.textContent = [
    `生成用户：${item.generated_user || "未填写"}`,
    `篇数：${item.record_count || 1}`,
    item.model ? `模型：${item.model}` : "",
    `来源：${item.source_label || "本机"}`,
    recovered ? "找回文件：仅可下载，不含历史耗时和 Token" : durationText,
    recovered ? "" : tokenText,
    recovered ? "" : speedText,
  ].filter(Boolean).join(" / ");

  const titles = document.createElement("div");
  titles.className = "history-record-titles";
  titles.textContent = Array.isArray(item.record_titles) && item.record_titles.length
    ? item.record_titles.slice(0, 4).join("；")
    : "";

  const actions = document.createElement("div");
  actions.className = "history-actions";
  const downloads = Array.isArray(item.downloads) ? item.downloads : [];
  if (downloads.length) {
    const batchDownloads = downloads.filter((download) => download?.kind === "folder_zip");
    const fileDownloads = downloads.filter((download) => download?.kind !== "folder_zip");
    const visibleDownloads = batchDownloads.length ? batchDownloads : fileDownloads.slice(0, 8);
    visibleDownloads.forEach((download) => {
      if (download.available === false) {
        const missing = document.createElement("span");
        missing.className = "history-missing-link";
        missing.textContent = `${download.label || "文件"}已不存在`;
        actions.append(missing);
        return;
      }
      const link = document.createElement("a");
      link.href = download.url;
      link.textContent = download.label || "下载";
      link.className = "history-download";
      if (download.kind === "folder_zip") link.classList.add("batch-history-download");
      actions.append(link);
    });
    if (batchDownloads.length && fileDownloads.length) {
      actions.append(createHistoryFilesDetails(fileDownloads));
    }
  } else {
    const none = document.createElement("span");
    none.className = "history-missing-link";
    none.textContent = "没有可下载文件";
    actions.append(none);
  }

  card.append(top, meta);
  if (titles.textContent) card.append(titles);
  card.append(actions);

  // 右键菜单：
  //  - 不在选择模式：单删 + 进入选择并标记这张
  //  - 在选择模式：切换这张的选中态 + 批量删除选中的
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const itemId = String(item.id || "");
    const recovered = Boolean(item.recovered) || itemId.startsWith("discovered-");
    const writer = (item.generated_user || "").trim();
    const tip = writer ? `（填写人：${writer}）` : "";
    const singleDelete = {
      label: recovered ? "从磁盘删除整个文件夹" : "删除这条历史",
      danger: true,
      onClick: async () => {
        if (recovered) {
          const title = item.title || "找回项";
          if (!window.confirm(`这会从 outputs/ 里永久删除「${title}」整个文件夹/文件，不可恢复。\n继续？`)) return;
          if (!window.confirm("再确认一次：真的从磁盘删掉吗？")) return;
          await deleteRecoveredEntry(itemId, card);
        } else {
          if (!window.confirm(`确定删除这条历史记录${tip}吗？\n（只是从列表里去掉，不会删除已生成的文档文件）`)) return;
          await deleteHistoryEntry(itemId, card);
        }
      },
    };

    if (typeof historySelectMode !== "undefined" && historySelectMode) {
      // 选择模式：切换这张 + 批量删除选中的 + 退出
      const isSelected = historySelectedIds.has(itemId);
      openContextMenu(event.clientX, event.clientY, [
        {
          label: isSelected ? "取消选择这条" : "加入选择",
          onClick: () => {
            if (isSelected) historySelectedIds.delete(itemId);
            else historySelectedIds.add(itemId);
            refreshHistorySelectionVisuals();
          },
        },
        {
          label: `删除选中的 ${historySelectedIds.size} 条`,
          danger: true,
          disabled: historySelectedIds.size === 0,
          onClick: () => historyBatchDelete?.click(),
        },
        {
          label: "退出选择模式",
          onClick: () => setHistorySelectMode(false),
        },
        { label: "取消" },
      ]);
    } else {
      // 普通模式：单删 + 进入选择（顺手选中这张）
      openContextMenu(event.clientX, event.clientY, [
        singleDelete,
        {
          label: "进入选择模式（顺便选中这条）",
          onClick: () => {
            setHistorySelectMode(true);
            historySelectedIds.add(itemId);
            refreshHistorySelectionVisuals();
          },
        },
        { label: "取消" },
      ]);
    }
  });

  return card;
}

// 通用右键菜单：历史记录 / 未完成批量任务 共用一套。
let activeContextMenu = null;

function closeContextMenu() {
  if (activeContextMenu && activeContextMenu.parentNode) {
    activeContextMenu.parentNode.removeChild(activeContextMenu);
  }
  activeContextMenu = null;
  document.removeEventListener("click", handleContextMenuClickOutside, true);
  document.removeEventListener("contextmenu", handleContextMenuOutside, true);
  window.removeEventListener("blur", closeContextMenu);
  window.removeEventListener("resize", closeContextMenu);
}

// 只在点击落在菜单*外部*时才关闭。点击菜单内部按钮要让按钮自己的 click 处理跑完。
function handleContextMenuClickOutside(event) {
  if (activeContextMenu && !activeContextMenu.contains(event.target)) {
    closeContextMenu();
  }
}

function handleContextMenuOutside(event) {
  if (activeContextMenu && !activeContextMenu.contains(event.target)) {
    closeContextMenu();
  }
}

function openContextMenu(clientX, clientY, items) {
  closeContextMenu();
  const menu = document.createElement("div");
  menu.className = "history-context-menu";
  menu.setAttribute("role", "menu");

  items.forEach((entry) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-context-menu-item" + (entry.danger ? " danger" : "");
    btn.textContent = entry.label;
    btn.disabled = !!entry.disabled;
    btn.addEventListener("click", async () => {
      closeContextMenu();
      if (entry.onClick && !entry.disabled) {
        try { await entry.onClick(); } catch (e) { console.error(e); }
      }
    });
    menu.append(btn);
  });

  menu.style.visibility = "hidden";
  document.body.append(menu);
  const rect = menu.getBoundingClientRect();
  const x = Math.min(clientX, window.innerWidth - rect.width - 8);
  const y = Math.min(clientY, window.innerHeight - rect.height - 8);
  menu.style.left = `${Math.max(8, x)}px`;
  menu.style.top = `${Math.max(8, y)}px`;
  menu.style.visibility = "visible";

  activeContextMenu = menu;
  document.addEventListener("click", handleContextMenuClickOutside, true);
  document.addEventListener("contextmenu", handleContextMenuOutside, true);
  window.addEventListener("blur", closeContextMenu);
  window.addEventListener("resize", closeContextMenu);
}

async function deleteRecoveredEntry(recoveredId, card) {
  if (!recoveredId) return;
  if (card) card.style.opacity = "0.5";
  try {
    const response = await fetch(`/api/recovered/${encodeURIComponent(recoveredId)}`, { method: "DELETE" });
    const payload = await readResponse(response);
    if (!response.ok) throw new Error(payload.detail || "删除失败");
    if (card && card.parentNode) card.parentNode.removeChild(card);
    loadGenerationHistory();
  } catch (error) {
    if (card) card.style.opacity = "";
    if (historyStatus) {
      historyStatus.className = "error-text";
      historyStatus.textContent = humanFetchError(error);
    }
  }
}

async function deleteHistoryEntry(historyId, card) {
  if (!historyId) return;
  if (card) card.style.opacity = "0.5";
  try {
    const response = await fetch(`/api/history/${encodeURIComponent(historyId)}`, { method: "DELETE" });
    const payload = await readResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || "删除失败");
    }
    if (card && card.parentNode) card.parentNode.removeChild(card);
    // 删完刷新一下状态行的“已读取 X 条”计数
    loadGenerationHistory();
  } catch (error) {
    if (card) card.style.opacity = "";
    if (historyStatus) {
      historyStatus.className = "error-text";
      historyStatus.textContent = humanFetchError(error);
    }
  }
}

function createHistoryFilesDetails(downloads) {
  const details = document.createElement("details");
  details.className = "history-file-details";
  const summary = document.createElement("summary");
  summary.textContent = `查看单个文件（${downloads.length} 个）`;
  const list = document.createElement("div");
  list.className = "history-file-list";
  downloads.forEach((download) => {
    if (download.available === false) {
      const missing = document.createElement("span");
      missing.className = "history-missing-link";
      missing.textContent = `${download.label || "文件"}已不存在`;
      list.append(missing);
      return;
    }
    const link = document.createElement("a");
    link.href = download.url;
    link.textContent = download.label || "下载";
    link.className = "history-download";
    list.append(link);
  });
  details.append(summary, list);
  return details;
}

function formatHistoryTime(value) {
  if (!value) return "未知时间";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function renderDownload(downloadUrl, folderPath = "", folderFiles = [], folderZipUrl = "") {
  downloadSlot.replaceChildren();
  if (folderPath) {
    const files = Array.isArray(folderFiles)
      ? folderFiles.filter((file) => file?.download_url && file?.name)
      : [];
    const resolvedFolderZipUrl = folderZipUrl || folderZipUrlFromPath(folderPath);
    const card = document.createElement("div");
    card.className = "folder-download-card";

    const message = document.createElement("div");
    message.className = "folder-output";
    message.textContent = `文件夹已生成：${folderPath}`;

    const actions = document.createElement("div");
    actions.className = "folder-download-actions";
    if (resolvedFolderZipUrl) {
      const batchLink = document.createElement("a");
      batchLink.className = "download-link batch-download";
      batchLink.href = resolvedFolderZipUrl;
      batchLink.textContent = "下载整个文件夹";
      actions.append(batchLink);
    }
    if (files.length) {
      actions.append(createFolderFilesDetails(files));
    }
    card.append(message, actions);
    downloadSlot.append(card);
    return;
  }
  if (!downloadUrl) return;
  const link = document.createElement("a");
  link.className = "download-link";
  link.href = downloadUrl;
  const suffix = downloadUrl.toLowerCase().split("?")[0].split(".").pop();
  if (suffix === "zip") {
    link.textContent = "下载批量训练日志 ZIP";
  } else {
    link.textContent = suffix === "pdf" ? "下载已填写 PDF" : "下载已填写 DOCX";
  }
  downloadSlot.append(link);
}

function createFolderFilesDetails(files) {
  const details = document.createElement("details");
  details.className = "folder-file-details";
  const summary = document.createElement("summary");
  summary.textContent = `查看单个文件（${files.length} 个）`;
  const list = document.createElement("div");
  list.className = "folder-file-list";
  files.forEach((file) => {
    const link = document.createElement("a");
    link.className = "download-link";
    link.href = file.download_url;
    link.textContent = `下载 ${file.name}`;
    list.append(link);
  });
  details.append(summary, list);
  return details;
}

function folderZipUrlFromPath(folderPath) {
  const folderName = String(folderPath || "").replace(/\\/g, "/").split("/").filter(Boolean).pop();
  return folderName ? `/download-folder-zip/${encodeURIComponent(folderName)}` : "";
}

function renderPreview(payload) {
  const records = payload.batch && Array.isArray(payload.records)
    ? payload.records
    : [{ title: payload.filename || "训练日志", answers: payload.answers || [], generation_stats: payload.generation_stats }];
  previewList.replaceChildren(...records.map((record, index) => createPreviewCard(record, index)));
  previewPanel.classList.remove("hidden");
}

function createPreviewCard(record, index) {
  const card = document.createElement("article");
  card.className = "preview-card";

  const title = document.createElement("h4");
  title.textContent = `${index + 1}. ${record.title || "训练日志"}`;
  card.append(title);
  const stats = createGenerationStatsNode(record.generation_stats);
  if (stats) card.append(stats);

  const answers = Array.isArray(record.answers) ? record.answers : [];
  const table = document.createElement("table");
  table.className = "word-preview";
  table.append(
    previewRow([
      ["日期", findAnswerValue(answers, ["日期"])],
      ["授课老师", findAnswerValue(answers, ["授课老师", "负责教练"])],
    ]),
    previewRow([
      ["训练模块", findAnswerValue(answers, ["训练模块", "模块"])],
      ["训练任务", compactRepeatedPlan(findAnswerValue(answers, ["训练任务", "训练计划"]))],
    ]),
    previewFullRow("训练内容", findAnswerValue(answers, ["训练内容"])),
    previewFullRow("学习笔记", findAnswerValue(answers, ["学习笔记"])),
    previewFullRow("总结", findAnswerValue(answers, ["总结"])),
    previewFullRow("填写人", findAnswerValue(answers, ["填写人"]))
  );
  card.append(table);
  return card;
}
function createGenerationStatsNode(stats) {
  if (!stats || typeof stats !== "object") return null;
  const row = document.createElement("div");
  row.className = "generation-stats";
  const sourceLabel = stats.token_source === "api"
    ? "精确"
    : stats.token_source === "allocated"
      ? "按篇分摊"
      : stats.token_source === "none"
        ? "无 token"
        : "估算";
  const total = Number(stats.total_tokens || 0);
  const input = Number(stats.input_tokens || 0);
  const output = Number(stats.output_tokens || 0);
  const duration = Number(stats.duration_seconds || 0);
  // 速率口径：只统计模型实际生成（输出）token / 耗时。
  // 输入 token 是 prompt 解码，速度天然远高于生成，混在分子里会把数值算得偏高。
  const speedTokens = output > 0 ? output : total;
  const tps = (duration > 0 && speedTokens > 0) ? (speedTokens / duration).toFixed(1) : null;
  row.replaceChildren(
    statPill("耗时", duration ? `${duration.toFixed(duration >= 10 ? 1 : 2)} 秒` : "0 秒"),
    statPill("Token", total ? `${total}（入 ${input} / 出 ${output}）` : "未统计"),
    ...(tps ? [statPill("生成速率", `${tps} token/s`)] : []),
    statPill("来源", sourceLabel),
    statPill("模型", stats.model || "未知模型")
  );
  return row;
}

function statPill(label, value) {
  const item = document.createElement("span");
  item.className = "generation-stat-pill";
  const name = document.createElement("b");
  name.textContent = `${label}：`;
  const text = document.createElement("span");
  text.textContent = value;
  item.append(name, text);
  return item;
}
function previewRow(items) {
  const row = document.createElement("tr");
  items.forEach(([label, value]) => {
    const th = document.createElement("th");
    th.textContent = label;
    const td = document.createElement("td");
    td.textContent = value || "";
    row.append(th, td);
  });
  return row;
}

function previewFullRow(label, value) {
  const row = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = label;
  const td = document.createElement("td");
  td.colSpan = 3;
  td.textContent = value || "";
  row.append(th, td);
  return row;
}

function compactRepeatedPlan(value) {
  const lines = String(value || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const seen = new Set();
  const unique = [];
  lines.forEach((line) => {
    const cleaned = line.replace(/^\d+[.、]\s*/, "").trim();
    const key = cleaned.replace(/\s+/g, "");
    if (!key || seen.has(key)) return;
    seen.add(key);
    unique.push(cleaned);
  });
  return unique.map((line, index) => `${index + 1}. ${line}`).join("\n");
}

// ============== 共享设置（左上角齿轮） ==============
// host 账号能编辑共享内容；其他人进来时自动拉一份预填到表单里。

const shareSettingsToggle = document.querySelector("#share-settings-toggle");
const shareSettingsPanel = document.querySelector("#share-settings-panel");
const shareSettingsCloseBtn = document.querySelector("#share-settings-close");
const shareSettingsSaveBtn = document.querySelector("#share-settings-save");
const shareSettingsStatusEl = document.querySelector("#share-settings-status");
const shareApiToggleEl = document.querySelector("#share-api-toggle");
const sharePromptToggleEl = document.querySelector("#share-prompt-toggle");
const shareSkillsToggleEl = document.querySelector("#share-skills-toggle");
const sharedPromptTextarea = document.querySelector("#shared-prompt-text");
const sharedSkillsTextarea = document.querySelector("#shared-skills-text");

async function refreshShareSettingsUI() {
  if (!shareSettingsToggle) return null;
  try {
    const response = await fetch("/api/share-settings");
    if (!response.ok) return null;
    const data = await response.json();
    shareSettingsToggle.classList.toggle("hidden", !data.is_host);
    if (data.is_host) {
      if (shareApiToggleEl) shareApiToggleEl.checked = !!data.share_api;
      if (sharePromptToggleEl) sharePromptToggleEl.checked = !!data.share_prompt;
      if (shareSkillsToggleEl) shareSkillsToggleEl.checked = !!data.share_skills;
      if (sharedPromptTextarea) sharedPromptTextarea.value = data.shared_prompt || "";
      if (sharedSkillsTextarea) sharedSkillsTextarea.value = data.shared_skills || "";
      updateCurrentShareSummary(data);
    }
    return data;
  } catch (e) {
    console.error("share-settings load failed", e);
    return null;
  }
}

function updateCurrentShareSummary(data) {
  const el = document.querySelector("#current-share-summary");
  if (!el) return;
  const prompt = String(data.shared_prompt || "").trim();
  const skills = String(data.shared_skills || "").trim();
  const skillsLines = skills ? skills.split(/\r?\n/).filter(Boolean).length : 0;
  const promptInfo = prompt
    ? `📝 提示词：${prompt.length} 字 — "${prompt.slice(0, 40).replace(/\n/g, " ")}${prompt.length > 40 ? "..." : ""}"`
    : "📝 提示词：（空，主表单里没填内容；非 host 的人看不到任何提示词）";
  const skillsInfo = skills
    ? `🎯 Skills：${skillsLines} 行 — "${skills.slice(0, 40).replace(/\n/g, " · ")}${skills.length > 40 ? "..." : ""}"`
    : "🎯 Skills：（空，主表单里没填内容；非 host 的人看不到任何 skills）";
  el.innerHTML = `<div class="share-current-line">${promptInfo}</div><div class="share-current-line">${skillsInfo}</div>`;
}

if (shareSettingsToggle && shareSettingsPanel) {
  shareSettingsToggle.addEventListener("click", () => {
    shareSettingsPanel.classList.remove("hidden");
    if (shareSettingsStatusEl) shareSettingsStatusEl.textContent = "";
  });
}
if (shareSettingsCloseBtn && shareSettingsPanel) {
  shareSettingsCloseBtn.addEventListener("click", () => {
    shareSettingsPanel.classList.add("hidden");
  });
}
if (shareSettingsPanel) {
  // 点遮罩关闭
  shareSettingsPanel.addEventListener("click", (event) => {
    if (event.target === shareSettingsPanel) shareSettingsPanel.classList.add("hidden");
  });
}


if (shareSettingsSaveBtn) {
  shareSettingsSaveBtn.addEventListener("click", async () => {
    if (shareSettingsStatusEl) {
      shareSettingsStatusEl.style.color = "";
      shareSettingsStatusEl.textContent = "保存中...";
    }
    try {
      // 提示词/skills：如果"强推"文本框留空，自动用当前主表单里的值来共享。
      const formPrompt = (document.querySelector("#custom-prompt")?.value || "").trim();
      const formSkills = (document.querySelector("#custom-skills")?.value || "").trim();
      const overridePrompt = (sharedPromptTextarea?.value || "").trim();
      const overrideSkills = (sharedSkillsTextarea?.value || "").trim();
      const sharedPrompt = overridePrompt || formPrompt;
      const sharedSkills = overrideSkills || formSkills;

      const response = await fetch("/api/share-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          share_api: !!shareApiToggleEl?.checked,
          share_prompt: !!sharePromptToggleEl?.checked,
          share_skills: !!shareSkillsToggleEl?.checked,
          shared_prompt: sharedPrompt,
          shared_skills: sharedSkills,
        }),
      });
      const payload = await readResponse(response);
      if (!response.ok) throw new Error(payload.detail || "保存失败");

      // 并行设置存本地 + 同步到主表单
      const parallelEnabled = !!document.querySelector("#settings-parallel-enabled")?.checked;
      const parallelCount = parseInt(document.querySelector("#settings-parallel-count")?.value || "2", 10);
      try {
        localStorage.setItem("parallel_enabled", parallelEnabled ? "1" : "0");
        localStorage.setItem("parallel_count", String(parallelCount));
      } catch (_) {}
      syncParallelToMainForm();

      if (shareSettingsStatusEl) shareSettingsStatusEl.textContent = "已保存。";
    } catch (e) {
      if (shareSettingsStatusEl) {
        shareSettingsStatusEl.textContent = humanFetchError(e);
        shareSettingsStatusEl.style.color = "#b3261e";
      }
    }
  });
}

// 设置面板 ↔ 主表单双向同步（加 _syncing 防循环）
let _parallelSyncing = false;
function syncParallelToMainForm() {
  if (_parallelSyncing) return;
  _parallelSyncing = true;
  const enabled = document.querySelector("#settings-parallel-enabled")?.checked !== false;
  const count = parseInt(document.querySelector("#settings-parallel-count")?.value || "2", 10);
  const mainInput = document.querySelector("#parallel-count");
  if (mainInput) mainInput.value = String(enabled ? Math.max(1, count) : 1);
  _parallelSyncing = false;
}
function syncParallelToSettings() {
  if (_parallelSyncing) return;
  _parallelSyncing = true;
  const val = parseInt(document.querySelector("#parallel-count")?.value || "2", 10);
  const settingsInput = document.querySelector("#settings-parallel-count");
  if (settingsInput) settingsInput.value = String(Math.max(1, val));
  try { localStorage.setItem("parallel_count", String(Math.max(1, val))); } catch (_) {}
  _parallelSyncing = false;
}

// 设置面板首次打开时，把存的偏好读回来；如果没存过，默认开 + 2
(function initParallelFromLocal() {
  try {
    const sw = document.querySelector("#settings-parallel-enabled");
    const cnt = document.querySelector("#settings-parallel-count");
    if (sw) sw.checked = localStorage.getItem("parallel_enabled") !== "0";
    if (cnt) cnt.value = localStorage.getItem("parallel_count") || "2";
  } catch (_) {}
  // 设置面板 → 主表单
  document.querySelector("#settings-parallel-enabled")?.addEventListener("change", () => {
    try { localStorage.setItem("parallel_enabled", document.querySelector("#settings-parallel-enabled").checked ? "1" : "0"); } catch (_) {}
    syncParallelToMainForm();
  });
  document.querySelector("#settings-parallel-count")?.addEventListener("input", () => {
    try { localStorage.setItem("parallel_count", document.querySelector("#settings-parallel-count").value); } catch (_) {}
    syncParallelToMainForm();
  });
  // 主表单 → 设置面板
  document.querySelector("#parallel-count")?.addEventListener("input", () => {
    syncParallelToSettings();
  });
  syncParallelToMainForm();
})();

// 非 host 进页面时拉 host 共享的默认值，预填到表单（只填空字段，避免冲掉自己的修改）
async function loadSharedDefaults() {
  try {
    const response = await fetch("/api/shared-defaults");
    if (!response.ok) return;
    const bundle = await response.json();
    if (bundle.is_host) return;
    const fields = bundle.shared_fields || [];
    let appliedSomething = false;
    if (fields.includes("custom_prompt")) {
      const el = document.querySelector("#custom-prompt");
      if (el && bundle.custom_prompt) { el.value = bundle.custom_prompt; appliedSomething = true; }
    }
    if (fields.includes("custom_skills")) {
      const el = document.querySelector("#custom-skills");
      if (el && bundle.custom_skills) { el.value = bundle.custom_skills; appliedSomething = true; }
    }
    // 把 host 的自定义预设 merge 进本地下拉。带 (host 共享) 后缀，避免和本地同名混淆。
    if (Array.isArray(bundle.shared_prompt_presets) && bundle.shared_prompt_presets.length && typeof promptPresets !== "undefined") {
      const existingNames = new Set(promptPresets.map((x) => x.name));
      bundle.shared_prompt_presets.forEach((p) => {
        const label = `${p.name}（host 共享）`;
        if (existingNames.has(label)) return;
        promptPresets.push({ name: label, prompt: p.prompt || "", builtin: false, fromHost: true });
        existingNames.add(label);
      });
      if (typeof renderPromptPresets === "function") renderPromptPresets();
      appliedSomething = true;
    }
    if (Array.isArray(bundle.shared_skills_presets) && bundle.shared_skills_presets.length && typeof skillsPresets !== "undefined") {
      const existingNames = new Set(skillsPresets.map((x) => x.name));
      bundle.shared_skills_presets.forEach((p) => {
        const label = `${p.name}（host 共享）`;
        if (existingNames.has(label)) return;
        skillsPresets.push({ name: label, skills: p.skills || "", builtin: false, fromHost: true });
        existingNames.add(label);
      });
      if (typeof renderSkillsPresets === "function") renderSkillsPresets();
      appliedSomething = true;
    }
    if (appliedSomething) showSharedFromHostBadge();
    if (fields.includes("api_config") && bundle.api_config) {
      const keyEl = document.querySelector("#api-key");
      if (keyEl && !keyEl.value.trim()) {
        const formatEl = document.querySelector("#api-format");
        const baseEl = document.querySelector("#api-base-url");
        const modelEl = document.querySelector("#api-model");
        if (formatEl) formatEl.value = bundle.api_config.format || formatEl.value;
        if (baseEl) baseEl.value = bundle.api_config.base_url || baseEl.value;
        keyEl.value = bundle.api_config.api_key || "";
        if (modelEl) {
          const m = bundle.api_config.model || "";
          if (m && ![...modelEl.options].some((o) => o.value === m)) {
            modelEl.append(new Option(m, m));
          }
          if (m) modelEl.value = m;
        }
        if (typeof updateApiSummary === "function") updateApiSummary();
      }
    }
  } catch (e) {
    console.warn("shared-defaults load failed", e);
  }
}

function showSharedFromHostBadge() {
  if (document.querySelector("#shared-from-host-badge")) return;
  const target = document.querySelector("#auto-fill-panel") || document.querySelector("#fill-form");
  if (!target) return;
  const badge = document.createElement("div");
  badge.id = "shared-from-host-badge";
  badge.textContent = "✓ 提示词 / Skills 已从 host 自动加载";
  badge.style.cssText = "padding:8px 12px; margin:8px 0; border-radius:6px; background:rgba(15,143,105,0.10); color:#0c8f68; font-size:13px; font-weight:700;";
  target.prepend(badge);
}

refreshShareSettingsUI();
loadSharedDefaults();
window.addEventListener("auth-changed", () => {
  refreshShareSettingsUI();
  loadSharedDefaults();
});

// host 模式下，主表单的 提示词 / Skills 改完自动推送到 share-settings，
// 这样其他人下次刷新就能看到最新内容，无需 host 手动到"设置"里点保存。
let _isHostCached = false;
let _shareAutoSyncTimer = null;

async function shareAutoSyncFromForm() {
  if (!_isHostCached) return;
  try {
    const sharePromptEl = document.querySelector("#share-prompt-toggle");
    const shareSkillsEl = document.querySelector("#share-skills-toggle");
    const shareApiEl = document.querySelector("#share-api-toggle");
    const formPrompt = (document.querySelector("#custom-prompt")?.value || "").trim();
    const formSkills = (document.querySelector("#custom-skills")?.value || "").trim();
    const overridePrompt = (sharedPromptTextarea?.value || "").trim();
    const overrideSkills = (sharedSkillsTextarea?.value || "").trim();
    // 整组自定义预设（非内置）也一起共享出去
    const sharedPromptPresets = (typeof promptPresets !== "undefined" && Array.isArray(promptPresets))
      ? promptPresets.filter((x) => !x.builtin).map((x) => ({ name: x.name, prompt: x.prompt }))
      : [];
    const sharedSkillsPresets = (typeof skillsPresets !== "undefined" && Array.isArray(skillsPresets))
      ? skillsPresets.filter((x) => !x.builtin).map((x) => ({ name: x.name, skills: x.skills }))
      : [];
    await fetch("/api/share-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        share_api: shareApiEl ? !!shareApiEl.checked : true,
        share_prompt: sharePromptEl ? !!sharePromptEl.checked : true,
        share_skills: shareSkillsEl ? !!shareSkillsEl.checked : true,
        shared_prompt: overridePrompt || formPrompt,
        shared_skills: overrideSkills || formSkills,
        shared_prompt_presets: sharedPromptPresets,
        shared_skills_presets: sharedSkillsPresets,
      }),
    });
    refreshShareSettingsUI();
  } catch (e) {
    console.warn("share auto-sync failed", e);
  }
}

function scheduleShareAutoSync() {
  if (_shareAutoSyncTimer) clearTimeout(_shareAutoSyncTimer);
  _shareAutoSyncTimer = setTimeout(() => { shareAutoSyncFromForm(); }, 700);
}

// 拿到 is_host 之后，给主表单的提示词/skills textarea 挂监听
(async function setupShareAutoSync() {
  try {
    const r = await fetch("/api/share-settings");
    if (!r.ok) return;
    const data = await r.json();
    _isHostCached = !!data.is_host;
    if (!_isHostCached) return;
    document.querySelector("#custom-prompt")?.addEventListener("input", scheduleShareAutoSync);
    document.querySelector("#custom-skills")?.addEventListener("input", scheduleShareAutoSync);
    // 选了预设 / 切换 prompt skills 模式之类也会改 textarea 的 value，监听 change 兜底
    document.querySelector("#custom-prompt")?.addEventListener("change", scheduleShareAutoSync);
    document.querySelector("#custom-skills")?.addEventListener("change", scheduleShareAutoSync);
    // 顺手保证最初一次也推一下（用户第一次进来选了默认预设，也立刻同步）
    setTimeout(scheduleShareAutoSync, 1500);
  } catch (_) { /* ignore */ }
})();

// ============== 历史记录批量删除 ==============
const historyBatchToolbar = document.querySelector("#history-batch-toolbar");
const historyBatchCount = document.querySelector("#history-batch-count");
const historyBatchAll = document.querySelector("#history-batch-all");
const historyBatchClear = document.querySelector("#history-batch-clear");
const historyBatchDelete = document.querySelector("#history-batch-delete");
const historyBatchCancel = document.querySelector("#history-batch-cancel");
const historySelectToggle = document.querySelector("#history-select-toggle");

let historySelectMode = false;
const historySelectedIds = new Set();

function setHistorySelectMode(on) {
  historySelectMode = !!on;
  if (historyBatchToolbar) historyBatchToolbar.classList.toggle("hidden", !historySelectMode);
  if (historySelectToggle) historySelectToggle.textContent = historySelectMode ? "退出选择" : "选择";
  if (!historySelectMode) historySelectedIds.clear();
  refreshHistorySelectionVisuals();
}

function toggleHistoryCardSelection(card, id) {
  if (!id) return;
  if (historySelectedIds.has(id)) historySelectedIds.delete(id);
  else historySelectedIds.add(id);
  card.classList.toggle("selected", historySelectedIds.has(id));
  const cb = card.querySelector(".history-item-check");
  if (cb) cb.checked = historySelectedIds.has(id);
  updateHistoryBatchCount();
}

function handleHistoryCardClickInSelectMode(event) {
  if (!historySelectMode) return;
  // 点到下载链接 / 按钮 / 复选框 / 输入框 上时，不切换选择，让它们做自己该做的事
  if (event.target.closest("a, button, input, label, summary")) return;
  const card = event.currentTarget;
  toggleHistoryCardSelection(card, card.dataset.historyId || "");
}

function refreshHistorySelectionVisuals() {
  const cards = historyList ? historyList.querySelectorAll(".history-item") : [];
  cards.forEach((card) => {
    const id = card.dataset.historyId || "";
    card.classList.toggle("selectable", historySelectMode);
    card.classList.toggle("selected", historySelectMode && historySelectedIds.has(id));

    // 让卡片本体可点：选择模式下，点空白区域也能切换选择
    if (historySelectMode) {
      if (!card._historySelectListener) {
        card.addEventListener("click", handleHistoryCardClickInSelectMode);
        card._historySelectListener = true;
      }
    } else if (card._historySelectListener) {
      card.removeEventListener("click", handleHistoryCardClickInSelectMode);
      card._historySelectListener = false;
    }

    let cb = card.querySelector(".history-item-check");
    if (historySelectMode) {
      if (!cb) {
        cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "history-item-check";
        cb.addEventListener("click", (event) => event.stopPropagation());
        cb.addEventListener("change", (event) => {
          if (event.target.checked) historySelectedIds.add(id);
          else historySelectedIds.delete(id);
          card.classList.toggle("selected", event.target.checked);
          updateHistoryBatchCount();
        });
        card.prepend(cb);
      }
      cb.checked = historySelectedIds.has(id);
    } else if (cb) {
      cb.remove();
    }
  });
  updateHistoryBatchCount();
}

function updateHistoryBatchCount() {
  if (historyBatchCount) historyBatchCount.textContent = `已选 ${historySelectedIds.size} 条`;
  if (historyBatchDelete) historyBatchDelete.disabled = historySelectedIds.size === 0;
}

if (historySelectToggle) {
  historySelectToggle.addEventListener("click", () => setHistorySelectMode(!historySelectMode));
}
if (historyBatchCancel) {
  historyBatchCancel.addEventListener("click", () => setHistorySelectMode(false));
}
if (historyBatchAll) {
  historyBatchAll.addEventListener("click", () => {
    const cards = historyList ? historyList.querySelectorAll(".history-item") : [];
    cards.forEach((card) => {
      const id = card.dataset.historyId || "";
      if (id) historySelectedIds.add(id);
    });
    refreshHistorySelectionVisuals();
  });
}
if (historyBatchClear) {
  historyBatchClear.addEventListener("click", () => {
    historySelectedIds.clear();
    refreshHistorySelectionVisuals();
  });
}
if (historyBatchDelete) {
  historyBatchDelete.addEventListener("click", async () => {
    if (historySelectedIds.size === 0) return;
    const ids = Array.from(historySelectedIds);
    const recoveredCount = ids.filter((id) => id.startsWith("discovered-")).length;
    const regularCount = ids.length - recoveredCount;
    let message = `确定要批量删除选中的 ${ids.length} 条记录吗？\n  · 普通历史：${regularCount} 条（只从列表删除，不动文件）`;
    if (recoveredCount > 0) {
      message += `\n  · 找回项：${recoveredCount} 条（会**永久删除磁盘上的文件夹**，不可恢复）`;
    }
    if (!window.confirm(message)) return;
    if (recoveredCount > 0 && !window.confirm(`再确认一次：${recoveredCount} 条找回项会从磁盘上彻底删除。继续？`)) {
      return;
    }
    historyBatchDelete.disabled = true;
    historyBatchDelete.textContent = "删除中...";
    console.log("[batch delete] sending ids:", ids);
    try {
      const response = await fetch("/api/history/delete-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const payload = await readResponse(response);
      console.log("[batch delete] server response:", payload);
      if (!response.ok) throw new Error(payload.detail || "批量删除失败");
      const deleted = Number(payload.deleted || 0);
      const total = Number(payload.total || ids.length);
      const failed = total - deleted;
      // 失败的项目摘出来给用户看
      const failedItems = Array.isArray(payload.results)
        ? payload.results.filter((r) => !r.ok)
        : [];
      setHistorySelectMode(false);
      loadGenerationHistory();
      if (historyStatus) {
        if (failed === 0) {
          historyStatus.className = "";
          historyStatus.textContent = `批量删除完成：${deleted}/${total} 条全部删除成功。`;
        } else {
          historyStatus.className = "error-text";
          const reasons = [...new Set(failedItems.map((r) => r.reason || "unknown"))].slice(0, 3).join(" / ");
          historyStatus.textContent = `批量删除部分失败：成功 ${deleted}/${total}，${failed} 条没删掉（原因：${reasons || "未知"}）。详见浏览器 Console。`;
          console.warn("[batch delete] failed items:", failedItems);
        }
      }
    } catch (error) {
      if (historyStatus) {
        historyStatus.className = "error-text";
        historyStatus.textContent = humanFetchError(error);
      }
    } finally {
      historyBatchDelete.disabled = false;
      historyBatchDelete.textContent = "删除选中";
    }
  });
}

// 历史卡片重新渲染后，如果还在选择模式，重建复选框
const _origRenderGenHistory = typeof renderGenerationHistory === "function" ? renderGenerationHistory : null;
if (_origRenderGenHistory) {
  const observer = new MutationObserver(() => {
    if (historySelectMode) refreshHistorySelectionVisuals();
  });
  if (historyList) observer.observe(historyList, { childList: true });
}
