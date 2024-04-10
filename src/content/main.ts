chrome.runtime.onMessage.addListener(
  (message, _, sendResponse: (response: (string | null)[]) => void) => {
    if (message.type === "GET_IMAGE_URLS") {
      const elements = document.querySelectorAll("img");
      // 相対パスでも取得できるように
      const urls = [...elements].map((element) => element.currentSrc);
      sendResponse(urls);

      return;
    }
  },
);
