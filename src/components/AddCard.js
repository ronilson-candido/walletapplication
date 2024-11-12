import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [error, setError] = useState(null); 
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  // Factory Method para criar o cartão
  const createCard = () => {
    return {
      number: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      cardHolder: cardHolder,
    };
  };

  const handleAddCard = async () => {
    console.log("handleAddCard foi chamado");

    // Usando o Factory Method para criar o cartão
    const card = createCard();

    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    savedCards.push(card);
    localStorage.setItem('cards', JSON.stringify(savedCards));

    try {
      const response = await fetch('http://localhost:3001/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();

      if (data.success) {
        console.log("Cartão adicionado com sucesso");
        setShowPopup(true);
        setTimeout(() => {
          console.log("Redirecionando para a página inicial");
          setShowPopup(false);
          navigate('/home');
        }, 1000); 
      } else {
        setError('Erro ao adicionar cartão no backend.');
      }
    } catch (error) {
      setError('Erro ao comunicar com o backend.');
      console.error('Erro ao adicionar cartão:', error);
    }
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </CardForm>

      {showPopup && (
        <Popup>
          <PopupContent>
            <PopupText>Cartão Adicionado com Sucesso!</PopupText>
          </PopupContent>
        </Popup>
      )}
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const PopupText = styled.p`
  font-size: 18px;
  color: #333;
`;

export default AddCard;
