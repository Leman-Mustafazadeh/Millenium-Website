import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import './style.css'; // Import the CSS file

const AdminLogin = () => {
  return (
    <div className="root">
      <Container maxWidth="sm">
        <Box className="formContainer">
          <Typography variant="h4" className="title">
            Admin Login
          </Typography>
          <form
            // onSubmit={formik.handleSubmit}
            className="form"
          >
            <TextField
              id="email"
              name="email"
              label="Email address"
              variant="outlined"
              fullWidth
              // value={formik.values.email}
              // onChange={formik.handleChange}
              // error={formik.touched.email && Boolean(formik.errors.email)}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              // value={formik.values.password}
              // onChange={formik.handleChange}
              // error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
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
