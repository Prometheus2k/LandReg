import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LandingPage from "scenes/landingpage/index.jsx";
import UserDashboard from "scenes/userdashboard/index.jsx";
import ContractDashboard from "scenes/contractowner";
import LandInspectorDashboard from "scenes/landinspector";
import RegisterPage from "scenes/registration/user";
import LIRegisterPage from "scenes/registration/land_inspector";
import LoginPage from "scenes/loginpage/index";
import { useEffect } from "react";
import ConnectWallet from "web3";
import { LandState } from "context/landProvider";

function App() {
  const theme = createTheme(themeSettings());
  const { setProvider, setSigner, setContract } = LandState();
  useEffect(() => {
    async function loadweb3data() {
      const { provider, signer, contract } = await ConnectWallet();
      // console.log(provider, signer, contract);
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
    }
    loadweb3data();
    // window.onload = function () {
    //   var reloading = sessionStorage.getItem("reloading");
    //   console.log("reloading", reloading);
    //   if (reloading) {
    //     loadweb3data();
    //     sessionStorage.removeItem("reloading");
    //   }
    // };
  }, [setContract, setProvider, setSigner]);

  return (
    <div className="App">
      {/* {console.log(provider, signer, contract)} */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/user" element={<UserDashboard />} />
          <Route exact path="/contract_owner" element={<ContractDashboard />} />
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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
