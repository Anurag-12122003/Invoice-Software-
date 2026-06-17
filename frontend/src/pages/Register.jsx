import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../components/InputFields/InputField";
import { FormBtn } from "../components/CommonBtn/FormBtn";
import { Heading, Para } from "../components/Typography/Text";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import img1 from "../assets/img1.png";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

const formFieldProps = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your fullname",
    type: "text",
    startIcon: <FaRegUser size={24} />,
  },
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

export const Register = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        size={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 600, height: 400 }}>
          <img src={img1} width="100%" />
        </Box>
      </Grid>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log("form values", values)}
      >
        {({ values, handleBlur, handleChange, handleSubmit }) => (
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
            <Heading variant="h4" text="Welcome" />
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                width: "60%",
                boxShadow: "0 0 2px",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <Para text="Sign Up" style={{ fontSize: "20px", fontWeight: "bold" }} />
              {formFieldProps.map((fieldProps) => (
                <InputField
                  key={fieldProps.id}
                  {...fieldProps}
                  value={values[fieldProps.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ))}
              <FormBtn btnText="Register" type="submit" />
              <Typography variant="caption" sx={{ textAlign: "center" }}>
                Already have an account? &nbsp;
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
            </form>
            <Para
              variant="caption"
              text={`\u00A9 ${new Date().getFullYear()} All rights reserved.`}
            />
          </Grid>
        )}
      </Formik>
    </Grid>
  );
};
