import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Atualize para useNavigate
import { auth } from '../config/firebase';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate(); // Atualize para useNavigate

  const handleVerifyCode = async () => {
    try {
      const confirmationResult = window.confirmationResult;
      await confirmationResult.confirm(code);
      console.log('Phone verification successful');
      navigate('/home');  // Redireciona para o dashboard ou página principal
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <h2>Verify Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter verification code"
      />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </div>
  );
};

export default VerifyCode;
