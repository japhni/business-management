import { Cancel, Save, SaveAsOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { tokens } from "../theme";
import {
  getHistoryInfosByIdAndDatesMedthod,
  getUserById,
  updateUserById,
  updateUserPasswordById,
} from "../utils/apiFunctions";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const formatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    phoneNumber: "",
    email: "",
    birthday: "",
    firstAddress: "",
    secondAdress: "",
    details: "",
    scores: "",
  });

  const [passwordChange, setPasswordChange] = useState({
    id: "",
    password: "",
  });

  const [searchQuery, setSearchQuery] = useState({
    id: userId,
    startDate: formatter.format(new Date()),
    endDate: formatter.format(new Date()),
  });

  const [resultDateRangeChange, setResultDateRangeChange] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessageUser, setErrorMessageUser] = useState("");

  const [successMessageUpdate, setSuccessMessageUpdate] = useState("");
  const [errorMessageUpdate, setErrorMessageUpdate] = useState("");

  const [showUpdateInfosForm, setShowUpdateInfosForm] = useState(false);

  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);

  const [errorMessageSearchByDate, setErrorMessageSearchByDate] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId, token);
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        setErrorMessageUser(error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange({ ...passwordChange, [name]: value });
  };

  const handleDateRangeInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    const startDate = moment(searchQuery.startDate);
    const endDate = moment(searchQuery.endDate);
    if (startDate.isValid() && endDate.isValid()) {
      setErrorMessageSearchByDate("");
    }
  };

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserById(userId, user);

      if (response !== 200) {
        setSuccessMessageUpdate("Donnees mise a jour avec succes!");
        setErrorMessageUpdate("");
        setTimeout(() => {
          setSuccessMessageUpdate("");
          setShowUpdateInfosForm(false);
        }, 5000);
      } else {
        setErrorMessageUpdate("Error de mise a jour les infos");
        setTimeout(() => {
          setErrorMessageUpdate("");
        }, 10000);
      }
    } catch (error) {
      setErrorMessageUpdate(error.message);
      setTimeout(() => {
        setErrorMessageUpdate("");
      }, 10000);
    }
  };

  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUserPasswordById(userId, passwordChange);

      if (response !== 200) {
        setSuccessMessageUpdate("Mot de Passe mise a jour avec succes!");
        setErrorMessageUpdate("");
        setTimeout(() => {
          setSuccessMessageUpdate("");
          setShowUpdatePasswordForm(false);
        }, 5000);
      } else {
        setErrorMessageUpdate("Erreur de mise a jour de Mot de Passe");
        setTimeout(() => {
          setErrorMessageUpdate("");
        }, 10000);
      }
    } catch (error) {
      setErrorMessageUpdate(error.message);
      setTimeout(() => {
        setErrorMessageUpdate("");
      }, 10000);
    }
  };

  const handleEmployeeHistorySearch = async (e) => {
    e.preventDefault();
    const startDate = moment(searchQuery.startDate);
    const endDate = moment(searchQuery.endDate);
    if (!startDate.isValid() || !endDate.isValid()) {
      setErrorMessageSearchByDate("Please enter valid dates");
      return;
    }
    if (endDate.isBefore(startDate)) {
      setErrorMessageSearchByDate(
        "La date de depart doit etre superieur a la derniere date"
      );
      return;
    }
    setIsLoading(true);
    getHistoryInfosByIdAndDatesMedthod(
      searchQuery.id,
      searchQuery.startDate,
      searchQuery.endDate
    )
      .then((response) => {
        setResultDateRangeChange(response.data);
        setTimeout(() => setIsLoading(false), 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columns = [
    {
      field: "lastName",
      headerName: `${
        user?.scores === undefined ? "Nom du Client" : "Nom du Coiffeur"
      }`,
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${
          user?.scores === undefined
            ? row.customer.lastName
            : row.employee.lastName
        }`;
      },
    },
    {
      field: "firstName",
      headerName: `${
        user?.scores === undefined ? "Prenom du Client" : "Prenom du Coiffeur"
      }`,
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${
          user?.scores === undefined
            ? row.customer.firstName
            : row.employee.firstName
        }`;
      },
    },

    {
      field: "otherNames",
      headerName: `${
        user?.scores === undefined ? "Surnom du Client" : "Surnom du Coiffeur"
      }`,
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${
          user?.scores === undefined
            ? row.customer.otherNames
            : row.employee.otherNames
        }`;
      },
    },

    {
      field: "price",
      headerName: "Prix",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value) => {
        if (!value) {
          return value;
        }
        return formatter.format(new Date(value));
      },
    },
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordVerify = () =>
    setShowPasswordVerify((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Paper
      sx={{ padding: "32px", margin: 3, bgcolor: "whitesmoke" }}
      elevation={10}
    >
      <Grid container my={4} border={1} rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          {/* Start of Box for profile with photo */}
          <Box>
            <Stack
              sx={{ border: "1px solid" }}
              direction={"row"}
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Card>
                <CardMedia
                  component={"img"}
                  height={250}
                  image={require("../assets/male-placeholder-image.jpeg")}
                  alt="profile image" 
                />
              <CardContent>
                  {isLoading ? (
                    <Typography component={"div"}>
                      Chargement des donnees...
                    </Typography>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component={"div"}>
                        {errorMessageUser && (
                          <Typography component={"span"}>
                            {"Error: " + errorMessageUser}
                          </Typography>
                        )}
                      </Typography>

                      <Typography gutterBottom variant="h5" component={"div"}>
                        {user?.scores !== undefined ? (
                          <>
                            <Typography component={"span"}>
                              {"Scores: " + user?.scores}
                            </Typography>

                            <Divider />
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>

                      <Typography gutterBottom variant="h5" component={"div"}>
                        {user?.startDate !== undefined ? (
                          <>
                            <Typography component={"div"}>
                              {"Date d'embauche: " + user?.startDate}
                            </Typography>
                            <Divider />
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>

                      <Typography variant="h4" color={"text.secondary"}>
                        Les Roles:{" "}
                        {user.roles ? (
                          user.roles.map((role) => (
                            <ul key={role.id}>
                              <li id={role.id}>
                                {capitalizeFirstLetter(
                                  role.name.split("_").pop().toLowerCase()
                                )}
                              </li>
                            </ul>
                          ))
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Nom:{" "}
                        {user.firstName ? (
                          user.firstName
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>
                      <Divider />
                      <Typography variant="h4" color={"text.secondary"}>
                        Prenom:{" "}
                        {user.lastName ? (
                          user.lastName
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Surnom:{" "}
                        {user.otherNames ? (
                          user.otherNames
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Telephone:{" "}
                        {user.phoneNumber ? (
                          user.phoneNumber
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Email:{" "}
                        {user.email ? (
                          user.email
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Date de Naissance:{" "}
                        {user.birthday ? (
                          formatter.format(new Date(user.birthday))
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Adresse 1:{" "}
                        {user.firstAddress ? (
                          user.firstAddress
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Adresse 2:{" "}
                        {user.secondAdress ? (
                          user.secondAdress
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />

                      <Typography variant="h4" color={"text.secondary"}>
                        Details:{" "}
                        {user.details ? (
                          user.details
                        ) : (
                          <Typography
                            variant="h5"
                            component={"span"}
                            color={"warning.main"}
                          >
                            Pas encore ajouter
                          </Typography>
                        )}
                      </Typography>

                      <Divider />
                    </>
                  )}
                </CardContent>

                <CardActions>
                  {showUpdateInfosForm ? (
                    <Button variant="outlined" size="small" disabled>
                      Veuillez Sauvegarder les infos
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setShowUpdateInfosForm(true);
                        setShowUpdatePasswordForm(false);
                      }}
                    >
                      Mise a jour d'infos
                    </Button>
                  )}

                  {showUpdatePasswordForm ? (
                    <Button variant="outlined" size="small" disabled>
                      Veuillez Sauvegarder le nouveau mot de passe
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setShowUpdatePasswordForm(true);
                        setShowUpdateInfosForm(false);
                      }}
                    >
                      Changer le mot de passe
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Stack>
          </Box>
          {/* End of Box for profile with photo */}
        </Grid>

        {showUpdateInfosForm && (
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Box m="20px" width={"100%"}>
              <h2>Mise a jour d'infos</h2>

              <Typography gutterBottom variant="h5" component={"div"}>
                {errorMessageUpdate && (
                  <Typography component={"span"}>
                    {errorMessageUpdate}
                  </Typography>
                )}
              </Typography>

              <Typography gutterBottom variant="h5" component={"div"}>
                {successMessageUpdate && (
                  <Typography component={"span"}>
                    {successMessageUpdate}
                  </Typography>
                )}
              </Typography>

              <form onSubmit={handleUserUpdateSubmit}>
                <Stack spacing={2} sx={{ marginRight: 3, marginBottom: 3 }}>
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Prenom"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleUserInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Nom"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleUserInputChange}
                    fullWidth
                    required
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Surnom"
                    name="otherNames"
                    value={user.otherNames}
                    onChange={handleUserInputChange}
                    fullWidth
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Telephone"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleUserInputChange}
                    fullWidth
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="email"
                    variant="outlined"
                    color="secondary"
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleUserInputChange}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="date"
                    variant="outlined"
                    color="secondary"
                    label="Date de Naissance"
                    name="birthday"
                    value={formatter.format(new Date(user.birthday))}
                    onChange={handleUserInputChange}
                    min={moment().format("YYYY-MM-DD")}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Adress 1"
                    name="firstAddress"
                    value={user.firstAddress}
                    onChange={handleUserInputChange}
                    fullWidth
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Adress 2"
                    name="secondAdress"
                    value={user.secondAdress}
                    onChange={handleUserInputChange}
                    fullWidth
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Details"
                    name="details"
                    value={user.details}
                    onChange={handleUserInputChange}
                    fullWidth
                    sx={{ mb: 4 }}
                  />
                </Stack>
                <Stack direction={"row"} spacing={15}>
                  <Button variant="contained" color="secondary" type="submit" endIcon={<SaveAsOutlined/>}>
                    Sauvegarder
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="submit"
                    endIcon={<Cancel />}
                    onClick={() => setShowUpdateInfosForm(false)}
                  >
                    Annuler
                  </Button>
                </Stack>
              </form>
            </Box>
          </Grid>
        )}

        {showUpdatePasswordForm && (
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Box m="20px" width={"100%"}>
              <h2>Change le Mot de passe</h2>

              <Typography gutterBottom variant="h5" component={"div"}>
                {errorMessageUpdate && (
                  <Typography component={"span"}>
                    {errorMessageUpdate}
                  </Typography>
                )}
              </Typography>

              <Typography gutterBottom variant="h5" component={"div"}>
                {successMessageUpdate && (
                  <Typography component={"span"}>
                    {successMessageUpdate}
                  </Typography>
                )}
              </Typography>

              <form onSubmit={handleUpdatePasswordSubmit}>
                <Stack spacing={2} sx={{ marginRight: 3, marginBottom: 3 }}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    label="Mot de Passe"
                    name="password"
                    value={passwordChange.value}
                    onChange={handlePasswordInputChange}
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

                  <TextField
                    variant="outlined"
                    color="secondary"
                    label="Verifier Mot de Passe"
                    onChange={handlePasswordInputChange}
                    fullWidth
                    required
                    type={showPasswordVerify ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordVerify}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                          >
                            {showPasswordVerify ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack direction={"row"} spacing={15}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    endIcon={<Save />}
                  >
                    Sauvegarder
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="submit"
                    endIcon={<Cancel />}
                    onClick={() => setShowUpdatePasswordForm(false)}
                  >
                    Annuler
                  </Button>
                </Stack>
              </form>
            </Box>
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Box bgcolor={"gray"} p={2}>
            <form onSubmit={handleEmployeeHistorySearch}>
              <Stack
                spacing={2}
                direction={"row"}
                sx={{ marginRight: 3, marginBottom: 3, display: "flex" }}
              >
                <TextField
                  variant="outlined"
                  color="secondary"
                  label="Debut d'Intervalle"
                  name="startDate"
                  value={searchQuery.startDate}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleDateRangeInputChange}
                  fullWidth
                  required
                  type="date"
                />

                <TextField
                  variant="outlined"
                  color="secondary"
                  label="Fin d'Intervalle"
                  name="endDate"
                  value={searchQuery.endDate}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleDateRangeInputChange}
                  fullWidth
                  required
                  type="date"
                />
              </Stack>
              <Button variant="outlined" color="secondary" type="submit">
                Rechercher
              </Button>
            </form>
          </Box>

          {isLoading ? (
            <p className="mt-4">Finding availble history....</p>
          ) : resultDateRangeChange ? (
            <Box m="20px">
              <Header
                title="Historique"
                subtitle={
                  user?.scores === undefined
                    ? ""
                    : "Nombre de frequantation: " + resultDateRangeChange.length
                }
              />
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}
              >
                {isLoading ? (
                  <div>Loading l'historique...</div>
                ) : (
                  <>
                    <DataGrid
                      rows={resultDateRangeChange}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                    />
                    {/* {error && <div className="text-danger">{error}</div>} */}
                  </>
                )}
              </Box>
            </Box>
          ) : (
            <p className="mt-4">
              Pas d'historique disponible sur les dates selectionnees.
            </p>
          )}
          {errorMessageSearchByDate && (
            <p className="text-danger">{errorMessageSearchByDate}</p>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
