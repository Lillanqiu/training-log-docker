const toggleApiKeyButton = document.querySelector("#toggle-api-key");
const apiKeyInput = document.querySelector("#api-key");

toggleApiKeyButton.addEventListener("click", () => {
  const shouldShow = apiKeyInput.type === "password";
  apiKeyInput.type = shouldShow ? "text" : "password";
  toggleApiKeyButton.textContent = shouldShow ? "隐藏" : "显示";
});
