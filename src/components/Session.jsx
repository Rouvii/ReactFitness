import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

function Session({ user }) {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
 // const { username } = location.state || { username: "" };

  useEffect(() => {
    if (username) {
      fetch("https://rouvii.dk/api/sessions")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch sessions");
          }
          return response.json();
        })
        .then((data) => {
          const userSessions = data.filter(
            (session) => session.user?.username === user.username
          );
          setSessions(userSessions);
        })
        .catch((err) => setError(err.message));
    }
  }, [username]);

  if (!user) {
    return <p>Please log in to see your sessions.</p>;
  }

  if (error) {
    return <p>Error fetching sessions: {error}</p>;
  }

  return (
    <div>
      <h1>{user.username}'s Training Sessions</h1>
      <ul>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <li key={session.id}>
              <h2>Session #{session.id}</h2>
              <h3>Exercises:</h3>
              <ul>
                {session.exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <h4>
                      {exercise.name} ({exercise.muscleGroup})
                    </h4>
                    <p>{exercise.description}</p>
                    <h5>Sets:</h5>
                    <ul>
                      {exercise.sets.map((set) => (
                        <li key={set.id}>
                          Reps: {set.reps}, Weight: {set.weight}kg
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No sessions found.</p>
        )}
      </ul>
    </div>
  );
}

export default Session;
