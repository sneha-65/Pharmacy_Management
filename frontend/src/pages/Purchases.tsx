import { useEffect, useState } from "react";
import API from "../services/api";

function Purchases() {

  const [suppliers,setSuppliers] = useState<any[]>([]);
  const [medicines,setMedicines] = useState<any[]>([]);

  const [form,setForm] = useState({

    supplierID:"",
    medicineID:"",
    quantity:"",
    purchasePrice:""

  });

  const loadData = async()=>{

    const s = await API.get("/suppliers");
    const m = await API.get("/medicines");

    setSuppliers(s.data);
    setMedicines(m.data);
  };

  const addPurchase = async()=>{

    await API.post("/addPurchase",{

      supplierID:Number(form.supplierID),
      medicineID:Number(form.medicineID),
      quantity:Number(form.quantity),
      purchasePrice:Number(form.purchasePrice)

    });

    alert("Purchase Added");

    loadData();
  };

  useEffect(()=>{

    loadData();

  },[]);

  return(

    <div>

      <h1>Purchase Medicines</h1>

      <select
      value={form.supplierID}
      onChange={(e)=>
      setForm({
        ...form,
        supplierID:e.target.value
      })}
      >

        <option>
          Select Supplier
        </option>

        {
          suppliers.map((s:any)=>(

            <option
            key={s.SupplierID}
            value={s.SupplierID}
            >
              {s.SupplierName}
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

        <option>
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
      placeholder="Quantity"
      value={form.quantity}
      onChange={(e)=>
      setForm({
        ...form,
        quantity:e.target.value
      })}
      />

      <br /><br />

      <input
      placeholder="Purchase Price"
      value={form.purchasePrice}
      onChange={(e)=>
      setForm({
        ...form,
        purchasePrice:e.target.value
      })}
      />

      <br /><br />

      <button onClick={addPurchase}>
        Purchase Stock
      </button>

    </div>
  );
}

export default Purchases;