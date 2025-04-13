import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "", // Ensure backend handles empty password correctly
      role: "user",
      status: "active",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await axios.put(
          `http://localhost:5000/users/${id}`,
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        alert("User updated successfully!");
        console.log(response);
        navigate("/users");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Error updating user."
        );
        console.log("Error occurred", error);
      }
    },
  });

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/users/${id}`);
        formik.setValues({
          username: data.username,
          email: data.email,
          phone: data.phone,
          role: data.role,
          status: data.status,
          password: "", // Password shouldn't be fetched
        });
        setLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch user details.");
        console.log("Error occurred", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="content update-user">
      <h2>Update User</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
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
          placeholder="Password (Leave empty to keep the same)"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <select
          onChange={formik.handleChange}
          name="role"
          value={formik.values.role}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          onChange={formik.handleChange}
          name="status"
          value={formik.values.status}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
