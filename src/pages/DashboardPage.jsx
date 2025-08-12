import PostList from "../components/PostList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [user] = useAuthState(auth);
  return (
    <>
      <p>Hi {user.displayName}</p>
      <PostList />
      <Link to="/homePage">
        <button>Home</button>
      </Link>
    </>
  );
}

export default DashboardPage;
