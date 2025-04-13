import { useEffect, useState } from "react";
import { getUsers } from "./api";
import { Link } from "react-router-dom";
import RemoveUser from "./RemoveUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log("Users data:", data);
        setUsers(data);
      } catch (error) {
        setError(error.message || "Failed to fetch users.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users Registered</h2>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.user_id || user.id}>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>{user.status}</span>
              <span>{user.phone}</span>
              <span>{new Date(user.createdAt).toLocaleString()}</span>

              <Link to={`/users/update/${user.user_id || user.id}`}>
                <button>Edit</button>
              </Link>

              <RemoveUser
                id={user.user_id || user.id}
                setErrorMessage={setError}
              />
            </li>
          ))
        ) : (
          <p>No users found!</p>
        )}
      </ul>
    </div>
  );
};

export default Users;
