import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOutUser } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <p>Welcome to Community Wall</p>
      {user !== null && (
        <>
          <p>Welcome {user.displayName}</p>
          <button onClick={signOutUser}> Sign Out</button>
        </>
      )}

      <button onClick={handleDashboard}>Dashboard</button>
    </div>
  );
}
export default HomePage;
