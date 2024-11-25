import { House, Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/apiFunctions";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const avatarStyle = { backgroundColor: "#D9D9D9" };

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const [login, setLogin] = useState({
    phoneNumber: "",
    password: ""
});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleInputChange = (e) => {

      setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

      e.preventDefault()
      const success = await loginUser(login);

      if (success) {

          const token = success.token

          auth.handleLogin(token)

          navigate("/")
          //window.location.reload()
      } else {
          setErrorMessage("Invalide username ou password. Veuillez reessayer.")
      }

      setTimeout(() => {
          setErrorMessage("")
      }, 4000);
  }

  console.log(login)

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      margin={"auto"}
      width={400}
      marginTop={2}
    >
      <Grid align="center">
        <Avatar style={logoStyle}>
          <House
            style={{ color: "#002A57", width: 56, height: 56 }}
          />
        </Avatar>
        <h2>Bright Salon</h2>
      </Grid>
      <Paper sx={{ padding: "32px" }} elevation={10}>
        <Card>
          <CardContent>
          <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon style={{ color: "#002A57" }} />
          </Avatar>
          <h2>Authentification</h2>
        </Grid>
        <FormControlLabel
          labelPlacement="start"
          label="Vous voulez utilise votre email? "
          control={<Switch checked={checked} onChange={handleChecked} />}
        />

            {errorMessage && <p>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Numero de Telephone"
                  name={"phoneNumber"}
                  value={login.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />

                <TextField
                  variant="outlined"
                  color="secondary"
                  label="Mot de Passe"
                  name={"password"}
                  value={login.password}
                  onChange={handleInputChange}
                  fullWidth
                  required

                  type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                />
              </Stack>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ mb: 2 }}
              >
                Valider
              </Button>
            </form>
            <Typography>
              Vous avez oublie votre mot de passe? 
              <Link href="#"> Reinitialiser ici.</Link>
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default Login;
