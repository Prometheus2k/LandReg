import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LandingPage from "scenes/landingpage/index.jsx";
import UserDashboard from "scenes/userdashboard/index.jsx";
import ContractDashboard from "scenes/contractowner";
import LandInspectorDashboard from "scenes/landinspector";
import RegisterPage from "scenes/registration/user";
import LIRegisterPage from "scenes/registration/land_inspector";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/user" element={<UserDashboard />} />
            <Route
              exact
              path="/contract_owner"
              element={<ContractDashboard />}
            />
            <Route
              exact
              path="/land_inspector"
              element={<LandInspectorDashboard />}
            />
            <Route exact path="/user/registration" element={<RegisterPage />} />
            <Route
              exact
              path="/land_inspector/registration"
              element={<LIRegisterPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
