import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import ConnectWallet from "web3";
import { LandState } from "context/landProvider";

const NavbarPage = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();

  useEffect(() => {
    const fecthAddress = async () => {
      if (signer) {
        const addr = await signer.getAddress();
        setAddress(addr);
      }
    };
    fecthAddress();
  }, [signer]);

  const loadweb3data = async () => {
    const { provider, signer, contract } = await ConnectWallet();

    // console.log(provider, signer, contract);
    setProvider(provider);
    setSigner(signer);
    setContract(contract);

    // if (provider || signer || contract) {
    //   sessionStorage.setItem("reloading", "true");
    // }

    const addr = await signer.getAddress();
    setAddress(addr);
  };
  const contractOwnerLogin = async () => {
    let contractOwnerAddress = await signer.getAddress();
    let isContractOwnerAuth = await contract.isContractOwner(
      contractOwnerAddress,
    );
    return isContractOwnerAuth;
  };

  const landInspectorLogin = async () => {
    let landInspectorAddress = await signer.getAddress();
    let isLandInspectorAuth = await contract.isLandInspector(
      landInspectorAddress,
    );
    return isLandInspectorAuth;
  };

  const userLogin = async () => {
    let userAddress = await signer.getAddress();
    let isUserAuth = await contract.isUserRegistered(userAddress);
    console.log(isUserAuth);
    return isUserAuth;
  };
  return (
    <Box sx={{ boxShadow: 4 }}>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Land Registry
          </Typography>
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <Typography
              sx={{
                fontSize: "17px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
              onClick={async () => {
                if (await userLogin()) {
                  navigate("/user");
                } else {
                  navigate("/user/registration");
                }
              }}
            >
              User
            </Typography>
            <Typography
              sx={{
                fontSize: "17px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
              onClick={async () => {
                if (await landInspectorLogin()) {
                  navigate("/land_inspector");
                } else {
                  alert("You are not a land inspector");
                }
              }}
            >
              Land Inspector
            </Typography>
            <Typography
              sx={{
                fontSize: "17px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
              onClick={async () => {
                if (await contractOwnerLogin()) {
                  navigate("/contract_owner");
                } else {
                  alert("You are not a contract owner");
                }
              }}
            >
              Contract Owner
            </Typography>
            {provider || signer || contract ? (
              <Button
                sx={{
                  fontSize: "15px",
                  borderRadius: "20px",
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
                // size="large"
                variant="contained"
                color="primary"
                href="#contained-buttons"
                onClick={async () => {
                  loadweb3data();
                }}
              >
                {address.slice(0, 6) + "..." + address.slice(-4)}
              </Button>
            ) : (
              <Button
                sx={{
                  fontSize: "15px",
                  borderRadius: "20px",
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
                // size="large"
                variant="contained"
                color="primary"
                href="#contained-buttons"
                onClick={async () => {
                  loadweb3data();
                }}
              >
                Connect
              </Button>
            )}
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <Typography
                sx={{ fontSize: "17px" }}
                onClick={async () => {
                  if (await userLogin()) {
                    navigate("/user");
                  } else {
                    navigate("/user/registration");
                  }
                }}
              >
                User
              </Typography>
              <Typography
                sx={{ fontSize: "17px" }}
                onClick={async () => {
                  if (await landInspectorLogin()) {
                    navigate("/land_inspector");
                  } else {
                    alert("You are not a land inspector");
                  }
                }}
              >
                Land Inspector
              </Typography>
              <Typography
                sx={{ fontSize: "17px" }}
                onClick={async () => {
                  if (await contractOwnerLogin()) {
                    navigate("/contract_owner");
                  } else {
                    alert("You are not a contract owner");
                  }
                }}
              >
                Contract Owner
              </Typography>
              {provider || signer || contract ? (
                <Button
                  sx={{
                    fontSize: "15px",
                    borderRadius: "20px",
                    "&:hover": {
                      color: primaryLight,
                      cursor: "pointer",
                    },
                  }}
                  // size="large"
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                  onClick={async () => {
                    loadweb3data();
                  }}
                >
                  {address.slice(0, 6) + "..." + address.slice(-4)}
                </Button>
              ) : (
                <Button
                  sx={{
                    fontSize: "15px",
                    borderRadius: "20px",
                    "&:hover": {
                      color: primaryLight,
                      cursor: "pointer",
                    },
                  }}
                  // size="large"
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                  onClick={async () => {
                    loadweb3data();
                  }}
                >
                  Connect
                </Button>
              )}
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default NavbarPage;
