import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const SubContainer = styled.div`
  background: #242424;
  min-height: 52vh;
  width: 30rem;
  border-radius: 2rem;
`;

const Input = styled.input`
  width: 70%;
  padding: 7px;
  margin: 1rem 0 1rem 0;
  border-bottom: 1px solid #fff;
  background: #242424;
  outline: none;
`;

const InputHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 70%;
  height: 50px;
  padding: 7px;
  margin: 2rem 0 0.5rem 0;
  border-radius: 29px;
  background: #fff;
  color: #242424;
  font-weight: bolder;
  font-size: 17px;
  transition: all 0.4s ease;
  &:active {
    transform: scale(0.9);
  }
`;

const Span = styled.span`
  padding: 0 0 4px 7px;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
`;

const Login = () => {
  const {photo,setPhoto}=useContext(Context)
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErrmsg] = useState('');
  const [showerrmsg, setShowErrmsg] = useState(false);
  const [allerrmsg, setallErrmsg] = useState('');
  const {setUsername}=useContext(Context)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setShowErrmsg(true);
      setallErrmsg('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/login', { email, password });
      if (response.data.success) {
        setUsername(response.data.username);
        setPhoto(response.data.photo);
        navigate('/Home');
      } else {
        setallErrmsg(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container>
      <SubContainer>
        <p style={{ fontSize: '25px', fontWeight: 'bolder', textAlign: 'center', padding: '1rem 0' }}>
          Login
        </p>
        <InputHolder>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrmsg(false);
              setallErrmsg('');
            }}
            onKeyDown={handleKeyPress}
          />
          {!email && (
            <p style={{ textAlign: "left", width: "70%", padding: "0" }}>{errmsg}</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrmsg(false);
              setallErrmsg('');
            }}
            onKeyDown={handleKeyPress}
          />
          {!password && (
            <p style={{ textAlign: "left", width: "70%", padding: "0" }}>{errmsg}</p>
          )}
          <Button onClick={handleLogin}>
            Login
          </Button>
          {allerrmsg && (
            <p style={{ margin: "1rem 0 0 0",color:"red" }}>{allerrmsg}</p>
          )}
          <p style={{ padding: "1.5rem" }}>
            Don't have an account? <Span onClick={() => navigate('/Register')}>Register</Span>
          </p>
        </InputHolder>
      </SubContainer>
    </Container>
  );
};

export default Login;