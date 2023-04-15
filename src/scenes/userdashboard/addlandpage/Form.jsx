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
  email: "",
  age: "",
  city: "",
  document: "",
  aadharcardno: "",
  pancardno: "",
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
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
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
