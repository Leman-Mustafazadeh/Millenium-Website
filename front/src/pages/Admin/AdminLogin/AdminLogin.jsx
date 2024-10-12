import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import './style.css';
import { endpoints } from "../../../API/constant";
import controller from "../../../API";
import { login } from "../../../services/redux/user";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const getUsername = async () => {
    try {
      const response = await axios.getAll('/Account/get-username');
      console.log("Username:", response.data.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Invalid email address'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password must be at least 6 characters'),
    }),



    onSubmit: (values) => {
      axios.post("https://millenniumtour.redmark.az/Account/Login", values).then((res)=>{
        console.log(res.data.token);
        dispatch(login(res.data))
        navigate("/")
        
      })
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
