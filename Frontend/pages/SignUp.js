import React, { useState } from 'react'
import Router from 'next/router'
import Header from '../Components/Header'
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      try {
        const response = await axios.post('http://localhost:4500/register', {
          Name: name,
          Email: email,
          Password: password,
        });

        const data = response.data;
        localStorage.setItem('User', JSON.stringify(data.Result));
        localStorage.setItem('Token', JSON.stringify(data.Token));
        Router.push('/');
      } catch (error) {
        console.error(error);
        alert('An error occurred while signing up');
      }
    } else {
      alert('Provide Complete Data');
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <form className="signup-form" onSubmit={handleSignUp}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          margin-top: 25px;
          display: flex;
          justify-content: center;
          align-items: top;
          height: 70vh;
        }

        .signup-form {
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

        input[type="text"],
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
}

export default SignUp;
