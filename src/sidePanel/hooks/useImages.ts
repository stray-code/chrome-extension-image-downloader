import { useEffect, useState } from "react";

import type { Image } from "../types";

export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);

  const loadImage = async (url: string | null) => {
    if (!url) {
      return;
    }

    const blob = await fetch(url).then((res) => res.blob());

    const image = new Image();

    image.addEventListener("load", () => {
      setImages((prev) => {
        const fileName =
          new URL(url).pathname.split("/").at(-1)?.split(".")[0] ?? "";

        return [
          ...prev,
          {
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
            url,
            fileName,
            extension: blob.type.split("/")[1],
          },
        ];
      });
    });

    image.src = url;
    image.crossOrigin = "anonymous";
  };

  const getImageUrls = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) {
      return;
    }

    chrome.tabs.sendMessage(
      tab.id,
      { type: "GET_IMAGE_URLS" },
      (response: (string | null)[]) => response.forEach(loadImage),
    );
  };

  const reset = () => {
    setImages([]);

    getImageUrls();
  };

  useEffect(() => {
    getImageUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    images,
    reset,
  };
};
