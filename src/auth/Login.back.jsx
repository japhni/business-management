import LocationCityIcon from "@mui/icons-material/LocationCity";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../utils/apiFunctions.js";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const paperStyle = {
    padding: 30,
    height: "50%",
    width: "50%",
    margin: "19px auto",
    backgroundColor: "#2979ff",
    borderRadius: "12px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 25)",
  };
  const avatarStyle = { backgroundColor: "#D9D9D9" };
  const btnstyle = { backgroundColor: "#1B6DA1", margin: "12px 0" };
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const [checked, setChecked] = useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  //To handle login

  const [errorMessage, setErrorMessage] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleFormSubmit = async (values) => {

    setLogin(values);

    const success = await loginUser(login);

    if (success) {
      const token = success.token;

      auth.handleLogin(token);

      navigate("/");
      //window.location.reload()
    } else {
      setErrorMessage("Invalide username ou mot de passe. Veuillez reessayer!");

      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <Grid marginBottom={100}>
      <Grid align="center">
        <Avatar style={logoStyle}>
          <LocationCityIcon
            style={{ color: "#002A57", width: 56, height: 56 }}
          />
        </Avatar>
        <h2>Company Name</h2>
      </Grid>
      <Paper elavation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon style={{ color: "#002A57" }} />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <FormControlLabel
          labelPlacement="start"
          label="Vous voulez utilise votre email?"
          control={<Switch checked={checked} onChange={handleChecked} />}
        />

        {checked ? (
          <>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues2}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={"Email"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember Me"
                  />

                  <Button
                    style={btnstyle}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                </form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues1}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Numero de Telephone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember Me"
                  />

                  <Button
                    style={btnstyle}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                </form>
              )}
            </Formik>
          </>
        )}

        <Typography>
          <Link href="#">Forgot Password?</Link>
        </Typography>

        <Typography>
          Don't have an account?
          <Link href="#">Sign Up Here.</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email"),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  password: yup.string(),
});

const initialValues1 = {
  phoneNumber: "",
  password: "",
};

const initialValues2 = {
  email: "",
  password: "",
};

export default Login;
