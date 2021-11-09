import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout } from "../firebase";

function Home() {
  const [user, loading, error] = useAuthState(getAuth());

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>


  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <button onClick={logout}>Log out</button>
    </div >
  );
}

export default Home;