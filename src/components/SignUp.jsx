import React from 'react';
import { useState } from "react";
import auth from "../index.js"

import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

export default function SignUp({ onDisplayStart, onDisplayStartSub }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  

  const createAccount = async () => {
    setSubmittedData({ email, password });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sucsess:", email, password);
    }
    catch(error) {
      const rawMessage = error?.message ? String(error.message) : String(error);
      const match = rawMessage.match(/^Firebase:\s*(.+?)\s*\(/);
      const cleanMessage = match ? match[1] : rawMessage;
      console.log("Failure:", cleanMessage);
    }
  };

  const handleStartScreen = () => {onDisplayStart(false)}
  //HERE!!
  const handleStartSubScreen = () => {onDisplayStartSub(true)}

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user);
      } else {
        console.log("log in failed");
      }
    });
  }

  return (
    <>
    
    <h1>
    Sign Up
    </h1>

    <div>Email</div>
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

    <div>Comfirm Password</div>

    <div>Username</div>
    
    <input type="text" ></input>

    <button onClick={createAccount}>Sign Up</button>

    <button onClick={handleStartSubScreen} >Sign In</button>
      
    </>
  );
}