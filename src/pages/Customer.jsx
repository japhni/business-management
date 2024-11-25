import {
  Cancel,
  DateRangeRounded,
  Done,
  EmailRounded,
  PhoneAndroid,
  ScoreboardRounded,
  TextSnippetRounded,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createCustomerEmployee,
  getAllCoifStyles,
  getAllEmployees,
  getCoifStyleById,
  getCustomerById,
  getEmployeeById,
} from "../utils/apiFunctions";

const Customer = () => {
  const renderCustomerInfos = async () => {
    try {
      const response = await getCustomerById(params.userId, token);

      if (response !== 200) {
        setCustomerInfo(response);
      } else {
        setErrorMessageCustomer("Erreur de trouver les infos du client");

        setTimeout(() => {
          setErrorMessageCustomer("");
        }, 10000);
      }
    } catch (error) {
      setErrorMessageCustomer(error.message);
      setTimeout(() => {
        setErrorMessageCustomer("");
      }, 10000);
    }
  };

  const formatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [errorMessageEmployees, setErrorMessageEmployees] = useState("");
  const [errorMessageEmployee, setErrorMessageEmployee] = useState("");
  const [errorMessageCustomer, setErrorMessageCustomer] = useState("");
  const [errorMessageCoifStyles, setErrorMessageCoifStyles] = useState("");
  const [errorMessageCoifStyle, setErrorMessageCoifStyle] = useState("");

  const [successMessageCreation, setSuccessMessageCreation] = useState("");
  const [errorMessageCreation, setErrorMessageCreation] = useState("");

  const [coifStyles, setCoifStyles] = useState([]);

  const [coifStyle, setCoifStyle] = useState([]);

  let params = useParams();

  const token = localStorage.getItem("token");
  const [employee, setEmployee] = useState({
    id: "",
    payed: true,
    motivated: false,
    amount: "",
    employee_id: "",
    customer_id: "",
    coif_style_type_id: "",
  });

  const [openValidationComponent, setOpenValidationComponent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setOpenValidationComponent(true);
    }
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployeesInfo(data);
      })
      .catch((error) => {
        setErrorMessageEmployees(error.message);
      });
  }, []);

  useEffect(() => {
    getAllCoifStyles()
      .then((data) => {
        setCoifStyles(data);
      })
      .catch((error) => {
        setErrorMessageCoifStyles(error.message);
        setOpen(true);
      });
  }, []);

  useEffect(() => {
    getCoifStyleById(employee.coif_style_type_id, token)
      .then((data) => {
        setCoifStyle(data);
      })
      .catch((error) => {
        setErrorMessageCoifStyle(error.message);
        setOpen(true);
      });
  }, [employee.coif_style_type_id, token]);

  useEffect(() => {
    getCustomerById(params.userId, token)
      .then((data) => {
        setCustomerInfo(data);
      })
      .catch((error) => {
        setErrorMessageCustomer(error.message);
        setOpen(true);
      });
  }, [params.userId, token]);

  useEffect(() => {
    getEmployeeById(employee.employee_id, token)
      .then((data) => {
        setEmployeeInfo(data);
      })
      .catch((error) => {
        setErrorMessageEmployee(error.message);
        setOpen(true);
      });
  }, [employee.employee_id, token]);

  /*fonction principale */
  const handleCustomerEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCustomerEmployee(params.userId, employee);

      if (response !== 200) {
        renderCustomerInfos();
        setSuccessMessageCreation("Operation reussie avec succes!");
        setOpenValidationComponent(false);
        setOpen(true);

        //window.location.reload();
      } else {
        setErrorMessageCreation("Error de mise a jour les infos");
        setOpen(true);
      }
    } catch (error) {
      setErrorMessageCreation(error.message);
      setOpen(true);
    }
  };

  console.log("Initially " + (window.navigator.onLine ? "on" : "off") + "line");

  console.log(employee);

  return (
    <Paper sx={{ padding: "32px" }} elevation={10}>
      <Grid container my={4} rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <CardContent>
              {errorMessageEmployees && (
                <Alert
                  variant="standard"
                  severity="error"
                  onClose={() => {
                    setErrorMessageEmployees("");
                  }}
                >
                  {errorMessageEmployees}
                </Alert>
              )}

              {errorMessageEmployee === "undefined" && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {errorMessageEmployee}
                  </Alert>
                </Snackbar>
              )}

              {errorMessageCustomer === "undefined" && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {errorMessageCustomer}
                  </Alert>
                </Snackbar>
              )}

              {errorMessageCoifStyles && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {errorMessageCoifStyles}
                  </Alert>
                </Snackbar>
              )}

              {errorMessageCoifStyle === "undefined" && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {errorMessageCoifStyle}
                  </Alert>
                </Snackbar>
              )}

              {errorMessageCreation && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {errorMessageCreation}
                  </Alert>
                </Snackbar>
              )}

              {successMessageCreation && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {successMessageCreation}
                  </Alert>
                </Snackbar>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  <TextField
                    label="Choisir le Coiffeur"
                    value={employee.employee_id}
                    onChange={handleEmployeeChange}
                    name="employee_id"
                    select
                    fullWidth
                  >
                    {employeesInfo.map((employeeInfos) => (
                      <MenuItem key={employeeInfos.id} value={employeeInfos.id}>
                        {employeeInfos.firstName + " " + employeeInfos.lastName}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Choisir le type de service"
                    value={employee.coif_style_type_id}
                    onChange={handleEmployeeChange}
                    name="coif_style_type_id"
                    select
                    fullWidth
                  >
                    {coifStyles.map((coif) => (
                      <MenuItem key={coif.id} value={coif.id}>
                        {coif.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Prix"
                    name={"amount"}
                    value={employee.amount}
                    onChange={handleEmployeeChange}
                    fullWidth
                    required
                  />

                  {customerInfo.scores < 11 && (
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="payed"
                        name="payed"
                        onChange={handleEmployeeChange}
                        value={employee.payed}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Paye"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="Pas Paye"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}

                <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="motivated"
                        name="motivated"
                        onChange={handleEmployeeChange}
                        value={employee.motivated}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Pique"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="Pas Pique"
                        />
                      </RadioGroup>
                    </FormControl>
                </Stack>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ mb: 2 }}
                >
                  {customerInfo.scores === 11 ? "Valider le Bonus" : "Verifier"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {openValidationComponent && (
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Nom du coiffeur"
                      secondary={
                        employeeInfo.firstName + " " + employeeInfo.lastName
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Montant le client Paye"
                      secondary={employee.amount}
                    />
                  </ListItem>

                  <Divider />
                  <ListItem disablePadding>
                    <ListItemText
                      primary="Type de Service"
                      secondary={coifStyle.name}
                    />
                  </ListItem>

                  <Divider />
                </List>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenValidationComponent(false)}
                  startIcon={<Cancel />}
                  sx={{ m: 2 }}
                >
                  Annuler
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={handleCustomerEmployeeSubmit}
                  startIcon={<Done />}
                  sx={{ m: 2 }}
                >
                  Valider
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <List>
                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ScoreboardRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary="Scores"
                      secondary={
                        customerInfo.scores
                          ? customerInfo.scores
                          : "Pas de Score disponible"
                      }
                    />
                  </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TextSnippetRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary="Nom"
                      secondary={customerInfo.lastName}
                    />
                  </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TextSnippetRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary="Prenom"
                      secondary={customerInfo.firstName}
                    />
                  </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DateRangeRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date de Naissance"
                      secondary={
                        customerInfo.length !== 0
                          ? formatter.format(new Date(customerInfo.birthday))
                          : ""
                      }
                    />
                  </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PhoneAndroid />
                    </ListItemIcon>
                    <ListItemText
                      primary="Telephone"
                      secondary={customerInfo.phoneNumber}
                    />
                  </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EmailRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={customerInfo.email}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Customer;
