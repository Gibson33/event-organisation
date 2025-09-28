import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export default function Help() {
  const { state } = useContext(AuthContext);

  return (
    <div className="page-content">
      <h2>Help</h2>
      <p>
        {state.isLoggedIn
          ? "You’re logged in — contact support if you have issues with your events."
          : "Please log in or sign up before asking for help."}
      </p>
    </div>
  );
}
