import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { LandState } from "context/landProvider";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  publicKey: yup.string().required("required"),
});

const initialValuesRegister = {
  publicKey: "",
};

const FormCO = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { contract } = LandState();

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        let res = await contract.changeContractOwner(values.publicKey);
        console.log(res);
        resetForm();
        navigate("/");
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
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
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
              sx={{ gridColumn: "span 4" }}
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                gridColumn: "span 2",
              }}
            >
              {"CHANGE"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormCO;
