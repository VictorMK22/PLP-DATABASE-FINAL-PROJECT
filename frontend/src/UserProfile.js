import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to see your profile.</div>;
  }

  return (
    <div className="content">
      <h2>User Profile</h2>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default UserProfile;
