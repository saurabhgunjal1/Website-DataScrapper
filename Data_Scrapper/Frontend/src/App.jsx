import { useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import { Landingpage } from "./pages/Landing";
import { CompanyProvider } from "./CompanyContext";
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <CompanyProvider>
        <Landingpage />
      </CompanyProvider>
    </StyledEngineProvider>
  );
}

export default App;
