// src/components/AddPhone.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = () => {
    setLoading(true);
    axios.post("http://localhost:3000/send-code", { phoneNumber })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setVerificationId(response.data.verificationId); // Armazena o ID de verificação
          setError("");
          console.log("Código de verificação enviado");
        } else {
          setError("Erro ao enviar código. Verifique o número e tente novamente.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Erro ao enviar código. Tente novamente.");
        console.error("Erro ao enviar código:", error);
      });
  };

  const handleVerifyCode = () => {
    setLoading(true);
    axios.post("http://localhost:3001/verify-code", { verificationId, verificationCode })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          console.log("Número verificado com sucesso");
          navigate("/dashboard"); // Redireciona para a página de sucesso
        } else {
          setError("Código inválido. Tente novamente.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Erro ao verificar código. Tente novamente.");
        console.error("Erro ao verificar código:", error);
      });
  };

  return (
    <Container>
      <Form>
        <Title>Adicionar Número de Telefone</Title>
        <Input
          type="tel"
          placeholder="Número de Telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleSendCode} disabled={loading}>
          {loading ? "Enviando..." : "Enviar Código"}
        </Button>
        {verificationId && (
          <>
            <Input
              type="text"
              placeholder="Código de Verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={loading}
            />
            <Button onClick={handleVerifyCode} disabled={loading}>
              {loading ? "Verificando..." : "Verificar Código"}
            </Button>
          </>
        )}
        {error && <Error>{error}</Error>}
      </Form>
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
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  &:disabled {
    background-color: #aab;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: #d9534f;
  margin-top: 10px;
  text-align: center;
`;

export default AddPhone;
