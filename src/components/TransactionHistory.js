import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleGeneratePDF = (transaction) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Comprovante de Transação", 20, 20);

    doc.setFontSize(12);
    doc.text(`Email do Destinatário: ${transaction.email}`, 20, 40);
    doc.text(`Quantia Enviada: ${transaction.amount}`, 20, 60);
    doc.text(`Data: ${transaction.date}`, 20, 80);

    doc.save("comprovante_transacao.pdf");
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Title>Histórico de Transações</Title>
      {transactions.length === 0 ? (
        <NoTransactions>Sem transações para exibir</NoTransactions>
      ) : (
        <TransactionList>
          {transactions.map((transaction, index) => (
            <TransactionItem key={index}>
              <div>
                <p><strong>Email:</strong> {transaction.email}</p>
                <p><strong>Quantia:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}</p>
                <p><strong>Data:</strong> {transaction.date}</p>
              </div>
              <ButtonContainer>
                <ActionButton onClick={() => handleGeneratePDF(transaction)}>Gerar PDF</ActionButton>
                <ActionButton onClick={() => handleDelete(index)}>Excluir</ActionButton>
              </ButtonContainer>
            </TransactionItem>
          ))}
        </TransactionList>
      )}
      <BackButton onClick={handleBack}>Voltar à Página Inicial</BackButton>
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

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const NoTransactions = styled.p`
  font-size: 18px;
  color: #333;
`;

const TransactionList = styled.div`
  width: 100%;
  max-width: 600px;
`;

const TransactionItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:first-of-type {
    background-color: #007bff;
    &:hover {
      background-color: #0056b3;
    }
  }
  &:last-of-type {
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
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

export default TransactionHistory;
