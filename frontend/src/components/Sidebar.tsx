import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>Pharmacy ERP</h2>

      <Link to="/">Dashboard</Link>
      <br /><br />

      <Link to="/customers">Customers</Link>
      <br /><br />

      <Link to="/medicines">Medicines</Link>
      <br /><br />

      <Link to="/inventory">Inventory</Link>
      <br /><br />

      <Link to="/Sales">Sales</Link>
      <br /><br />

      <Link to="/reports">Reports</Link>
      
      <br /><br />
      
      <Link to="/suppliers">
        Suppliers
      </Link>
      <br /><br />
      <Link to="/purchases">
        Purchases
      </Link>
    </div>
    
  );
}

export default Sidebar;