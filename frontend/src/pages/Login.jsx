import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../components/InputFields/InputField";
import { FormBtn } from "../components/CommonBtn/FormBtn";
import { Heading, Para } from "../components/Typography/Text";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

const formFieldProps = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    startIcon: <MdOutlineMailOutline size={24} />,
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    startIcon: <RiLockPasswordLine size={24} />,
  },
];

export const Login = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log("form values", values)}
    >
      {({ values, handleBlur, handleChange, handleSubmit }) => (
        <Grid container sx={{ height: "100vh" }}>
          <Grid
            size={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {/* <Box sx={{ width: "60%" }}>
              <Heading text="Invoice Pro" />
              <Para variant="body2" text="Smart Invoicing Solution" />
            </Box> */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
                width: "60%",
                boxShadow: "0 0 2px",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <Box>
                <Heading variant="h4" text="Welcome Back!" />
                <Para text="Sign in to continue" />
              </Box>
              {formFieldProps.map((fieldProps) => (
                <InputField
                  key={fieldProps.id}
                  {...fieldProps}
                  value={values[fieldProps.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ))}
              <FormBtn btnText="Login" type="submit" />
              <Typography variant="caption" sx={{ textAlign: "center" }}>
                Don't have an account? &nbsp;
                <span style={{ color: "blue" }}>Create Account</span>
              </Typography>
            </form>
            <Para
              variant="caption"
              text={`\u00A9 ${new Date().getFullYear()} All rights reserved.`}
            />
          </Grid>

          <Grid size={6} sx={{ border: "1px solid blue" }}></Grid>
        </Grid>
      )}
    </Formik>
  );
};
