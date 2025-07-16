import React from 'react';
import { createRef } from 'react';

import { useState } from "react";

import { initializeApp } from 'firebase/app';

import { 
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';

const firebaseApp = initializeApp ({
  apiKey: "AIzaSyCAUd7eHodqA4wO4MVZCjp3Y3I9OVDu_Mo",
  authDomain: "cool-places-84e55.firebaseapp.com",
  projectId: "cool-places-84e55",
  storageBucket: "cool-places-84e55.firebasestorage.app",
  messagingSenderId: "568081727341",
  appId: "1:568081727341:web:f1fb2f4a13b53e008b2464"
});

const auth = getAuth(firebaseApp);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async () => {
    setSubmittedData({ email, password });
    try{
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Submitted:', email, password);
    } catch (error) {
      console.error("log in failed", error.code, error.message);
    }
   
  };

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

    {submittedData && (
        <div>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}


    </>
  );
}