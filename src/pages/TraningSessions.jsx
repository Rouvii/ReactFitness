import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import facade from '../util/apiFacade';

const API_URL = "https://rouvii.dk/api/sessions"; // Your API URL

function TraningSessions() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Effect to check if the user is logged in
  useEffect(() => {
    const token = facade.getToken();
    if (token) {
      setLoggedIn(true);
    }
  }, []); // This hook runs only once at the first render

  // Effect to fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      if (user) {
        try {
          const token = facade.getToken(); // Retrieve the token from apiFacade
          if (!token) {
            throw new Error('No token found. Please login first.');
          }

          // Log token to check if it's correct
          console.log('Token:', token);

          const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Send token in the Authorization header
            },
            credentials: 'include', // If you're sending cookies or credentials
          });

          // Check if the response is OK
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const userSessions = data.filter(session => session.user.username === user.username); // Filter sessions based on logged-in user
          setSessions(userSessions); // Set sessions if the request is successful
        } catch (err) {
          console.error('Error:', err.message);
          setError(err.message); // Display error if any
        }
      }
    };

    fetchSessions(); // Fetch sessions on component mount

  }, [user]); // Fetch sessions again if the user changes

  // If the user is not logged in, show a message
  if (!user) {
    return <p>Please log in to see your sessions.</p>;
  }

  // If there's an error fetching sessions
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
