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
import { createNewCoif } from "../utils/apiFunctions";

const CoifStyleType = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [coif, setCoif] = useState({
    id: "",
    name: "",
    details: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCoifChange = (e) => {
    const { name, value } = e.target;
    setCoif({ ...coif, [name]: value });
  };

  const handleCoifSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createNewCoif(coif);

      if (response !== 200) {
        setSuccessMessage("Coif cree avec succes!");
        setErrorMessage("");
        setOpen(true)
        
      } else {
        setErrorMessage("Echec de creer le Coif!");
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
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            )}
            <form onSubmit={handleCoifSubmit}>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Nom du coif"
                  name={"name"}
                  value={coif.name}
                  onChange={handleCoifChange}
                  fullWidth
                  required
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Description du style du coif"
                  name={"details"}
                  value={coif.details}
                  onChange={handleCoifChange}
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

export default CoifStyleType;
