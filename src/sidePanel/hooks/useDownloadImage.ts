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

    images.forEach(downloadImage);
  };

  return {
    downloadImage,
    downloadImages,
  };
};
