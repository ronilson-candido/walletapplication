import React, { useState } from "react";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../config/firebase";

const TwoFactorAuth = ({ email }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [otp, setOtp] = useState(""); 
  const [isVerified, setIsVerified] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      const actionCodeSettings = {

        url: 'http://localhost:3000/verify-email', 
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setIsEmailSent(true);
      alert("Código de verificação enviado para seu e-mail.");
    } catch (error) {
      console.error("Erro ao enviar o e-mail de verificação:", error);
    }
  };

  const verifyEmailLink = async () => {
    try {
      const storedEmail = window.localStorage.getItem('emailForSignIn');
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw new Error("Link de verificação inválido");
      }

      await signInWithEmailLink(auth, storedEmail, window.location.href);
      setIsVerified(true);
      window.localStorage.removeItem('emailForSignIn');
      alert("E-mail verificado com sucesso.");
    } catch (error) {
      console.error("Erro ao verificar o e-mail:", error);
      alert("Erro ao verificar o e-mail.");
    }
  };

  return (
    <div style={styles.container}>
      {isVerified ? (
        <div>
          <h2>Autenticação bem-sucedida!</h2>
        </div>
      ) : (
        <div>
          {!isEmailSent ? (
            <button onClick={sendVerificationEmail} style={styles.button}>
              Enviar código de verificação
            </button>
          ) : !isCodeSent ? (
            <div>
              <p>Verifique seu e-mail e clique no link enviado.</p>
              <button onClick={() => setIsCodeSent(true)} style={styles.button}>
                Confirmar envio do código
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Digite o código enviado"
                style={styles.input}
              />
              <button onClick={verifyEmailLink} style={styles.button}>
                Verificar código
              </button>
            </div>
          )}
        </div>
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
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1em",
    cursor: "pointer",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "10px",
  },
};

export default TwoFactorAuth;
