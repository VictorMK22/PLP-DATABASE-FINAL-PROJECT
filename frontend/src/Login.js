import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setErrorMessage("");

      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          values,
          {
            // Your backend API base URL
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="content">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
