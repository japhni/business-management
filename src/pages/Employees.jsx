import { Edit } from "@mui/icons-material";
import { Alert, Box, IconButton, Link, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { tokens } from "../theme";
import { getAllEmployees } from "../utils/apiFunctions";

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch datas
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
      getAllEmployees()
        .then((data) => {
          setEmployeesInfo(data);
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
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: ({row: {id}})=>{
        return <Link underline="hover" href={`/update-employee/${id}`}>
        <IconButton borderBottom='20px' color="info"><Edit /></IconButton>
        </Link>
      }
    },
    
  ];
 
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        }}
      >
        {isLoading ? (
          <div>Loading liste des employees...</div>
        ) : (
          <>
            <DataGrid autoPageSize autosizeOnMount rows={employeesInfo} columns={columns} />
            {error && <div className="text-danger">{error}</div>}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Employees;
