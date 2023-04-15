import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
// import { useNavigate } from "react-router-dom";

const LIRegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const navigate = useNavigate();
  // const primaryLight = theme.palette.primary.light;
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Land Inspector Registration
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LIRegisterPage;
