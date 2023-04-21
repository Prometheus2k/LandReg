import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { LandState } from "context/landProvider";

const NavbarPage = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();
  const contractOwnerLogin = async () => {
    let contractOwnerAddress = await signer.getAddress();
    // console.log(contractOwnerAddress);
    let isContractOwnerAuth = await contract.isContractOwner(
      contractOwnerAddress,
    );
    // console.log(isContractOwnerAuth);
    return isContractOwnerAuth;
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
              onClick={() => navigate("/user")}
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
              onClick={() => {
                navigate("/land_inspector");
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
            <Typography
              sx={{
                fontSize: "17px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/about")}
            >
              About
            </Typography>
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
                onClick={() => navigate("/user")}
              >
                User
              </Typography>
              <Typography
                sx={{ fontSize: "17px" }}
                onClick={() => navigate("/land_inspector")}
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
              <Typography
                sx={{ fontSize: "17px" }}
                onClick={() => navigate("/about")}
              >
                About
              </Typography>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default NavbarPage;
