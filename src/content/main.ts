chrome.runtime.onMessage.addListener(
  (message, _, sendResponse: (response: (string | null)[]) => void) => {
    if (message.type === "GET_IMAGE_URLS") {
      const elements = document.querySelectorAll("img");
      const urls = [...elements].map((element) => element.getAttribute("src"));
      sendResponse(urls);

      return;
    }
  },
);
