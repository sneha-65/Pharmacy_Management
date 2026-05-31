import { useState } from "react";
import API from "../services/api";

function Login() {

  const [username,setUsername] =
  useState("");

  const [password,setPassword] =
  useState("");

  const login = async()=>{

    const response =
    await API.post("/login",{

      username,
      password

    });

    localStorage.setItem(

      "token",

      response.data.token

    );

    localStorage.setItem(

      "role",

      response.data.role

    );

    window.location.href="/";
  };

  return(

    <div>

      <h1>Pharmacy ERP Login</h1>

      <input
      placeholder="Username"
      value={username}
      onChange={(e)=>
      setUsername(
        e.target.value
      )}
      />

      <br /><br />

      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>
      setPassword(
        e.target.value
      )}
      />

      <br /><br />

      <button
      onClick={login}
      >
        Login
      </button>

    </div>

  );
}

export default Login;