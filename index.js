(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const savedInputs = await chrome.storage.local
    .get("savedInputs")
    .then((inputs) => {
      return JSON.parse(inputs);
    })
    .catch((err) => {
      return null;
    });
  console.log("savedInputs", savedInputs);
  if (!savedInputs && savedInputs != {}) {
    document.getElementById("loadSavedFields").disabled = true;
  }
  document.getElementById("generate").addEventListener("click", async () => {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        greeting: "fill-fields",
      });
    } catch (error) {}
  });
  document.getElementById("save").addEventListener("click", async () => {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        greeting: "save",
      });
      document.getElementById("loadSavedFields").disabled = false;
    } catch (error) {}
  });
  document
    .getElementById("loadSavedFields")
    .addEventListener("click", async () => {
      const savedInputs = await chrome.storage.local.get("savedInputs");
      try {
        const response = await chrome.tabs.sendMessage(tab.id, {
          greeting: "loadSavedFields",
        });
      } catch (error) {}
    });
})();
