import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { LandState } from "context/landProvider";
import { ethers } from "ethers";

const registerSchema = yup.object().shape({
  publicKey: yup.string().required("required"),
  Name: yup.string().required("required"),
  age: yup.string().required("required"),
  designation: yup.string().required("required"),
  city: yup.string().required("required"),
});

const initialValuesRegister = {
  publicKey: "",
  Name: "",
  age: "",
  designation: "",
  city: "",
};

const Form = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { contract } = LandState();

  const cities = [
    "Kasaragod",
    "Kannur",
    "Wayanad",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Thrissur",
    "Ernakulam",
    "Idukki",
    "Kottayam",
    "Alappuzha",
    "Pathanamthitta",
    "Kollam",
    "Thiruvananthapuram",
  ];

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        if (ethers.isAddress(values.publicKey)) {
          let isLandInspectorAdded = await contract.addLandInspector(
            values.publicKey,
            values.Name,
            values.age,
            values.designation,
            values.city,
          );
          console.log(isLandInspectorAdded);
          resetForm();
        } else {
          alert("Invalid Public Key");
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
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
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Name}
              name="Name"
              error={Boolean(touched.Name) && Boolean(errors.Name)}
              helperText={touched.Name && errors.Name}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl variant="outlined" style={{ gridColumn: "span 2" }}>
              <InputLabel shrink>Designation</InputLabel>
              <Select
                label="Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={
                  Boolean(touched.designation) && Boolean(errors.designation)
                }
                helperText={touched.designation && errors.designation}
              >
                <MenuItem value={"Registrar"}>Registrar</MenuItem>
                <MenuItem value={"Sub Registrar"}>Sub Registrar</MenuItem>
                <MenuItem value={"Joint Sub Registrar"}>
                  Joint Sub Registrar
                </MenuItem>
              </Select>
              <FormHelperText>Select a designation</FormHelperText>
            </FormControl>

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
            <FormControl variant="outlined" style={{ gridColumn: "span 2" }}>
              <InputLabel shrink>City</InputLabel>
              <Select
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={Boolean(touched.city) && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              >
                {cities.map((city) => (
                  <MenuItem value={city}>{city}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a City</FormHelperText>
            </FormControl>
            <TextField
              label="Public Key"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.publicKey}
              name="publicKey"
              error={Boolean(touched.publicKey) && Boolean(errors.publicKey)}
              helperText={touched.publicKey && errors.publicKey}
              sx={{ gridColumn: "span 4" }}
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
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
