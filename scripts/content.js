function fillInputFields() {
  let input = document.getElementsByTagName("input");
  let textarea = document.getElementsByTagName("textarea");
  input = [...input, ...textarea];
  for (let i = 0; i < input.length; i++) {
    const currentTime = new Date();
    switch (input[i].type) {
      case "text":
        input[i].value = getRandomText(10);
        break;
      case "password":
        input[i].value = getRandomText(10);
        break;
      case "email":
        input[i].value = getRandomText(10) + "@example.com";
        break;
      case "number":
        input[i].value = Math.floor(Math.random() * 100);
        break;
      case "date":
        input[i].value = currentTime.toISOString().split("T")[0];
        break;
      case "time":
        input[i].value = currentTime.toISOString().slice(11, 16);

        break;
      case "datetime-local":
        input[i].value = currentTime.toISOString().slice(0, 16);
        break;
      case "month":
        input[i].value = currentTime.toISOString().slice(0, 7);
        break;
      case "week":
        const year = currentTime.getFullYear();
        const week = String(
          Math.ceil(
            (currentTime - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000)
          )
        ).padStart(2, "0");
        input[i].value = `${year}-W${week}`;
        break;
      case "range":
        input[i].value = Math.floor(Math.random() * 100);
        break;
      case "url":
        input[i].value = "https://" + getRandomText(10) + ".com";
        break;
      case "tel":
        input[i].value = getRandomText(10);
        break;
      case "checkbox":
        input[i].checked = true;
        break;
      case "radio":
        input[i].checked = true;
        break;
      case "color":
        input[i].value = "#000000";
        break;
      default:
        break;
    }
  }

  function getRandomText(length) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}

function saveInputFields() {
  let input = document.getElementsByTagName("input");
  let textarea = document.getElementsByTagName("textarea");
  input = [...input, ...textarea];
  const savedInputs = [];

  for (let i = 0; i < input.length; i++) {
    savedInputs.push({
      value: input[i].value,
    });
  }
  console.log(savedInputs);
  chrome.storage.local.set({ savedInputs });
}

async function loadSavedInputs() {
  const savedInputs = await getSavedInputs().then(
    (savedInputs) => savedInputs.savedInputs
  );
  let input = document.getElementsByTagName("input");
  const textarea = document.getElementsByTagName("textarea");

  input = [...input, ...textarea];
  console.log(savedInputs);
  for (let i = 0; i < input.length; i++) {
    input[i].value = savedInputs[i].value;
  }
  console.log(input);
}

async function getSavedInputs() {
  const savedInputs = await chrome.storage.local.get("savedInputs");
  console.log("savedInputs", savedInputs);
  return savedInputs;
}

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "fill-fields") {
    fillInputFields();
    sendResponse({ farewell: "goodbye" });
  }
  if (request.greeting === "save") {
    saveInputFields();
    sendResponse({ farewell: "goodbye" });
  }
  if (request.greeting === "loadSavedFields") {
    loadSavedInputs();
    sendResponse({ farewell: "goodbye" });
  }
});
