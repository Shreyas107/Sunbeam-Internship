import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginStaff } from "../services/staffService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await loginStaff(email, password);

      if (result.status === "success") {
        toast.success("Login successful.");
      }
    } catch (error) {
      toast.error(error);
      console.log("error: ", error);
    }
  };
  return (
    <>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
