import React from 'react';
import SignIn from "./SignIn.jsx"
import SignUp from "./SignUp.jsx"

import { useState } from "react";

import '../App.css'
//const [curStart, setCurStart] = useState(SignIn);

export default function StartScreen({ onDisplayStart }) {

const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
    <div class="overlay">
    <div class="box">
      {isSignIn ? <SignIn onDisplayStartSub={setIsSignIn} onDisplayStart={onDisplayStart}/> : <SignUp onDisplayStartSub={setIsSignIn} onDisplayStart={onDisplayStart}/>}
    </div>
    </div>
    </>
  );
}
