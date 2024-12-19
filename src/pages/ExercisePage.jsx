import React, { useEffect, useState } from "react";
import styled from "styled-components";
import facade from "../util/apiFacade"; // Make sure the apiFacade is properly configured

const API_URL = "https://rouvii.dk/api/exercises"; // Your API URL

function ExercisePage() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold the selected category
  const [categories, setCategories] = useState([]); // State to hold the list of categories

  // Fetch exercises and categories on mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = facade.getToken(); // Retrieve the token from apiFacade
        if (!token) {
          throw new Error("No token found. Please login first.");
        }

        // Log token to check if it's correct
        console.log("Token:", token);

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include", // If you're sending cookies
        });

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExercises(data); // Set exercises if the request is successful

        // Get unique categories from exercises
        const uniqueCategories = [
          ...new Set(data.map((exercise) => exercise.muscleGroup)),
        ];
        setCategories(uniqueCategories); // Set unique categories
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message); // Display error if any
      }
    };

    fetchExercises();
  }, []); // This will run only once when the component mounts

  // Filter exercises based on selected category
  const filteredExercises = selectedCategory
    ? exercises.filter((exercise) => exercise.muscleGroup === selectedCategory)
    : exercises;

  if (error) {
    return <ErrorMessage>Failed to load exercises: {error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <Title>All Exercises</Title>

      {/* Category Filter */}
      <FilterContainer>
        <label htmlFor="category">Filter by Muscle Group: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </FilterContainer>

      <ExerciseList>
        {filteredExercises.length === 0 ? (
          <LoadingMessage>Loading exercises...</LoadingMessage>
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
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    margin-right: 10px;
    font-weight: bold;
  }

  select {
    padding: 5px;
    font-size: 16px;
    border-radius: 5px;
  }
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
