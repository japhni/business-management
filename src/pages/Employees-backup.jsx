import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Breadcrumbs, Link, useTheme } from "@mui/material";
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
    setTimeout(() => {
      getAllEmployees()
        .then((data) => {
          setEmployeesInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, 1000);
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
      field: "roles",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { roles } }) => {
        return roles.map((role) => (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            marginTop={1}
            display="flex"
            justifyContent="center"
            backgroundColor={
              role.name === "ROLE_ADMIN"
                ? colors.greenAccent[600]
                : role.name === "ROLE_EMPLOYEE"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <Breadcrumbs
              aria-label="breadcrumbs"
              separator="|"
            >
            {role.name === "ROLE_ADMIN" && <AdminPanelSettingsOutlinedIcon />}
            {role.name === "ROLE_EMPLOYEE" && <SecurityOutlinedIcon />}
            {role.name === "ROLE_USER" && <LockOpenOutlinedIcon />}
              <Link underline="hover" href={`/update-employee/${role.id}`}>
              {role.name}
              </Link>
            </Breadcrumbs>
          </Box>
        ));
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
