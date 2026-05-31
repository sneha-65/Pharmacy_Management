import { useEffect, useState } from "react";
import API from "../services/api";

function Inventory() {

  const [inventory, setInventory] = useState<any[]>([]);

  const loadInventory = async () => {

    const response =
    await API.get("/inventory");

    setInventory(response.data);
  };

  useEffect(() => {

    loadInventory();

  }, []);

  return (

    <div>

      <h1>Inventory Management</h1>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
          </tr>

        </thead>

        <tbody>

          {inventory.map((item:any)=>(

            <tr key={item.InventoryID}>

              <td>{item.InventoryID}</td>
              <td>{item.MedicineName}</td>
              <td>{item.CurrentStock}</td>
              <td>{item.ReorderLevel}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Inventory;