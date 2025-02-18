(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const savedInputs = await chrome.storage.local
    .get("savedInputs")
    .then((inputs) => {
      console.log("inputs", inputs.savedInputs);
      return inputs.savedInputs;
    })
    .catch((err) => {
      return null;
    });
  console.log("savedInputs", savedInputs);
  if (savedInputs == null || savedInputs == {}) {
    document.getElementById("loadSavedFields").disabled = true;
  } else {
    document.getElementById("loadSavedFields").disabled = false;
  }
  document.getElementById("generate").addEventListener("click", async () => {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        greeting: "fill-fields",
      });
    } catch (error) {}
  });
  document.getElementById("delete").addEventListener("click", async () => {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        greeting: "delete",
      });
      document.getElementById("loadSavedFields").disabled = true;
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
