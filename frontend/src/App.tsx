import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Medicines from "./pages/Medicines";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Suppliers from "./pages/Suppliers";
import Purchases from "./pages/Purchases";

function App() {

  return (

    <BrowserRouter>

      <div
        style={{
          display: "flex"
        }}
      >

        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px"
          }}
        >

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/medicines"
              element={<Medicines />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/sales"
              element={<Sales />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/suppliers"
              element={<Suppliers />}
            />

            <Route
              path="/purchases"
              element={<Purchases />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );
}

export default App;