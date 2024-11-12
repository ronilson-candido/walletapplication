// src/components/PhoneAuth.js

import React, { useState, useEffect } from 'react';
import { auth, getRecaptchaVerifier } from '../config/firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {

    getRecaptchaVerifier();
  }, []);

  const handleSendCode = async () => {
    const appVerifier = getRecaptchaVerifier();
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      alert('Código de verificação enviado!');
    } catch (error) {
      console.error('Erro ao enviar o código de verificação:', error);
    }
  };
  

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth.signInWithCredential(credential);
      alert('Número verificado com sucesso!');
    } catch (error) {
      console.error('Erro ao verificar o código:', error);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Número de telefone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendCode}>Enviar código</button>
      
      <input
        type="text"
        placeholder="Código de verificação"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerifyCode}>Verificar código</button>
    </div>
  );
};

export default PhoneAuth;
