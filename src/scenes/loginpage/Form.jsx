import { Box, Button, useTheme, Card, CardMedia } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import loginbutton from "asset/loginbutton.png";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  age: yup.string().required("required"),
  city: yup.string().required("required"),
  document: yup.string().required("required"),
  aadharcardno: yup.string().required("required"),
  pancardno: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  age: "",
  city: "",
};

const Form = () => {
  const { palette } = useTheme();
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
      }) => (
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
