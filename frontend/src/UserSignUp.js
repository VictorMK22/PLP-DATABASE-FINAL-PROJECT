import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
      status: "active",
    },
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("User created successfully!");
        navigate("/login");
      } catch (error) {
        setErrorMessage("Error registering user.");
        console.log("Error Occurred:", error);
      }
    },
  });

  return (
    <div className="content register">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formik.values.username}
          onChange={formik.handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />

        <select
          onChange={formik.handleChange}
          name="role"
          value={formik.values.role}
          id="role"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
        <select
          onChange={formik.handleChange}
          name="status"
          value={formik.values.status}
          id="status"
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
