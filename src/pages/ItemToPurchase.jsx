import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { createNewItem } from "../utils/apiFunctions";

const ItemToPurchase = () => {
  const [item, setItem] = useState({
    id: "",
    name: "",
    details: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createNewItem(item);

      if (response !== 200) {
        setSuccessMessage("Article cree avec succes!");
        setErrorMessage("");
        setOpen(true);
      } else {
        setErrorMessage("Echec de creer un article!");
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
      marginTop={10}
    >
      <Paper sx={{ padding: "32px" }} elevation={10}>
        <Card>
          <CardContent>
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

            <form onSubmit={handleItemSubmit}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Nom de l'article"
                  name={"name"}
                  value={item.name}
                  onChange={handleItemChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Description de l'article"
                  name={"details"}
                  value={item.details}
                  onChange={handleItemChange}
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

export default ItemToPurchase;
