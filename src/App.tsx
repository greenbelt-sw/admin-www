import { Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import theme from "./theme/index";
import "./theme/styles.css";

export const App = () => {
  const [hashtag, setHashtag] = useState(window.location.hash);
  const darkNav = window.location.hash === "#contact";
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash !== "#about-us") window.scrollTo(0, 0);
      const hash = window.location.hash.split("?")[0];
      setHashtag(hash);
    };
    window.onhashchange = handleHashChange;
    return () => {
      window.onhashchange = null;
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Box maxW={"100vw"} overflow={"hidden"}>
        <Header dark={darkNav} />
        <Login />
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
