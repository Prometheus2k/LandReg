import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FormCO from "./FormCO";
// import { useNavigate } from "react-router-dom";

const ChangeCOpage = () => {
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
          Change Contract Owner
        </Typography>
        <FormCO />
      </Box>
    </Box>
  );
};

export default ChangeCOpage;
