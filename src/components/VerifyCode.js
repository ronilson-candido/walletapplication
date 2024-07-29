import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber } = location.state || {};

  const handleVerifyCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 4000); 
  };

  return (
    <Container>
      <Form>
        <Title>Verificar Código</Title>
        <Input
          type="text"
          placeholder="Código de Verificação"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleVerifyCode} disabled={loading}>
          {loading ? "Verificando..." : "Confirmar Código"}
        </Button>
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
  color: #fffff;
  margin-top: 10px;
  text-align: center;
`;

export default VerifyCode;
