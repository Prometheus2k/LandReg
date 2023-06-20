import { Box, Button, useTheme, Card, CardMedia } from "@mui/material";

import { Formik } from "formik";
import loginbutton from "asset/loginbutton.png";

const Form = () => {
  const { palette } = useTheme();
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik>
      {() => (
        <form>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",

                "&:hover": { color: palette.primary.main },
              }}
            >
              <Box sx={{ m: 0 }}>
                <Card
                  sx={{ padding: "0rem", maxWidth: 600, borderRadius: "16px" }}
                >
                  <CardMedia
                    component="img"
                    alt="loginbutton"
                    height="100"
                    image={loginbutton}
                  />
                </Card>
              </Box>
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
