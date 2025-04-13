import { useNavigate } from "react-router-dom";
import axios from "axios";

const RemoveUser = ({ id, setErrorMessage }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      alert("User deleted successfully!");
      navigate("/users");
    } catch (error) {
      setErrorMessage("Error deleting user.");
      console.error("Error occurred:", error);
    }
  };

  return <button onClick={handleDelete}>Delete User</button>;
};

export default RemoveUser;
