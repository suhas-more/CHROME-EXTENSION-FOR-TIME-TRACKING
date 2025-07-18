let activeTabId = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
  if (activeTabId !== null) {
    trackTime(activeTabId);
  }
  activeTabId = activeInfo.tabId;
  startTime = Date.now();
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (tabId === activeTabId) {
    trackTime(tabId);
    activeTabId = null;
  }
});

function trackTime(tabId) {
  chrome.tabs.get(tabId, tab => {
    const url = new URL(tab.url);
    const domain = url.hostname;
    const duration = (Date.now() - startTime) / 1000;
    saveTime(domain, duration);
  });
}

function saveTime(domain, duration) {
  fetch("http://localhost:3001/track", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, duration })
  });
}
