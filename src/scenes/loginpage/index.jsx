import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  // const primaryLight = theme.palette.primary.light;
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="left"
      >
        <Typography fontWeight="bold" fontSize="32px">
          <IconButton onClick={() => navigate("/")} sx={{ m: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          Login
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
