import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Poppins, ${base.fonts.body}`,
    body: `Poppins, ${base.fonts.body}`,
  },
});

export default theme;
