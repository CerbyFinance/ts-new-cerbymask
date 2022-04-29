chrome.windows.onCreated.addListener(() => {
  console.log("CerbyMask detected a new browser opening");
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("CerbyMask detected a new installation");
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.title === "debug-log") {
    console.log("[DEBUG]", request.data);
  }
});
