import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../components/InputFields/InputField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FormBtn } from "../components/CommonBtn/FormBtn";
import { Heading, Para } from "../components/Typography/Text";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
});

const formFieldProps = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    icon: "",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    icon1: <FaRegEye />,
    icon2: <FaRegEyeSlash />,
  },
];

export const Login = () => {
  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
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
            <Box sx={{ width: "60%" }}>
              <Heading text="Invoice Pro" />
              <Para variant="body2" text="Smart Invoicing Solution" />
            </Box>
            <form style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "60%", boxShadow: "0 0 2px", borderRadius: "4px", padding: "10px" }}>
              <Box>
                <Heading variant="h4" text="Welcome Back!" />
                <Para text="Sign in to continue" />
              </Box>
              {formFieldProps.map((fieldProps) => (
                <InputField {...fieldProps} />
              ))}
              <FormBtn btnText="Login" />
              <Typography variant="caption" sx={{ textAlign: "center" }}>
                Don't have an account? &nbsp;
                <span style={{ color: "blue" }}>
                    Create Account
                </span>
              </Typography>
            </form>
            <Para variant="caption" text={`\u00A9 ${new Date().getFullYear()} InvoicePro. All rights reserved.`} />
          </Grid>

          <Grid size={6} sx={{ border: "1px solid blue" }}></Grid>
        </Grid>
      )}
    </Formik>
  );
};
