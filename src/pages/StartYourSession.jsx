import React, { useState, useEffect } from 'react';
import ExerciseForm from '../components/ExerciseForm';

const StartYourSession = () => {
  const [session, setSession] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch exercises from the API
    fetch('https://rouvii.dk/api/exercises')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  const handleAddExercise = (exerciseData) => {
    setSession([...session, exerciseData]);
  };

  const handleLogSession = () => {
    console.log('Session logged:', session);
    // Add logic to save the session
    setSession([]);
  };

  return (
    <div>
      <h1>Start Your Training Session</h1>
      <ExerciseForm exercises={exercises} onAddExercise={handleAddExercise} />
      <button onClick={handleLogSession}>Log Session</button>
      <div>
        <h2>Current Session</h2>
        <ul>
          {session.map((item, index) => (
            <li key={index}>
              {item.exercise} - {item.weight} kg - {item.reps} reps
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StartYourSession;