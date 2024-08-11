import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context/Context';
import logo from '../assets/defaultlogo.png'
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const P = styled.h1`
  height: 50px;
  margin: 0.5rem 2rem 0 2rem;
  padding: 10px 10px;
  color: #b4b4b4;
  font-size: 1.5rem;
  font-weight: 600;
  &:hover {
    background: #676767;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
  }
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  margin: 0.5rem 2rem 0 2rem;
  padding: 10px 10px;
  border-radius: 50%;
  cursor: pointer;
`;

const Username = styled.p`
  color: #b4b4b4;
  font-size: 1rem;
  margin: 0 -1rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
`;

const Navbar = () => {
  const { username, photo } = useContext(Context);

  const photoUrl = photo ? `http://localhost:5000/uploads/${photo}` : logo;

  return (
    <SubContainer>
      <P>Verbiqube</P>
      <div style={{ display: "flex", alignItems: "center" }}>
        {username && <Username>{username}</Username>}
        <Img src={photoUrl} alt='user photo' />
      </div>
    </SubContainer>
  );
};

export default Navbar;
