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
const batchProgressPanel = document.querySelector("#batch-progress");
const batchProgressTitle = document.querySelector("#batch-progress-title");
const batchProgressCount = document.querySelector("#batch-progress-count");
const batchProgressFill = document.querySelector("#batch-progress-fill");
const batchProgressDetail = document.querySelector("#batch-progress-detail");
const cancelBatchButton = document.querySelector("#cancel-batch");
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
const promptPresetStatus = document.querySelector("#prompt-preset-status");
const skillsPresetSelect = document.querySelector("#skills-preset-select");
const newSkillsPresetButton = document.querySelector("#new-skills-preset");
const saveSkillsPresetButton = document.querySelector("#save-skills-preset");
const deleteSkillsPresetButton = document.querySelector("#delete-skills-preset");
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
const criticalClickBindings = new WeakSet();
let promptPresets = loadPromptPresets();
let skillsPresets = loadSkillsPresets();

bindTopActionButtons();
loadSavedConfig();
renderPromptPresets();
renderSkillsPresets();
setCustomMode("prompt", { silent: true });
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
skillsPresetSelect.addEventListener("change", () => applySkillsPreset(skillsPresetSelect.value));
newSkillsPresetButton.addEventListener("click", () => createSkillsPreset());
saveSkillsPresetButton.addEventListener("click", () => saveSkillsPreset());
deleteSkillsPresetButton.addEventListener("click", () => deleteSkillsPreset());
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
    results.textContent = "请先在 API 设置里点击“新建配置”，选中新建的 API 配置后再保存。";
    return;
  }
  results.className = "results empty";
  results.textContent = "正在读取文档和任务内容，并生成写入内容...";
  downloadSlot.replaceChildren();
  previewPanel.classList.add("hidden");
  previewList.replaceChildren();
  previewConfirmed.checked = false;
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
}

function saveSkillsPresets() {
  const customPresets = skillsPresets.filter((preset) => !preset.builtin);
  window.localStorage.setItem("skillsPresets", JSON.stringify(customPresets));
}

function renderPromptPresets(selectedName = promptPresetSelect.value || promptPresets[0]?.name || "") {
  promptPresetSelect.replaceChildren(
    ...promptPresets.map((preset) => {
      const option = document.createElement("option");
      option.value = preset.name;
      option.textContent = preset.builtin ? `${preset.name}（系统）` : preset.name;
      return option;
    })
  );
  promptPresetSelect.value = promptPresets.some((preset) => preset.name === selectedName) ? selectedName : promptPresets[0]?.name || "";
  updatePromptPresetButtons();
}

function applyPromptPreset(name) {
  const preset = promptPresets.find((item) => item.name === name);
  if (!preset) return;
  customPromptInput.value = preset.prompt || "";
  promptPresetStatus.className = preset.builtin ? "" : "ok-text";
  promptPresetStatus.textContent = `已选择：${preset.name}`;
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
  savePromptPresets();
  renderPromptPresets();
  promptPresetStatus.className = "ok-text";
  promptPresetStatus.textContent = `已删除：${name}`;
}

function updatePromptPresetButtons() {
  const preset = promptPresets.find((item) => item.name === promptPresetSelect.value);
  const locked = !preset || preset.builtin;
  savePromptPresetButton.disabled = locked;
  deletePromptPresetButton.disabled = locked;
}

function renderSkillsPresets(selectedName = skillsPresetSelect.value || skillsPresets[0]?.name || "") {
  skillsPresetSelect.replaceChildren(
    ...skillsPresets.map((preset) => {
      const option = document.createElement("option");
      option.value = preset.name;
      option.textContent = preset.builtin ? `${preset.name}（系统）` : preset.name;
      return option;
    })
  );
  skillsPresetSelect.value = skillsPresets.some((preset) => preset.name === selectedName) ? selectedName : skillsPresets[0]?.name || "";
  updateSkillsPresetButtons();
}

function applySkillsPreset(name) {
  const preset = skillsPresets.find((item) => item.name === name);
  if (!preset) return;
  customSkillsInput.value = preset.skills || "";
  skillsPresetStatus.className = preset.builtin ? "" : "ok-text";
  skillsPresetStatus.textContent = `已选择：${preset.name}`;
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
  saveSkillsPresets();
  renderSkillsPresets();
  skillsPresetStatus.className = "ok-text";
  skillsPresetStatus.textContent = `已删除：${name}`;
}

