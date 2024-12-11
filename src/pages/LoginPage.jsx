import { useState } from "react";
//Utils
import facade from "../util/apiFacade";

//Components
import LogIn from "../components/loginComp/LogIn";
import LoggedIn from "../components/loginComp/LoggedIn";
import Register from "./Register";
import { NavLink } from "react-router-dom";

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then(() => setLoggedIn(true));
    console.log(user, pass);
  };

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
          
        </div>
      )}
  <NavLink to="/register">Register</NavLink>
    </div>
  );
}

export default LoginPage;
