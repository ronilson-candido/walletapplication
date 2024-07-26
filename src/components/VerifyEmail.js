import React, { useEffect, useState } from "react";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../config/firebase";

const VerifyEmail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const auth = getAuth();
        const url = window.location.href;
        if (!isSignInWithEmailLink(auth, url)) {
          throw new Error("Link de verificação inválido");
        }

        // Recupera o e-mail armazenado localmente
        const email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          throw new Error("E-mail não encontrado");
        }

        const result = await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        setUser(result.user);
      } catch (error) {
        console.error("Erro ao verificar o e-mail:", error);
        setError("Erro ao verificar o e-mail.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  if (loading) {
    return <div>Verificando seu e-mail...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Bem-vindo, {user.displayName || 'Usuário'}!</h2>
      <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="Foto de perfil" style={styles.profilePic} />
      <p>Email: {user.email}</p>
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
  profilePic: {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    margin: "10px",
  },
};

export default VerifyEmail;
