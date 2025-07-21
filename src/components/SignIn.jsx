import React from 'react';
import { useState } from "react";
import auth from "../index.js"

import { 
  signInWithEmailAndPassword
} from 'firebase/auth';

export default function SignIn({ onDisplayStart, onDisplayStartSub }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setSubmittedData({ email, password });
    try{
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Submitted:', email, password);
     
    } catch (error) {
      setErrorMessage("Wrong e-mail or password, try again");
      //console.("Failed:", error.code, error.message);
    }
  };

  const handleStartSubScreen = () => {onDisplayStartSub(false)}

  return (
    <>
    <h1>
    Sign In
    </h1>

    <div>Username</div>
    <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


    <div>Password</div>
    <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

    <button onClick={handleSubmit}>Log in</button>

    <button onClick={handleStartSubScreen}>Sign Up</button>

    <p>{errorMessage}</p>

    </>
  );
}
