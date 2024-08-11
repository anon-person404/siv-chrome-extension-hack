document.getElementById("reset").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        localStorage.removeItem("hackState_LOCAL_KEY");
        localStorage.removeItem("voter-1723075118561-link");
        window.location.href = "https://siv.org/election/1723075118561/vote?auth=link";
      }
    });
  });
});
