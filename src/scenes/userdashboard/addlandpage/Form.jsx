import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import axios from "axios";
import { useState } from "react";
import { LandState } from "context/landProvider";

const registerSchema = yup.object().shape({
  area: yup.number().required("required"),
  address: yup.string().required("required"),
  landPrice: yup.string().required("required"),
  allLatitudeLongitude: yup.string().required("required"),
  propertyPID: yup.string().required("required"),
  survey: yup.string().required("required"),
  files: yup.mixed().required("required"),
});

const initialValuesRegister = {
  area: "",
  address: "",
  landPrice: "",
  allLatitudeLongitude: "",
  propertyPID: "",
  survey: "",
  files: null,
};

const Form = () => {
  const { palette } = useTheme();
  const [myipfsHash, setIPFSHASH] = useState([]);
  const { contract } = LandState();

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
    setIPFSHASH((myipfsHash) => [...myipfsHash, response.data.IpfsHash]);
    console.log(myipfsHash);
    if (myipfsHash.length === 2) {
      alert("Files uploaded successfully");
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);

        setSubmitting(false);
        const docUrl = `https://gateway.pinata.cloud/ipfs/${myipfsHash[0]}`;
        const picUrl = `https://gateway.pinata.cloud/ipfs/${myipfsHash[1]}`;
        console.log(docUrl);
        console.log(picUrl);
        let res = await contract.addLand(
          values.area,
          values.address,
          values.landPrice,
          values.allLatitudeLongitude,
          values.propertyPID,
          values.survey,
          docUrl,
          picUrl,
        );
        console.log(res);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
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
              label="Area(Acres)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.area}
              name="area"
              error={Boolean(touched.area) && Boolean(errors.area)}
              helperText={touched.area && errors.area}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="landPrice"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.landPrice}
              name="landPrice"
              error={Boolean(touched.landPrice) && Boolean(errors.landPrice)}
              helperText={touched.landPrice && errors.landPrice}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              name="address"
              error={Boolean(touched.address) && Boolean(errors.address)}
              helperText={touched.address && errors.address}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="PID No."
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.propertyPID}
              name="propertyPID"
              error={
                Boolean(touched.propertyPID) && Boolean(errors.propertyPID)
              }
              helperText={touched.propertyPID && errors.propertyPID}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Survey No."
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.survey}
              name="survey"
              error={Boolean(touched.survey) && Boolean(errors.survey)}
              helperText={touched.survey && errors.survey}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="latitude,longitude"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.allLatitudeLongitude}
              name="allLatitudeLongitude"
              error={
                Boolean(touched.allLatitudeLongitude) &&
                Boolean(errors.allLatitudeLongitude)
              }
              helperText={
                touched.allLatitudeLongitude && errors.allLatitudeLongitude
              }
              sx={{ gridColumn: "span 4" }}
            />

            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={true}
                onDrop={(acceptedFiles) => {
                  setFieldValue("files", acceptedFiles);
                  acceptedFiles.map((file) => handleFile(file));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.files ? (
                      <p>Drop you files here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          {values.files.map((file) => (
                            <>
                              {file.name} <br />
                            </>
                          ))}
                        </Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
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
              {"ADD"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
