import React, { useState } from "react";
import Router from "next/router";
import Header from "../Components/Header";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:4500/login", {
          Email: email,
          Password: password,
        });

        const data = response.data;

        if (data?.Error) {
          if (data.Error === "No Account Available") {
            Router.push("/SignUp");
          } else {
            alert(data.Error);
          }
        } else {
          localStorage.setItem("User", JSON.stringify(data.Result));
          localStorage.setItem("Token", JSON.stringify(data.Token));
          Router.push("/");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while logging in");
      }
    } else {
      alert("Provide Complete Data");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          margin-top: 25px;
          display: flex;
          justify-content: center;
          align-items: top;
          height: 55vh;
        }

        .login-form {
          width: 300px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f8f8f8;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: #4caf50;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Login;
