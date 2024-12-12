import React, { useState } from 'react';

const ExerciseForm = ({ exercises, onAddExercise }) => {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExercise({ exercise, weight, reps });
    setExercise('');
    setWeight('');
    setReps('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Exercise:
          <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
            <option value="">Select an exercise</option>
            {exercises.map((ex, index) => (
              <option key={index} value={ex.name}>{ex.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default ExerciseForm;