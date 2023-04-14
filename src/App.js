import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LandingPage from "scenes/landingpage/index.jsx";
import UserDashboard from "scenes/userdashboard/index.jsx";
import ContractDashboard from "scenes/contractowner/index.jsx";
import LandInspectorDashboard from "scenes/landinspector/index.jsx";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/contract_owner" element={<ContractDashboard />} />
            <Route
              path="/land_inspector"
              element={<LandInspectorDashboard />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
