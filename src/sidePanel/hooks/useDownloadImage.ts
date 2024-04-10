import type { Image } from "../types";

export const useDownloadImage = () => {
  const downloadImage = (image: Image) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `${image.fileName}.${image.extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImages = (images: Image[]) => {
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
