import React, { useEffect, useState } from 'react';


function TraningSessions() {
    const { user } = useUser();
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
 


  

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

    useEffect(() => {
        if (user) {
            fetch('https://rouvii.dk/api/sessions')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch sessions');
                    }
                    return response.json();
                })
                .then((data) => {
                    const userSessions = data.filter(session => session.user.username === user.username);
                    setSessions(userSessions);
                })
                .catch((err) => setError(err.message));
        }
    }, [user]);

    if (!user) {
        return <p>Please log in to see your sessions.</p>;
    }

    if (error) {
        return <p>Error fetching sessions: {error}</p>;
    }
  useEffect(() => {
    const token = facade.getToken();
    if (token) {
      setLoggedIn(true);
      setUser({ username: token }); // Assuming the token contains the username
    }
  }, []);

    return (
        <div>
            <h1>{user.username}'s Training Sessions</h1>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>Session #{session.id}</li>
                    
                ))}
            </ul>
        </div>
    );
  return (
    <div>
     
        <div>
          <Session user={user} />
          <button onClick={logout}>Logout</button>
        </div>
    
    </div>
  );
}

export default TraningSessions;
