(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  document.getElementById("buttonx").addEventListener("click", async () => {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        greeting: "hello",
      });
    } catch (error) {}
  });
})();
