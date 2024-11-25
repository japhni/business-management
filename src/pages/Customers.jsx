import Edit from "@mui/icons-material/Edit";
import { Alert, Box, IconButton, Link, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { tokens } from "../theme";
import { getAllCustomers } from "../utils/apiFunctions";

const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define a function called diff_months that calculates the difference in months between two given dates (dt2 and dt1).
  function diff_months(dt2, dt1) {
    // Calculate the difference in milliseconds between the two dates.
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    // Convert the difference from milliseconds to months by dividing it by the number of milliseconds in an hour, a day, a week, and approximately 4 weeks in a month.
    diff /= 60 * 60 * 24 * 7 * 4;
    // Round the result to the nearest integer using Math.round().
    return Math.abs(Math.round(diff));
  }

  // Fetch datas
  const [customerInfo, setCustomerInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCustomers()
      .then((data) => {
        setCustomerInfo(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); 
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "firstName",
      headerName: "Prenom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Nom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "otherNames",
      headerName: "Surnom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "birthday",
      headerName: "Age",
      type: "text",
      valueGetter: (value) => {
        const birthday = new Date(value);
        const today = new Date();
        const years = today.getFullYear() - birthday.getFullYear();

        return years <= 0
          ? diff_months(today, birthday) + " mois"
          : years + " ans";
      },
      headerAlign: "left",
      align: "left",
    },
    {
      field: "firstAddress",
      headerName: "Address 1",
      flex: 1,
    },
    {
      field: "secondAdress",
      headerName: "Address 2",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Link underline="hover" href={`/customer/${id}`}>
            <IconButton borderBottom="20px" color="info">
              <Edit />
            </IconButton>
          </Link>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="CLIENTS" subtitle="Liste des clients" />
      {error && (
        <Alert variant="standard" severity="error" onClose={() => {setError("")}}>
          {error}
        </Alert>
      )}

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
          <div>Loading liste des clients...</div>
        ) : (
          <>
            <DataGrid
              rows={customerInfo}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Customers;
