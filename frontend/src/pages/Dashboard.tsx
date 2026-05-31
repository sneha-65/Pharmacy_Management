import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [stats,setStats] = useState<any>({});
  const [lowStock,setLowStock] = useState<any[]>([]);
  const [expiry,setExpiry] = useState<any[]>([]);

  const loadDashboard = async()=>{

    const s = await API.get("/dashboard");
    const l = await API.get("/lowStock");
    const e = await API.get("/expiryMedicines");

    setStats(s.data);
    setLowStock(l.data);
    setExpiry(e.data);
  };

  useEffect(()=>{

    loadDashboard();

  },[]);

  return(

    <div>

      <h1>
        Pharmacy Dashboard
      </h1>

      <div
      style={{
        display:"grid",
        gridTemplateColumns:
        "repeat(4,1fr)",
        gap:"20px"
      }}
      >

        <div style={cardStyle}>
          <h3>Total Customers</h3>
          <h1>{stats.customers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Medicines</h3>
          <h1>{stats.medicines}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Sales</h3>
          <h1>{stats.sales}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <h1>₹{stats.revenue}</h1>
        </div>

      </div>

      <br />

      <h2>
        Low Stock Alerts
      </h2>

      {
        lowStock.map((item:any)=>(

          <div
          key={item.MedicineName}
          style={alertStyle}
          >

            {item.MedicineName}

            -

            Stock:
            {item.CurrentStock}

          </div>

        ))
      }

      <br />

      <h2>
        Expiry Alerts
      </h2>

      {
        expiry.map((item:any)=>(

          <div
          key={item.MedicineID}
          style={expiryStyle}
          >

            {item.MedicineName}

            -

            {item.ExpiryDate}

          </div>

        ))
      }

    </div>

  );
}

const cardStyle = {

  background:"#1e293b",
  color:"white",
  padding:"20px",
  borderRadius:"15px"

};

const alertStyle = {

  background:"#ef4444",
  color:"white",
  padding:"10px",
  marginTop:"10px",
  borderRadius:"10px"

};

const expiryStyle = {

  background:"#f59e0b",
  color:"white",
  padding:"10px",
  marginTop:"10px",
  borderRadius:"10px"

};

export default Dashboard;