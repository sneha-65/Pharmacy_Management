import { useEffect, useState } from "react";
import API from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({

    name: "",
    phone: "",
    address: "",
    email: ""

  });

  const loadCustomers = async () => {

    const response = await API.get("/customers");

    setCustomers(response.data);
  };

  const addCustomer = async () => {

    await API.post("/addCustomer", {

      name: form.name,
      phone: form.phone,
      address: form.address,
      email: form.email

    });

    setForm({

      name: "",
      phone: "",
      address: "",
      email: ""

    });

    loadCustomers();
  };

  const deleteCustomer = async (id:number) => {

    await API.delete(`/deleteCustomer/${id}`);

    loadCustomers();
  };

  useEffect(() => {

    loadCustomers();

  }, []);

  return (

    <div>

      <h1>
        Customer Management
      </h1>

      <div
        style={{
          background:"#fff",
          padding:"20px",
          borderRadius:"15px",
          marginBottom:"30px"
        }}
      >

        <h3>Add Customer</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

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

        <button
          onClick={addCustomer}
        >
          Add Customer
        </button>

      </div>
      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            customers
            .filter((c:any) =>
              c.CustomerName
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((c:any) => (

              <tr
                key={c.CustomerID}
              >

                <td>
                  {c.CustomerID}
                </td>

                <td>
                  {c.CustomerName}
                </td>

                <td>
                  {c.Phone}
                </td>

                <td>
                  {c.Email}
                </td>

                <td>

                  <button
                    onClick={()=>
                      deleteCustomer(
                        c.CustomerID
                      )
                    }
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

export default Customers;