import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { LandState } from "context/landProvider";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  age: yup.string().required("required"),
  city: yup.string().required("required"),
  // document: yup.string().required("required"),
  aadharcardno: yup.string().required("required"),
  pancardno: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  city: "",
  // document: "",
  aadharcardno: "",
  pancardno: "",
};

const Form = () => {
  const { palette } = useTheme();
  const [file, setFile] = useState();
  const [myipfsHash, setIPFSHASH] = useState("");
  const { contract } = LandState();

  const navigate = useNavigate();

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

  const handleFile = async (fileToHandle) => {
    console.log("starting");
    const formData = new FormData();
    formData.append("file", fileToHandle);

    // call the keys from .env

    const API_KEY = "a60dc487cef5582e63e3";
    const API_SECRET =
      "6c027de60d679ac4d05fe6d7963fcb885f0b10b893ca943e6725f2d64cbcaadc";

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const response = await axios.post(url, formData, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
        pinata_api_key: API_KEY,
        pinata_secret_api_key: API_SECRET,
      },
    });

    setIPFSHASH(response.data.IpfsHash);
    console.log(myipfsHash);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        const docUrl = `https://gateway.pinata.cloud/ipfs/${myipfsHash}`;
        console.log(docUrl);
        let res = await contract.registerNewUser(
          values.firstName + " " + values.lastName,
          values.email,
          values.age,
          values.city,
          values.aadharcardno,
          values.pancardno,
          docUrl,
        );
        console.log(res);
        resetForm();
        navigate("/user");
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
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <input
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
              />
              Add document
              <Button onClick={() => handleFile(file)}> Upload </Button>
            </Box>
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Aadhar card number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.aadharcardno}
              name="aadharcardno"
              error={
                Boolean(touched.aadharcardno) && Boolean(errors.aadharcardno)
              }
              helperText={touched.aadharcardno && errors.aadharcardno}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Pan card number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pancardno}
              name="pancardno"
              error={Boolean(touched.pancardno) && Boolean(errors.pancardno)}
              helperText={touched.pancardno && errors.pancardno}
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
