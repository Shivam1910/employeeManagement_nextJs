import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Router from "next/router";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [person, setPerson] = useState();

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4500/", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("Token")),
        },
      });
      const data = response.data;

      if (data.name === "JsonWebTokenError") {
        Router.push("/SignUp");
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("Token")),
        },
      });
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = () => {
    setPerson(JSON.parse(localStorage.getItem("User")));
  };

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  return (
    <>
      <Header />

      {person?.Name && (
        <div className="flex justify-center items-center min-h-[50vh] flex-col">
          {products.length > 0 ? (
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="p-2">Emplyee Name</th>
                  <th className="p-2">Salary</th>
                  <th className="p-2">Customization</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="text-center" key={product._id}>
                    <td className="border-2 border-green-500 p-2">
                      {product.PName}
                    </td>
                    <td className="border-2 border-green-500 p-2">
                      {product.PPrice}
                    </td>
                    <td className="border-2 border-green-500 p-1">
                      <Link href={`/update/${product._id}`}>
                        <button className="p-1 m-0 mx-1 rounded-none bg-yellow-500">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteUser(product._id)}
                        className="p-1 m-0 mx-1 bg-red-500 rounded-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Employee to Display</p>
          )}
        </div>
      )}
    </>
  );
}
