const URL = "https://rouvii.dk/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", false, {
      username: user,
      password: password,
    });
    return fetch(URL + "/auth/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

const register = (user, password) => {
    const options = makeOptions("POST", false, {
      username: user,
      password: password,
    });
    return fetch(URL + "/auth/register", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
    });
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); // True adds the token
    return fetch(URL + "/sessions", options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["Authorization"] = "Bearer " + getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  
  const getUsername = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const name = decodedClaims.sub;
      return name;
    } else return "";
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(",");
    return loggedIn && roles.includes(neededRole);
  };

  return {
    login,
    logout,
    fetchData,
    register,
    getToken,
    loggedIn,
    getUsername,
    getUserRoles,
    hasUserAccess,
    makeOptions,
  };
}

const facade = apiFacade();
export default facade;
