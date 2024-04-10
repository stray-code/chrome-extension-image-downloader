import {
  Image,
  Stack,
  Text,
  Paper,
  Flex,
  ActionIcon,
  Button,
  Select,
} from "@mantine/core";
import {
  IconDownload,
  IconExternalLink,
  IconReload,
} from "@tabler/icons-react";

import { useImages, useImageForm, useDownloadImage } from "../hooks";
import { orderList, displayList } from "../constants";

function SidePanel() {
  const { images, reset } = useImages();
  const { form, displayImages } = useImageForm(images);
  const { downloadImage, downloadImages } = useDownloadImage();

  return (
    <Stack p="md" gap="md">
      <Flex justify="space-between" align="center">
        <Text>
          {displayImages.length}/{images.length}（表示数/合計）
        </Text>
        <ActionIcon onClick={() => reset()}>
          <IconReload size={20} />
        </ActionIcon>
      </Flex>
      <Flex gap="md">
        <Select
          label="サイズ"
          data={displayList}
          {...form.getInputProps("displayType")}
        />
        <Select
          label="順番"
          data={orderList}
          {...form.getInputProps("orderType")}
        />
      </Flex>
      <Button
        variant="gradient"
        gradient={{ from: "orange", to: "yellow", deg: 45 }}
        onClick={() => downloadImages(displayImages)}
      >
        表示の画像を一括ダウンロード
      </Button>
      <Stack gap="md">
        {displayImages.map((image, index) => (
          <Stack key={index} gap="xs">
            <Paper
              shadow="xs"
              radius="md"
              h={180}
              display="flex"
              styles={{
                root: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <Image
                crossOrigin="anonymous"
                src={image.url}
                mah="100%"
                fit="contain"
              />
            </Paper>
            <Flex justify="space-between">
              <Text size="xs">
                {image.extension.toUpperCase()}
                <br />
                {image.naturalWidth}x{image.naturalHeight}
              </Text>
              <Flex ml="auto" justify="space-between" gap="xs">
                <ActionIcon
                  onClick={async () => {
                    await chrome.tabs.create({ url: image.url });
                  }}
                >
                  <IconExternalLink size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => downloadImage(image)}>
                  <IconDownload size={20} />
                </ActionIcon>
              </Flex>
            </Flex>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default SidePanel;
