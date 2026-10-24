// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import AuthContextProvider from './context/AuthContext'

// createRoot(document.getElementById('root')).render(
//   <AuthContextProvider>
//     <App />
//   </AuthContextProvider>,
// )



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);
