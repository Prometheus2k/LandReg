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
  area: yup.string().required("required"),
  survey: yup.string().required("required"),
  address: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesRegister = {
  area: "",
  survey: "",
  address: "",
  picture: "",
};

const Form = () => {
  const { palette } = useTheme();
  const [myipfsHash, setIPFSHASH] = useState("");
  const { provider, setProvider, signer, setSigner, contract, setContract } =
    LandState();

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

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        const docUrl = `https://gateway.pinata.cloud/ipfs/${myipfsHash}`;
        console.log(docUrl);
        const account = await signer.getAddress();
        let res = await contract.addLand(
          values.area,
          values.address,
          values.survey,
          docUrl,
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
              label="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              name="address"
              error={Boolean(touched.address) && Boolean(errors.address)}
              helperText={touched.address && errors.address}
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
                multiple={false}
                onDrop={(acceptedFiles) => {
                  setFieldValue("picture", acceptedFiles[0]);
                  // setFile(acceptedFiles[0]);
                  handleFile(acceptedFiles[0]);
                  // console.log(values);
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
                    {/* {console.log(values.picture)} */}
                    {!values.picture ? (
                      <p>Add Your Document Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
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
