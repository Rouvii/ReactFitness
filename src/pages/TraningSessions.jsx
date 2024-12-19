import React, { useEffect, useState } from 'react';
import facade from '../util/apiFacade';

function TraningSessions() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Effekt for at tjekke om brugeren er logget ind
  useEffect(() => {
    const token = facade.getToken();
    if (token) {
      setLoggedIn(true);
    }
  }, []);  // Dette hook køres kun én gang ved første render

  // Effekt for at hente sessioner
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
  }, [user]); // Hvis user ændres, hentes sessioner igen

  // Hvis brugeren ikke er logget ind, vis en besked
  if (!user) {
    return <p>Please log in to see your sessions.</p>;
  }

  // Hvis der er en fejl ved at hente sessioner
  if (error) {
    return <p>Error fetching sessions: {error}</p>;
  }

  return (
    <div>
      <h1>{user.username}'s Training Sessions</h1>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        sessions.map((session) => (
          <div key={session.id}>
            <h2>Session #{session.id}</h2>
            {session.exercises && session.exercises.length > 0 ? (
              session.exercises.map((exercise) => (
                <div key={exercise.id}>
                  <h3>{exercise.name} ({exercise.muscleGroup})</h3>
                  <p>{exercise.description}</p>
                  <h4>Sets:</h4>
                  <ul>
                    {exercise.sets.map((set) => (
                      <li key={set.id}>
                        Set {set.id}: {set.reps} reps, {set.weight} kg
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No exercises in this session.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TraningSessions;
