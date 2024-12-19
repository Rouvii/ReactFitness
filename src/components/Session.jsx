import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

function Session({ user }) {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Få username fra user prop eller location state
  const { username } = user || location.state || { username: "" };

  // Brug useEffect til at hente sessioner, men gør det kun, hvis username findes
  useEffect(() => {
    if (!username) return; // Stop, hvis username ikke findes

    const fetchSessions = async () => {
      try {
        const response = await fetch("https://rouvii.dk/api/sessions");
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        const userSessions = data.filter(
          (session) => session.user?.username === username
        );
        setSessions(userSessions);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
  }, [username]);

  // Hvis username ikke findes, vis en besked
  if (!username) {
    return <p>Please log in to see your sessions.</p>;
  }

  // Hvis der er en fejl, vis fejlbesked
  if (error) {
    return <p>Error fetching sessions: {error}</p>;
  }

  // Render sessioner, hvis alt er okay
  return (
    <div>
      <h1>{username}'s Training Sessions</h1>
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
