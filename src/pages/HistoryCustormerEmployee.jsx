import { Alert, Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { tokens } from "../theme";
import { getAllHistoryCustomerEmployee } from "../utils/apiFunctions";

const HistoryCustormerEmployee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch datas
  const [historyInfo, setHistoryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
      getAllHistoryCustomerEmployee()
        .then((data) => {
          setHistoryInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
  }, []);

  const columns = [
    {
        field: "employee.lastName",
        headerName: "Nom de l'Employee",
        flex: 1,
        cellClassName: "name-column--cell",
        valueGetter: (value, row) => {
          return `${row.employee.lastName }`;
        },
      },
    {
      field: "employee.firstName",
      headerName: "Prenom de l'Employee",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${row.employee.firstName }`;
      },
    },
    
    {
      field: "employee.otherNames",
      headerName: "Surnom de l'Employee",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${row.employee.otherNames }`;
      },
    },
    

    {
        field: "customer.lastName",
        headerName: "Nom du Client",
        flex: 1,
        cellClassName: "name-column--cell",
        valueGetter: (value, row) => {
          return `${row.customer.lastName }`;
        },
      },
    {
      field: "customer.firstName",
      headerName: "Prenom du Client",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${row.customer.firstName }`;
      },
    },
    
    {
      field: "customer",
      headerName: "Surnom du Client",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        return `${row.customer.otherNames }`;
      },
    },

    {
        field: "amount",
        headerName: "Prix",
        flex: 1,
        cellClassName: "name-column--cell"
      },

  ];

  return (
    <Box m="20px">
      <Header title="Historique des clients par rapport aux coiffeurs" subtitle="Liste des clients et coiffeurs" />
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
          <div>Loading liste l'historique...</div>
        ) : (
          <>
            <DataGrid
              checkboxSelection
              rows= {historyInfo}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
            {error && <div className="text-danger">{error}</div>}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HistoryCustormerEmployee
