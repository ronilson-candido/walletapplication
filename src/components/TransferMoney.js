import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Estratégia de Transferência
class TransferStrategy {
  constructor(balance, transactions, setTransactions, setBalance) {
    this.balance = balance;
    this.transactions = transactions;
    this.setTransactions = setTransactions;
    this.setBalance = setBalance;
  }

  transfer(recipientEmail, amount, setLoading, setShowReceipt) {
    setLoading(true);

    if (!recipientEmail.endsWith('@gmail.com')) {
      toast.error("Só é possível transferir para contas Google.");
      setLoading(false);
      return;
    }

    const transferAmount = parseFloat(amount.replace(/[^\d]/g, '') / 100);

    if (this.balance >= transferAmount) {
      const newTransaction = {
        email: recipientEmail,
        amount: transferAmount,
        date: new Date().toLocaleString(),
      };

      const updatedTransactions = [...this.transactions, newTransaction];
      this.setTransactions(updatedTransactions);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      const newBalance = this.balance - transferAmount;
      this.setBalance(newBalance);
      localStorage.setItem('balance', JSON.stringify(newBalance));

      setShowReceipt(true);
      toast.success(`Transferência de ${amount} para ${recipientEmail} concluída com sucesso!`);
    } else {
      toast.error("Saldo insuficiente.");
    }

    setLoading(false);
  }
}

// Estratégia de Gerar PDF
class GeneratePDFStrategy {
  generatePDF(recipientEmail, amount) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Comprovante de Transferência", 20, 20);

    doc.setFontSize(12);
    doc.text(`Email do Destinatário: ${recipientEmail}`, 20, 40);
    doc.text(`Quantia Enviada: ${amount}`, 20, 60);

    doc.save("comprovante_transferencia.pdf");
  }
}

const TransferMoney = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(12000);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);

    const storedBalance = JSON.parse(localStorage.getItem('balance')) || 12000;
    setBalance(storedBalance);
  }, []);

  const transferStrategy = new TransferStrategy(balance, transactions, setTransactions, setBalance);
  const generatePDFStrategy = new GeneratePDFStrategy();

  const handleTransfer = () => {
    transferStrategy.transfer(recipientEmail, amount, setLoading, setShowReceipt);
  };

  const handleGeneratePDF = () => {
    generatePDFStrategy.generatePDF(recipientEmail, amount);
  };

  const formatAmount = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue / 100);
    return formattedValue;
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;
    setAmount(formatAmount(value));
  };

  const viewTransactionHistory = () => {
    navigate('/history');
  };

  return (
    <Container>
      <Title>Transferência via Carteira Digital</Title>
      <Balance>Saldo Atual: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}</Balance>
      {!showReceipt ? (
        <Form>
          <Label htmlFor="recipientEmail">Gmail do Destinatário</Label>
          <Input
            id="recipientEmail"
            type="email"
            placeholder="exemplo@gmail.com"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />

          <Label htmlFor="amount">Valor</Label>
          <Input
            id="amount"
            type="text"
            placeholder="R$ 0,00"
            value={amount}
            onChange={handleAmountChange}
          />

          <Button onClick={handleTransfer} disabled={loading}>
            {loading ? 'Processando...' : 'Transferir'}
          </Button>
        </Form>
      ) : (
        <Receipt>
          <h2>Comprovante de Transferência</h2>
          <p><strong>Email do Destinatário:</strong> {recipientEmail}</p>
          <p><strong>Quantia Enviada:</strong> {amount}</p>
          <ButtonContainer>
            <Button onClick={handleGeneratePDF}>Gerar PDF</Button>
            <Button onClick={() => setShowReceipt(false)}>Fazer Outra Transferência</Button>
            <Button onClick={() => navigate('/home')}>Voltar à Página Inicial</Button>
          </ButtonContainer>
        </Receipt>
      )}
      <HistoryButton onClick={viewTransactionHistory}>Ver Histórico de Transações</HistoryButton>
      <ToastContainer />
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

const Balance = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.div`
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
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const Receipt = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  p {
    margin: 10px 0;
    font-size: 16px;
    color: #333;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const HistoryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

export default TransferMoney;
