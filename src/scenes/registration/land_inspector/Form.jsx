import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";

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

  const isNonMobile = useMediaQuery("(min-width:600px)");

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
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              label="Age"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.age}
              name="age"
              error={Boolean(touched.age) && Boolean(errors.age)}
              helperText={touched.age && errors.age}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              name="city"
              error={Boolean(touched.city) && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {"REGISTOR"}
            </Button>
            <Typography
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {"Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
