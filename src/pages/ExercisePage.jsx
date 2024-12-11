import React, { useEffect, useState } from "react";
import styled from "styled-components";

const API_URL = "https://rouvii.dk/api/exercises"; // Replace with your actual API URL

// Enum for muscle groups
const MuscleGroups = {
  ALL: "All",
  BICEPS: "BICEPS",
  TRICEPS: "TRICEPS",
  CHEST: "CHEST",
  BACK: "BACK",
  LEGS: "LEGS",
  SHOULDERS: "SHOULDERS",
  ABS: "ABS",
  CALVES: "CALVES",
  FOREARMS: "FOREARMS",
};

function ExercisePage() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(MuscleGroups.ALL);

  useEffect(() => {
    // Fetch exercises from API
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExercises();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredExercises = exercises.filter((exercise) => {
    return filter === MuscleGroups.ALL || exercise.muscleGroup === filter;
  });

  if (error) {
    return <ErrorMessage>Failed to load exercises: {error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <Title>All Exercises</Title>
      <FilterContainer>
        <label htmlFor="muscleGroupFilter">Filter by Muscle Group:</label>
        <FilterSelect
          id="muscleGroupFilter"
          value={filter}
          onChange={handleFilterChange}
        >
          {Object.values(MuscleGroups).map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </FilterSelect>
      </FilterContainer>
      <ExerciseList>
        {filteredExercises.length === 0 ? (
          <LoadingMessage>No exercises found for this filter.</LoadingMessage>
        ) : (
          filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id}>
              <h2>{exercise.name}</h2>
              <p>
                <strong>Description:</strong> {exercise.description}
              </p>
              <p>
                <strong>Muscle Group:</strong> {exercise.muscleGroup}
              </p>
            </ExerciseCard>
          ))
        )}
      </ExerciseList>
    </PageContainer>
  );
}

export default ExercisePage;

// Styled Components
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #4c5c63;
`;

const FilterContainer = styled.div`
  margin: 20px 0;
  text-align: center;

  label {
    margin-right: 10px;
    font-weight: bold;
    color: #4c5c63;
  }
`;

const FilterSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  font-size: 16px;
`;

const ExerciseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ExerciseCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0 0 10px;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #4c5c63;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;
