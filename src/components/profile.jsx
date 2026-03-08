import { useAuth } from "../contextAPI/authProvider";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p>No user logged in</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
    </div>
  );
};

export default Profile;