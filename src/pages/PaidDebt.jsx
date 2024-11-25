import { Replay } from "@mui/icons-material";
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
import { createDebtPaid, getAllEmployees } from "../utils/apiFunctions";

const PaidDebt = () => {
  const responsibleId = localStorage.getItem("userId");

  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [errorMessageEmployees, setErrorMessageEmployees] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const formatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [debtPaid, setDebtPaid] = useState({
    responsible_id: responsibleId,
    refunder_id: "",
    paidDate: formatter.format(new Date()),
    amountPaid: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDebtPaid({ ...debtPaid, [name]: value });
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

  const handleDebtPaidSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createDebtPaid(debtPaid);

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

            <form onSubmit={handleDebtPaidSubmit}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <TextField
                  label="Choisir le Staff"
                  value={debtPaid.refunder_id}
                  onChange={handleInputChange}
                  name="refunder_id"
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
                  label="Date de paiement d'une dette"
                  name={"paidDate"}
                  value={debtPaid.paidDate}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Montant paye"
                  name={"amountPaid"}
                  value={debtPaid.amountPaid}
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
                  value={debtPaid.details}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Stack>
              <Stack direction={"row"} spacing={9}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ mb: 2 }}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  endIcon={<Replay />}
                  href="/inventory"
                >
                  Voir dette restante
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default PaidDebt;
