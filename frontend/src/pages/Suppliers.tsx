import { useState } from "react";
import API from "../services/api";

function Suppliers() {

  const [suppliers,setSuppliers] = useState<any[]>([]);

  const [form,setForm] = useState({

    supplierName:"",
    contactPerson:"",
    phone:"",
    email:"",
    address:""

  });

  const loadSuppliers = async()=>{

    const response =
    await API.get("/suppliers");

    setSuppliers(response.data);
  };

  const addSupplier = async()=>{

    await API.post(
      "/addSupplier",
      form
    );

    setForm({
      supplierName:"",
      contactPerson:"",
      phone:"",
      email:"",
      address:""
    });

    loadSuppliers();
  };

  return(

    <div>

      <h1>
        Supplier Management
      </h1>

      {/* Form */}
      <div>

        <input
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={(e)=>
            setForm({
              ...form,
              supplierName:e.target.value
            })
          }
        />

        <br /><br />

        <input
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={(e)=>
            setForm({
              ...form,
              contactPerson:e.target.value
            })
          }
        />

        <br /><br />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e)=>
            setForm({
              ...form,
              phone:e.target.value
            })
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <br /><br />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e)=>
            setForm({
              ...form,
              address:e.target.value
            })
          }
        />

        <br /><br />

        <button onClick={addSupplier}>
          Add Supplier
        </button>

      </div>

      <hr />

      <h2>Supplier List</h2>

      {
        suppliers.map((supplier:any)=>(

          <div
            key={supplier.SupplierID}
            style={{
              border:"1px solid gray",
              padding:"10px",
              marginBottom:"10px"
            }}
          >

            <h3>{supplier.SupplierName}</h3>

            <p>{supplier.ContactPerson}</p>

            <p>{supplier.Phone}</p>

            <p>{supplier.Email}</p>

            <p>{supplier.Address}</p>

          </div>

        ))
      }

      {/* Supplier List */}

    </div>

  );
}

export default Suppliers;