import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, signOutUser } from "../config/firebase";

function Auth() {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user === null && <button onClick={signInWithGoogle}> Sign In</button>}
      {user !== null && (
        <>
          <p>Welcome {user.displayName}</p>
          <button onClick={signOutUser}> Sign Out</button>
        </>
      )}
    </div>
  );
}

export default Auth;
