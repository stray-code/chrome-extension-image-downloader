import type { Image } from "../types";

export const useDownloadImage = () => {
  const downloadImage = async (image: Image) => {
    await chrome.downloads.download({
      url: image.url,
    });
  };

  const downloadImages = async (images: Image[]) => {
    const result = confirm(
      [
        `${images.length}枚の画像をダウンロードします。`,
        "本当によろしいですか？",
      ].join("\n"),
    );

    if (!result) {
      return;
    }

    const time = Date.now();

    for (const image of images) {
      await chrome.downloads.download({
        url: image.url,
        filename: `${time}/${image.fileName}.${image.extension}`,
      });
    }
  };

  return {
    downloadImage,
    downloadImages,
  };
};
