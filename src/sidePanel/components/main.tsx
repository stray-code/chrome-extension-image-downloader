import ReactDOM from "react-dom/client";
import SidePanel from "./SidePanel.tsx";
import "@mantine/core/styles.css";
import { ActionIcon, MantineProvider, createTheme } from "@mantine/core";

import "./style.css";

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "light",
        color: "gray",
        c: "dark",
        size: "lg",
        radius: "xl",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <SidePanel />
  </MantineProvider>,
);
