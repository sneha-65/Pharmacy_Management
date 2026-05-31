import { useEffect, useState } from "react";
import API from "../services/api";

function Medicines() {

  const [medicines, setMedicines] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({

    medicineName: "",
    category: "",
    manufacturer: "",
    price: "",
    expiryDate: "",
    batchNumber: "",
    stock: "",
    reorderLevel: ""

  });

  const loadMedicines = async () => {

    const response = await API.get("/medicines");

    setMedicines(response.data);
  };

  const addMedicine = async () => {

    await API.post("/addMedicine", {

      medicineName: form.medicineName,
      category: form.category,
      manufacturer: form.manufacturer,
      price: form.price,
      expiryDate: form.expiryDate,
      batchNumber: form.batchNumber,
      stock: form.stock,
      reorderLevel: form.reorderLevel

    });

    setForm({

      medicineName: "",
      category: "",
      manufacturer: "",
      price: "",
      expiryDate: "",
      batchNumber: "",
      stock: "",
      reorderLevel: ""

    });

    loadMedicines();
  };

  const deleteMedicine = async(id:number)=>{

    await API.delete(
      `/deleteMedicine/${id}`
    );

    loadMedicines();
  };

  useEffect(()=>{

    loadMedicines();

  },[]);

  return(

    <div>

      <h1>
        Medicine Management
      </h1>

      <div>

        <input
        placeholder="Medicine Name"
        value={form.medicineName}
        onChange={(e)=>
        setForm({
          ...form,
          medicineName:e.target.value
        })}
        />

        <input
        placeholder="Category"
        value={form.category}
        onChange={(e)=>
        setForm({
          ...form,
          category:e.target.value
        })}
        />

        <input
        placeholder="Manufacturer"
        value={form.manufacturer}
        onChange={(e)=>
        setForm({
          ...form,
          manufacturer:e.target.value
        })}
        />

        <input
        placeholder="Price"
        value={form.price}
        onChange={(e)=>
        setForm({
          ...form,
          price:e.target.value
        })}
        />

        <input
        type="date"
        value={form.expiryDate}
        onChange={(e)=>
        setForm({
          ...form,
          expiryDate:e.target.value
        })}
        />

        <input
        placeholder="Batch Number"
        value={form.batchNumber}
        onChange={(e)=>
        setForm({
          ...form,
          batchNumber:e.target.value
        })}
        />

        <input
        placeholder="Stock"
        value={form.stock}
        onChange={(e)=>
        setForm({
          ...form,
          stock:e.target.value
        })}
        />

        <input
        placeholder="Reorder Level"
        value={form.reorderLevel}
        onChange={(e)=>
        setForm({
          ...form,
          reorderLevel:e.target.value
        })}
        />

        <button
        onClick={addMedicine}
        >
          Add Medicine
        </button>

      </div>

      <br />

      <input
      placeholder="Search Medicine"
      value={search}
      onChange={(e)=>
      setSearch(e.target.value)}
      />

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {
            medicines

            .filter((m:any)=>

              m.MedicineName

              .toLowerCase()

              .includes(

                search.toLowerCase()

              )

            )

            .map((m:any)=>(

              <tr
              key={m.MedicineID}
              >

                <td>{m.MedicineID}</td>

                <td>{m.MedicineName}</td>

                <td>{m.Category}</td>

                <td>{m.Price}</td>

                <td>{m.CurrentStock}</td>

                <td>{m.ExpiryDate}</td>

                <td>

                  <button
                  onClick={()=>
                  deleteMedicine(
                    m.MedicineID
                  )}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );
}

export default Medicines;