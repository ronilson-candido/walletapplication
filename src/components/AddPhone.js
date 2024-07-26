// src/components/AddPhone.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const handleSendCode = () => {
    axios.post("http://localhost:3001/send-code", { phoneNumber })
      .then((response) => {
        if (response.data.success) {
          setVerificationId(response.data.verificationId); // Armazena o ID de verificação
          console.log("Código de verificação enviado");
        } else {
          console.error("Erro ao enviar código:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar código:", error);
      });
  };

  const handleVerifyCode = () => {
    axios.post("http://localhost:3001/verify-code", { verificationId, verificationCode })
      .then((response) => {
        if (response.data.success) {
          console.log("Número verificado com sucesso");
          navigate("/dashboard"); // Redireciona para a página de sucesso
        } else {
          console.error("Erro ao verificar código:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar código:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Adicionar Número de Telefone</h2>
      <input
        type="tel"
        placeholder="Número de Telefone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendCode}>Enviar Código</button>
      {verificationId && (
        <>
          <input
            type="text"
            placeholder="Código de Verificação"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verificar Código</button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontFamily: "'Montserrat', sans-serif",
  },
};

export default AddPhone;
