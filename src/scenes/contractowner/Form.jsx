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
import { LandState } from "context/landProvider";
import { ethers } from "ethers";
import abi from "../../web3/contract/abi.json";

const registerSchema = yup.object().shape({
  publicKey: yup.string().required("required"),
  Name: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  age: yup.string().required("required"),
  city: yup.string().required("required"),
  // document: yup.string().required("required"),
  // aadharcardno: yup.string().required("required"),
  // pancardno: yup.string().required("required"),
});

const initialValuesRegister = {
  publicKey: "",
  Name: "",
  age: "",
  city: "",
};

const Form = () => {
  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
        let isLandInspectorAdded = await contract.addLandInspector(
          values.publicKey,
          values.Name,
          values.age,
          values.city,
        );
        console.log(isLandInspectorAdded);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Public Key"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.publicKey}
              name="publicKey"
              error={Boolean(touched.publicKey) && Boolean(errors.publicKey)}
              helperText={touched.publicKey && errors.publicKey}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Name}
              name="Name"
              error={Boolean(touched.Name) && Boolean(errors.Name)}
              helperText={touched.Name && errors.Name}
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
              {"REGISTER"}
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
