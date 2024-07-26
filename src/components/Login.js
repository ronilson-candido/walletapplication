// src/components/Login.js

import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Usuário logado com Google:", user);
      setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      navigate("/add-phone"); // Redireciona para a página de adição de telefone
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.header}>
          <img src={user.photoURL} alt="Perfil" style={styles.profilePic} />
          <span style={styles.userName}>{user.name}</span>
        </div>
      ) : (
        <div>
          <h1 style={styles.title}>
            <span style={styles.carteira}>Carteira</span>{" "}
            <span style={styles.digital}>Digital</span>
          </h1>
          <p style={styles.slogan}>A forma mais segura de gerenciar seu dinheiro</p>
          <button onClick={handleGoogleLogin} style={styles.button}>
            Login com Google
          </button>
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
    fontFamily: "'Montserrat', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
  },
  profilePic: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  },
  userName: {
    marginLeft: "10px",
    fontSize: "1.2em",
    color: "#333",
  },
  title: {
    fontSize: "2.5em",
    color: "#333",
  },
  carteira: {
    color: "#4285F4",
  },
  digital: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  slogan: {
    fontSize: "1.2em",
    color: "#666",
    marginBottom: "20px",
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
};

export default Login;
