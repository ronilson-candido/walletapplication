// src/components/Home.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    navigate('/add-card');
  };

  const getCardFlag = (number) => {
    if (number.startsWith('4')) {
      return 'https://logopng.com.br/logos/visa-17.png';
    } else if (number.startsWith('5')) {
      return 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/BR-PT/mcbc_refeicao-rev_84px.png';
    }
    return 'https://credittis.com.br/wp-content/uploads/2023/07/1-edited.png'; 
  };

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
        <h1>
          <span style={{ color: '#007bff' }}>Carteira</span> 
          <span style={{ color: '#f57c00' }}>Digital</span>
        </h1>
        <ButtonContainer>
          <Button onClick={handleAddCard}>Adicionar Cartão</Button>
        </ButtonContainer>
        {cards.length > 0 ? (
          <CardList>
            {cards.map((card, index) => (
              <Card key={index}>
                <CardTop>
                  <CardNumber>{card.number}</CardNumber>
                  <CardFlag src={getCardFlag(card.number)} alt="Bandeira do Cartão" />
                </CardTop>
                <CardBottom>
                  <CardHolder>{card.cardHolder}</CardHolder>
                  <CardDetails>
                    <Detail>Validade: {card.expiryDate}</Detail>
                    <Detail>CVV: {card.cvv}</Detail>
                  </CardDetails>
                </CardBottom>
                <RemoveButton onClick={() => handleRemoveCard(index)}>Remover</RemoveButton>
              </Card>
            ))}
          </CardList>
        ) : (
          <p>Nenhum cartão adicionado.</p>
        )}
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

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CardList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #003366, #3399ff);
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardNumber = styled.h3`
  margin: 0;
  font-size: 20px;
  letter-spacing: 2px;
`;

const CardFlag = styled.img`
  width: 40px;
  height: 30px;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHolder = styled.p`
  margin: 0;
  font-size: 16px;
`;

const CardDetails = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const Detail = styled.p`
  margin: 0;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 80px;
  right: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

export default Home;