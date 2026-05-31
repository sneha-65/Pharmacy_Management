import { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {

  const [report,setReport] = useState<any>({});

  const loadReport = async()=>{

    const response =
    await API.get("/reports");

    setReport(response.data);
  };

  useEffect(()=>{

    loadReport();

  },[]);

  return(

    <div>

      <h1>Business Reports</h1>

      <h2>
        Total Sales:
        {report.TotalSales}
      </h2>

      <h2>
        Revenue:
        ₹{report.Revenue}
      </h2>

    </div>

  );
}

export default Reports;