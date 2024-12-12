import { useState } from "react";
import styled from "styled-components";
import facade from "../../util/apiFacade";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <Container>
      <Title>Login</Title>
      <form onSubmit={performLogin}>
        <InputField>
          <Input
            placeholder="Username"
            id="username"
            onChange={onChange}
            value={loginCredentials.username}
          />
        </InputField>
        <InputField>
          <Input
            placeholder="Password"
            id="password"
            onChange={onChange}
            value={loginCredentials.password}
          />
        </InputField>
        <Button type="submit">Login</Button>
      </form>
    
    </Container>
  );
}

export default LogIn;

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  padding: 0 20px;
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
