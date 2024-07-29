// src/components/Home.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth } from "firebase/auth"; 

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, [auth]);

  return (
    <Container>
      <Header>
        {user ? (
          <>
            <Greeting>Bem-vindo, {user.displayName}</Greeting>
            <ProfilePic src={user.photoURL} alt="Foto de Perfil" />
          </>
        ) : (
          <Greeting>Bem-vindo</Greeting>
        )}
      </Header>
      <Content>
        <h1>Bem-vindo ao Wallet Digital</h1>
        <p>Esta é a página inicial.</p>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Greeting = styled.h2`
  margin: 0;
  color: #333;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Content = styled.div`
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
`;

export default Home;
