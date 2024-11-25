import {
  Alert,
  Box,
  Button,
  CardContent,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { createNewSpending, getAllItems } from "../utils/apiFunctions";

const Spending = () => {
  const userId = localStorage.getItem("userId");

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

  const [spending, setSpending] = useState({
    id: "",
    spendingDate: formatter.format(new Date()),
    unitPrice: "",
    quantityPurchased: 1,
    amountPaid: "",
    itemPurchasedId: "",
    user_id: userId,
    details: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [errorMessageItem, setErrorMessageItem] = useState("");

  const [items, setItems] = useState([]);

  const handleSpendingChange = (e) => {
    const { name, value } = e.target;
    setSpending({ ...spending, [name]: value });
  };

  useEffect(() => {
    getAllItems()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        setErrorMessageItem(error.message);
      });
  }, []);

  const handleSpendingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createNewSpending(spending);

      if (response !== 200) {
        setSuccessMessage("Depense enregistre avec succes!");
        setErrorMessage("");
        setOpen(true);
      } else {
        setErrorMessage("Echec d'enregistrer la depense!");
        setOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpen(true);
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
      <Paper sx={{ padding: "5px" }} elevation={10}>
        <Card>
          <CardContent>
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

            {errorMessageItem && (
              <Alert
                variant="standard"
                severity="error"
                onClose={() => {
                  setErrorMessageItem("");
                }}
              >
                {errorMessageItem}
              </Alert>
            )}

            <form onSubmit={handleSpendingSubmit}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <TextField
                  label="Choisir type d'article"
                  value={spending.itemPurchasedId}
                  onChange={handleSpendingChange}
                  name="itemPurchasedId"
                  select
                  fullWidth
                  required
                >
                  {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date d'achat d'article"
                  name={"spendingDate"}
                  value={spending.spendingDate}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleSpendingChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Prix par inite"
                  name={"unitPrice"}
                  value={spending.unitPrice}
                  onChange={handleSpendingChange}
                  fullWidth
                  required
                />

                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Quantite Achete"
                  name={"quantityPurchased"}
                  value={spending.quantityPurchased}
                  onChange={handleSpendingChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Montant paye"
                  value={spending.quantityPurchased * spending.unitPrice}
                  onChange={handleSpendingChange}
                  fullWidth
                  disabled
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Details"
                  name={"details"}
                  value={spending.details}
                  onChange={handleSpendingChange}
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

export default Spending;
