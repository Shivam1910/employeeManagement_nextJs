import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Router from "next/router";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (product.name && product.price) {
      try {
        const response = await axios.post(
          "http://localhost:4500/add-product",
          product,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: JSON.parse(localStorage.getItem("Token")),
            },
          }
        );
        if (response.data.name === "JsonWebTokenError") {
          Router.push("/SignUp");
        } else {
          Router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please provide complete data");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("User")) {
      Router.push("/Login");
    }
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="flex flex-col min-h-[50vh] w-full justify-center items-center">
          <form
            className="px-2 flex flex-col w-max justify-center items-center"
            onSubmit={handleAdd}
          >
            <p className="my-5 bg-[#9b59b6] text-white w-full text-center py-2">
              Add Employee
            </p>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Employee Name"
              name="name"
              value={product.name}
            />
            <input
              onChange={handleInputChange}
              type="number"
              placeholder="Salary"
              name="price"
              value={product.price}
            />
            <button type="submit">Add Employee</button>
          </form>
        </div>
      </div>

    </>
  );
};

export default AddProduct;
