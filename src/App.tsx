import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import theme from "./theme/index";
import "./theme/styles.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Returns from "./components/Returns/Returns";
import Users from "./components/Users/Users";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";
import PageNotFound from "./components/PageNotFound/PageNotFound";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
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
            path="/"
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
