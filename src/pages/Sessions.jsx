import { useState } from "react";
// Components
import Session from "../components/Session";
import LogIn from "../components/loginComp/LogIn";
import facade from "../util/apiFacade";

function Sessions() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        facade.login(username, password).then(() => {
            setLoggedIn(true);
            setUser({ username }); // Assuming the API returns the logged-in username
        });
    };

    const logout = () => {
        facade.logout();
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <div>
            {!loggedIn ? (
                <LogIn login={login} />
            ) : (
                <div>
                    <Session user={user} />
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Sessions;
