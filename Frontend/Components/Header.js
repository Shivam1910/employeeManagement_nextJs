import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setUser(null);
    router.push("/Login");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  return (
    <div className="flex justify-between bg-[#34495e] text-[#ecf0f1] p-3">
      <div className="Left flex list-none space-x-3">
        <Link href="/">
          <li>Employee Crud</li>
        </Link>
        {user && (
          <Link href="/add-product">
            <li>Add Employee</li>
          </Link>
        )}
      </div>
      <div className="Right flex list-none space-x-3">
        {!user ? (
          <>
            <Link href="/SignUp">
              <li>Sign Up</li>
            </Link>
            <Link href="/Login">
              <li>Log In</li>
            </Link>
          </>
        ) : (
          <>
            <li>{user.Name}</li>
            <li onClick={signOut}>Sign Out</li>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
