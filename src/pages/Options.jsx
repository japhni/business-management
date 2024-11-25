import { Box, Chip, Grid, Paper } from "@mui/material";
import React from "react";

const Options = () => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      margin={"auto"}
      marginTop={2}
      marginLeft={2}
      marginRight={2}
      marginBottom={2}
    >
      <Paper sx={{ padding: "32px" }} elevation={10}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                  lg: "1fr 1fr 1fr 1fr",
                  xl: "1fr 1fr 1fr 1fr 1fr 1fr",
                },
                gap: 1,
              }}
            >
              <Chip
                label="Dashboard"
                component="a"
                href="/dashboard"
                clickable
              />
              <Chip
                label="Creer nouveau client"
                component="a"
                href="/new-customer"
                clickable
              />
              <Chip
                label="Creer nouveau employee"
                component="a"
                href="/new-employee"
                clickable
              />
              <Chip
                label="Liste des employees"
                component="a"
                href="/employees"
                clickable
              />
              <Chip
                label="Liste des clients"
                component="a"
                href="/customers"
                clickable
              />
              <Chip
                label="Les depenses"
                component="a"
                href="/spending"
                clickable
              />
              <Chip
                label="Produits a acheter"
                component="a"
                href="/item-to-purchase"
                clickable
              />
              <Chip
                label="Inventaire"
                component="a"
                href="/inventory"
                clickable
              />
              <Chip
                label="Dette"
                component="a"
                href="/debt"
                clickable
              />
              <Chip
                label="Dette Payee"
                component="a"
                href="/paid-debt"
                clickable
              />
              
              <Chip
                label="Historique des Dettes Recues"
                component="a"
                href="/debt-history"
                clickable
              />
              <Chip
                label="Historique des Dettes Payees"
                component="a"
                href="/paid-debt-history"
                clickable
              />
               
              <Chip
                label="Historique"
                component="a"
                href="/history"
                clickable
              />

              <Chip
                label="Coif Type"
                component="a"
                href="/coif-style-type"
                clickable
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Options;
