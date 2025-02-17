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
        input[i].value = currentTime.toLocaleTimeString().slice(0, 5);

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
      case "submit" || "reset" || "file" || "button" || "hidden":
        break;
      default:
        input[i].value = getRandomText(10);
    }
  }

  function getRandomText(length) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "hello") {
    fillInputFields();
    sendResponse({ farewell: "goodbye" });
  }
});
