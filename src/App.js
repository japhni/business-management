import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import Login from "./auth/Login";
import Profile from "./auth/Profile";
import Basic from "./Basic";
import ClientRegister from "./pages/ClientRegister";
import CoifStyleType from "./pages/CoifStyleType";
import Customer from "./pages/Customer";
import Customers from "./pages/Customers";
import Debt from "./pages/Debt";
import DebtHistory from "./pages/DebtHistory";
import Employee from "./pages/Employee";
import EmployeeRegister from "./pages/EmployeeRegister";
import Employees from "./pages/Employees";
import HistoryCustormerEmployee from "./pages/HistoryCustormerEmployee";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ItemToPurchase from "./pages/ItemToPurchase";
import Options from "./pages/Options";
import PaidDebt from "./pages/PaidDebt";
import PaidDebtHistory from "./pages/PaidDebtHistory";
import Spending from "./pages/Spending";
import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar/calendar";
import Dashboard from "./scenes/dashboard";
import FAQ from "./scenes/faq";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import TopNavBar from "./scenes/global/TopNavBar";
import Invoices from "./scenes/invoices";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import { useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <AuthProvider>
    {/* <ColorModeContext.Provider value={colorMode}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <TopNavBar/>
            <Routes>
              
              {/* <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} /> */}
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />

              <Route path="/" element={<Home />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-customer" element={<ClientRegister />} />
              <Route path="/new-employee" element={<EmployeeRegister />} />

              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />

              <Route path="/customer/:userId" element={<Customer />} />

              <Route path="/spending" element={<Spending />} />
              <Route path="/item-to-purchase" element={<ItemToPurchase />} />
              <Route path="/coif-style-type" element={<CoifStyleType />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/debt" element={<Debt />} />
              <Route path="/paid-debt" element={<PaidDebt />} />
              <Route path="/debt-history" element={<DebtHistory />} />
              <Route path="/paid-debt-history" element={<PaidDebtHistory />} />

              <Route path="/update-employee/:id" element={<Employee />} />

              <Route path="/history" element={<HistoryCustormerEmployee />} />
              
              <Route path="/options" element={<Options />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />

              <Route path="/basic" element={<Basic />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    {/* </ColorModeContext.Provider> */}
    </AuthProvider>
  );
}

export default App;
