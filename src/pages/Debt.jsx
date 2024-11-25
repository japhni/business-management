import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { createNewDebt, getAllEmployees } from "../utils/apiFunctions";

const Debt = () => {
  const responsibleId = localStorage.getItem("userId");

  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [errorMessageEmployees, setErrorMessageEmployees] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const [debt, setDebt] = useState({
    responsible_id: responsibleId,
    requester_id: "",
    debtDate: formatter.format(new Date()),
    debtAmount: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDebt({ ...debt, [name]: value });
  };

  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployeesInfo(data);
      })
      .catch((error) => {
        setErrorMessageEmployees(error.message);
        setOpen(true)
      });
  }, []);

  const handleDebtSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createNewDebt(debt);

      if (response !== 200) {
        setSuccessMessage("Dette enregistre avec succes!");
        setErrorMessage("");
        setOpen(true)
      } else {
        setErrorMessage("Echec d'enregistrer la dette!");
        setOpen(true)
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpen(true)
    }
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      margin={"auto"}
      width={400}
      marginTop={5}
      marginBottom={10}
    >
      <Paper sx={{ padding: "25px" }} elevation={10}>
        <Card>
          <CardContent>
            {errorMessageEmployees && (
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
                  {errorMessageEmployees}
                </Alert>
              </Snackbar>
            )}

            {errorMessage && (
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
                  {errorMessage}
                </Alert>
              </Snackbar>
            )}

            {successMessage && (
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
                  {successMessage}
                </Alert>
              </Snackbar>
            )}

            <form onSubmit={handleDebtSubmit}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <TextField
                  label="Choisir le Staff"
                  value={debt.requester_id}
                  onChange={handleInputChange}
                  name="requester_id"
                  select
                  fullWidth
                  required
                >
                  {employeesInfo.map((employeeInfos) => (
                    <MenuItem key={employeeInfos.id} value={employeeInfos.id}>
                      {employeeInfos.firstName + " " + employeeInfos.lastName}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date de reception d'une dette"
                  name={"debtDate"}
                  value={debt.debtDate}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Montant recu"
                  name={"debtAmount"}
                  value={debt.debtAmount}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Details"
                  name={"details"}
                  value={debt.details}
                  onChange={handleInputChange}
                  fullWidth
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
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default Debt;
