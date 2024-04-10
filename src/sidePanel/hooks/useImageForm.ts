import { useMemo } from "react";
import { useForm } from "@mantine/form";

import type { Image, ImageForm } from "../types";

export const useImageForm = (images: Image[]) => {
  const form = useForm<ImageForm>({
    initialValues: {
      orderType: "descending",
      displayType: "all",
    },
  });

  const sortedImages = useMemo(() => {
    if (form.values.orderType === "descending") {
      return [...images].sort(
        (a, b) =>
          b.naturalWidth + b.naturalHeight - (a.naturalWidth + a.naturalHeight),
      );
    }

    if (form.values.orderType === "ascending") {
      return [...images].sort(
        (a, b) =>
          a.naturalWidth + a.naturalHeight - (b.naturalWidth + b.naturalHeight),
      );
    }

    return images;
  }, [form.values.orderType, images]);

  const extractedImages = useMemo(() => {
    if (form.values.displayType === "large") {
      return [...sortedImages].filter((image) => {
        return image.naturalWidth + image.naturalHeight >= 1000;
      });
    }

    if (form.values.displayType === "medium") {
      return [...sortedImages].filter((image) => {
        return (
          image.naturalWidth + image.naturalHeight < 1000 &&
          image.naturalWidth + image.naturalHeight >= 300
        );
      });
    }

    if (form.values.displayType === "small") {
      return [...sortedImages].filter((image) => {
        return image.naturalWidth + image.naturalHeight < 300;
      });
    }

    return sortedImages;
  }, [form.values.displayType, sortedImages]);

  return {
    form,
    displayImages: extractedImages,
  };
};
