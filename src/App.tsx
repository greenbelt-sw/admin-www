import { Box, ChakraProvider, ToastProvider } from "@chakra-ui/react";
import Login from "./components/Login/Login";
import theme from "./theme/index";
import "./theme/styles.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Returns from "./components/Returns/Returns";
import Users from "./components/Users/Users";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ToastProvider />
      <Box maxW={"100vw"} overflow={"hidden"}>
        <Routes>
          <Route
            path="/returns"
            element={
              <Sidebar>
                <Returns />
              </Sidebar>
            }
          />
          <Route
            path="/users"
            element={
              <Sidebar>
                <Users />
              </Sidebar>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Sidebar>
                <Dashboard />
              </Sidebar>
            }
          />
          <Route
            path="/settings"
            element={
              <Sidebar>
                <Settings />
              </Sidebar>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
