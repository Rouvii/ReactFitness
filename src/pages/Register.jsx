import { useState } from "react";
import styled from "styled-components";
import facade from "../util/apiFacade";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    try {
      await facade.register(username, password);
      setMessage("Registration successful! You can now log in.");
    } catch (err) {
      const error = await err.fullError;
      setMessage(`Registration failed: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Register</Title>
        <InputField>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputField>
        <InputField>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputField>
        <Button onClick={handleRegister}>Register</Button>
        {message && <Message>{message}</Message>}
        <Footer>
          Already have an account? <Link href="/loginPage">Log in</Link>
        </Footer>
      </Card>
    </Container>
  );
}

export default Register;

// Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
 
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9); /* White with 90% opacity */
  width: 350px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
  text-align: center;
`;


const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const InputField = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #e0dcdc;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(70, 89, 96, 0.8);
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #4c5c63;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: #e74c3c;
  font-size: 14px;
`;

const Footer = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const Link = styled.a`
  color: #00cfe8;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
