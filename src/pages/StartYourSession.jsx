import React, { useState, useEffect } from 'react';

const StartYourSession = () => {
  const [exercises, setExercises] = useState([]); // All exercises fetched from the API
  const [trainingSession, setTrainingSession] = useState([]); // Selected exercises for the session

  useEffect(() => {
    // Fetch exercises from the API on component mount
    fetch('https://rouvii.dk/api/exercises')
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error('Error fetching exercises:', error));
  }, []);

  // Add an exercise to the training session
  const handleAddExerciseToSession = (exercise) => {
    // Prevent duplicates
    if (!trainingSession.some((e) => e.id === exercise.id)) {
      setTrainingSession((prevSession) => [...prevSession, exercise]);
    } else {
      console.log('Exercise already added to the session:', exercise.name);
    }
  };

  // Remove an exercise from the training session (optional feature)
  const handleRemoveExerciseFromSession = (index) => {
    setTrainingSession((prevSession) => prevSession.filter((_, i) => i !== index));
  };

  // Log the session (send it to the backend or just clear the session)
  const handleLogSession = () => {
    console.log('Training session logged:', trainingSession);

    // Get token from localStorage
    const token = localStorage.getItem('jwtToken');

    // Example: Save the session to the backend
    fetch('https://rouvii.dk/api/training-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ exercises: trainingSession }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to log the session');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Session saved successfully:', data);
        setTrainingSession([]); // Clear the session after saving
      })
      .catch((error) => console.error('Error logging session:', error));
  };

  return (
    <div>
      <h1>Start Your Training Session</h1>

      <div>
        <h2>Available Exercises</h2>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>
              <button onClick={() => handleAddExerciseToSession(exercise)}>
                Add
              </button>
              {exercise.name} ({exercise.type})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Training Session</h2>
        <ul>
          {trainingSession.map((exercise, index) => (
            <li key={index}>
              {exercise.name} ({exercise.type})
              <button onClick={() => handleRemoveExerciseFromSession(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        {trainingSession.length > 0 && (
          <button onClick={handleLogSession}>Log Training Session</button>
        )}
      </div>
    </div>
  );
};

export default StartYourSession;