function updateSkillsPresetButtons() {
  const preset = skillsPresets.find((item) => item.name === skillsPresetSelect.value);
  const locked = !preset || preset.builtin;
  saveSkillsPresetButton.disabled = locked;
  deleteSkillsPresetButton.disabled = locked;
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
  newPromptPresetButton.disabled = useSkills;
  savePromptPresetButton.disabled = useSkills || promptPresets.find((item) => item.name === promptPresetSelect.value)?.builtin;
  deletePromptPresetButton.disabled = savePromptPresetButton.disabled;
  customSkillsInput.disabled = !useSkills;
  skillsPresetSelect.disabled = !useSkills;
  newSkillsPresetButton.disabled = !useSkills;
  saveSkillsPresetButton.disabled = !useSkills || skillsPresets.find((item) => item.name === skillsPresetSelect.value)?.builtin;
  deleteSkillsPresetButton.disabled = saveSkillsPresetButton.disabled;
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
    window.syncApiPresetStateAfterLoad?.(config);
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
  renderDownload(payload.download_url, payload.folder_path, payload.folder_files, payload.folder_zip_url);
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

previewConfirmed.addEventListener("change", () => {
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
    scheduleBatchPoll(job.id, 700);
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
    if (job.partial_result) {
      lastPayload = job.partial_result;
      renderResults(job.partial_result);
      copyButton.disabled = false;
      failBatchProgress(job.message || job.error || "批量生成失败，已导出已完成部分。", job.partial_result);
      return;
    }
    throw new Error(job.message || job.error || "批量生成失败");
  }
  if (job.status === "canceled") {
    currentBatchJobId = "";
    setCancelBatchButton(false, false);
    updateBatchProgress(0, "批量生成已取消", batchProgressCount.textContent || "0/0", job.message || "批量生成已取消。");
    statusPill.textContent = "已取消";
    results.className = "results empty";
    results.textContent = "批量生成已取消，可以修改内容后重新生成。";
    return;
  }
  setCancelBatchButton(true, true);
  scheduleBatchPoll(jobId);
}

function scheduleBatchPoll(jobId, delay = 1200) {
  window.clearTimeout(batchProgressTimer);
  batchProgressTimer = window.setTimeout(() => {
    pollBatchJob(jobId).catch((error) => handleBatchPollError(jobId, error));
  }, delay);
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
    scheduleBatchPoll(jobId, Math.min(1600 + batchPollFailures * 500, 5000));
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
  const total = Math.max(Number(job.total) || 0, 1);
  const completed = Math.min(Number(job.completed) || 0, total);
  const percent = Math.round((completed / total) * 100);
  const title = job.status === "complete" ? "批量生成完成" : "批量生成中";
  updateBatchProgress(percent, title, `${completed}/${total}`, job.message || "正在生成...");
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

function renderDownload(downloadUrl, folderPath = "", folderFiles = [], folderZipUrl = "") {
  downloadSlot.replaceChildren();
  if (folderPath) {
    const message = document.createElement("div");
    message.className = "download-link folder-output";
    message.textContent = `文件夹已生成：${folderPath}`;
    downloadSlot.append(message);
    const effectiveFolderZipUrl = folderZipUrl || folderZipUrlFromPath(folderPath);
    if (effectiveFolderZipUrl) {
      const zipLink = document.createElement("a");
      zipLink.className = "download-link batch-download disabled-link";
      zipLink.href = effectiveFolderZipUrl;
      zipLink.textContent = "批量下载全部 ZIP";
      zipLink.addEventListener("click", (event) => {
        if (!previewConfirmed.checked) {
          event.preventDefault();
          alert("请先勾选“我已检查，内容没有问题”再下载。");
        }
      });
      downloadSlot.append(zipLink);
    }
    if (Array.isArray(folderFiles) && folderFiles.length) {
      const list = document.createElement("div");
      list.className = "folder-file-list";
      folderFiles.forEach((file) => {
        if (!file?.download_url || !file?.name) return;
        const link = document.createElement("a");
        link.className = "download-link disabled-link";
        link.href = file.download_url;
        link.textContent = `下载 ${file.name}`;
        link.addEventListener("click", (event) => {
          if (!previewConfirmed.checked) {
            event.preventDefault();
            alert("请先勾选“我已检查，内容没有问题”再下载。");
          }
        });
        list.append(link);
      });
      downloadSlot.append(list);
    }
    return;
  }
  if (!downloadUrl) return;
  const link = document.createElement("a");
  link.className = "download-link disabled-link";
  link.href = downloadUrl;
  const suffix = downloadUrl.toLowerCase().split("?")[0].split(".").pop();
  if (suffix === "zip") {
    link.textContent = "下载批量训练日志 ZIP";
  } else {
    link.textContent = suffix === "pdf" ? "下载已填写 PDF" : "下载已填写 DOCX";
  }
  link.setAttribute("aria-disabled", "true");
  link.addEventListener("click", (event) => {
    if (!previewConfirmed.checked) {
      event.preventDefault();
      previewPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  downloadSlot.append(link);
}

function folderZipUrlFromPath(folderPath) {
  const folderName = String(folderPath || "").split(/[\\/]/).filter(Boolean).pop();
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
  row.replaceChildren(
    statPill("耗时", duration ? `${duration.toFixed(duration >= 10 ? 1 : 2)} 秒` : "0 秒"),
    statPill("Token", total ? `${total}（入 ${input} / 出 ${output}）` : "未统计"),
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
