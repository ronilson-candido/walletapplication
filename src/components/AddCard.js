// src/components/AddCard.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const encrypt = (data) => {
  return btoa(data); 
};

const decrypt = (data) => {
  return atob(data); 
};

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState(""); 
  const navigate = useNavigate();

  const handleAddCard = () => {
    const card = {
      number: encrypt(cardNumber),
      expiryDate: encrypt(expiryDate),
      cvv: encrypt(cvv),
      cardHolder: encrypt(cardHolder),
    };

    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    savedCards.push(card);
    localStorage.setItem('cards', JSON.stringify(savedCards));

    navigate('/home');
  };

  return (
    <Container>
      <CardPreview>
        <Card>
          <CardTop>
            <CardNumber>{cardNumber || '1234 5678 1234 5678'}</CardNumber>
          </CardTop>
          <CardBottom>
            <CardHolder>{cardHolder || 'Nome do Titular'}</CardHolder>
            <CardDetails>
              <Detail>Validade: {expiryDate || 'MM/AA'}</Detail>
              <Detail>CVV: {cvv || '123'}</Detail>
            </CardDetails>
          </CardBottom>
        </Card>
      </CardPreview>
      <Title>Adicionar Cartão de Crédito</Title>
      <CardForm>
        <Label htmlFor="cardHolder">Nome do Titular</Label>
        <Input
          id="cardHolder"
          type="text"
          placeholder="Nome Completo"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
        
        <Label htmlFor="cardNumber">Número do Cartão</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 1234 5678"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        
        <Label htmlFor="expiryDate">Data de Validade</Label>
        <Input
          id="expiryDate"
          type="text"
          placeholder="MM/AA"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        
        <Label htmlFor="cvv">Código de Segurança (CVV)</Label>
        <Input
          id="cvv"
          type="text"
          placeholder="123"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        
        <Button onClick={handleAddCard}>Adicionar Cartão</Button>
      </CardForm>
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
  padding: 20px;
`;

const CardPreview = styled.div`
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #003366, #3399ff);
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardNumber = styled.h3`
  margin: 0;
  font-size: 20px;
  letter-spacing: 2px;
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

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const CardForm = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px;
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

export default AddCard;
