import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CookiesProvider } from "react-cookie";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
);
