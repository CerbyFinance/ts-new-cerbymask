chrome.windows.onCreated.addListener(function () {
  console.log("CerbyMask detected a new browser opening");
});

chrome.runtime.onInstalled.addListener(function () {
  console.log("CerbyMask detected a new installation");
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.title == "debug-log") {
    console.log("[DEBUG]", request.data);
  }
  return true;
});
