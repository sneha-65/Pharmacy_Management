import { useEffect, useState } from "react";
import API from "../services/api";

function Sales() {

  const [customers,setCustomers] = useState<any[]>([]);
  const [medicines,setMedicines] = useState<any[]>([]);
  const [sales,setSales] = useState<any[]>([]);

  const [form,setForm] = useState({

    customerID:"",
    medicineID:"",
    quantity:""

  });

  const loadData = async()=>{

    const c = await API.get("/customers");
    const m = await API.get("/medicines");
    const s = await API.get("/salesReport");

    setCustomers(c.data);
    setMedicines(m.data);
    setSales(s.data);
  };

  const addSale = async()=>{

    await API.post("/addSale",{

      customerID:Number(form.customerID),
      medicineID:Number(form.medicineID),
      quantity:Number(form.quantity)

    });

    alert("Sale Completed");

    setForm({

      customerID:"",
      medicineID:"",
      quantity:""

    });

    loadData();
  };

  useEffect(()=>{

    loadData();

  },[]);

  return(

    <div>

      <h1>Sales & Billing</h1>

      <div>

        <select
        value={form.customerID}
        onChange={(e)=>
        setForm({
          ...form,
          customerID:e.target.value
        })}
        >

          <option value="">
            Select Customer
          </option>

          {
            customers.map((c:any)=>(

              <option
              key={c.CustomerID}
              value={c.CustomerID}
              >
                {c.CustomerName}
              </option>

            ))
          }

        </select>

        <br /><br />

        <select
        value={form.medicineID}
        onChange={(e)=>
        setForm({
          ...form,
          medicineID:e.target.value
        })}
        >

          <option value="">
            Select Medicine
          </option>

          {
            medicines.map((m:any)=>(

              <option
              key={m.MedicineID}
              value={m.MedicineID}
              >
                {m.MedicineName}
              </option>

            ))
          }

        </select>

        <br /><br />

        <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e)=>
        setForm({
          ...form,
          quantity:e.target.value
        })}
        />

        <br /><br />

        <button
        onClick={addSale}
        >
          Generate Bill
        </button>

      </div>

      <hr />

      <h2>Sales Report</h2>

      <table>

        <thead>

          <tr>

            <th>Sale ID</th>
            <th>Customer</th>
            <th>Medicine</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>GST</th>
            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          {
            sales.map((s:any)=>(

              <tr key={s.SaleID}>

                <td>{s.SaleID}</td>

                <td>{s.CustomerName}</td>

                <td>{s.MedicineName}</td>

                <td>{s.Quantity}</td>

                <td>₹{s.SubTotal}</td>

                <td>₹{s.GSTAmount}</td>

                <td>₹{s.GrandTotal}</td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default Sales;