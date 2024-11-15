import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../../services/redux/auth";
import "./style.css";
import { message } from "antd";
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const getUsername = async () => {
  //   try {
  //     const response = await axios.getAll("/Account/get-username");
  //     console.log("Username:", response.data.username);
  //   } catch (error) {
  //     console.error("Error fetching username:", error);
  //   }
  // };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Invalid email address"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password must be at least 6 characters"),
    }),

    onSubmit: (values) => {
      axios
        .post("https://millenniumtour.redmark.az/Account/Login", values)
        .then((res) => {
          console.log(res.data.token);
          dispatch(login(res.data));
          // window.location.href = "/admin/hero";
          navigate("/admin/hero");
        }).catch((err)=>{
          message.error(err.response.data.message|| "loggedin failed")
          // console.log(err.response.data.message);
          
        });
        
    },
  });

  return (
    <div className="root">
      <Container maxWidth="sm">
        <Box className="formContainer">
          <Typography variant="h4" className="title">
            Admin Login
          </Typography>
          <form onSubmit={formik.handleSubmit} className="form">
            <TextField
              id="email"
              name="email"
              label="Email address"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="submitButton"
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AdminLogin;
