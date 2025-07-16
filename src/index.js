import { initializeApp } from "firebase/app";

// import { 
//   hideLoginError, 
//   showLoginState, 
//   showLoginForm, 
//   showApp, 
//   showLoginError, 
//   btnLogin,
//   btnSignup,
//   btnLogout
// } from './ui'

import { getAuth,
    onAuthStateChanged,
signOut,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
connectAuthEmulator } from "firebase/auth";

const firebaseApp = initializeApp ({
  apiKey: "AIzaSyCAUd7eHodqA4wO4MVZCjp3Y3I9OVDu_Mo",
  authDomain: "cool-places-84e55.firebaseapp.com",
  projectId: "cool-places-84e55",
  storageBucket: "cool-places-84e55.firebasestorage.app",
  messagingSenderId: "568081727341",
  appId: "1:568081727341:web:f1fb2f4a13b53e008b2464"
});

const auth = getAuth(firebaseApp);

export default auth;


//connectAuthEmulator(auth, "http://localhost:9099");
// const loginEmailPassword = async () => {
//     const loginEmail = txtEmail.value;
//     const loginPassword = txtPassword.value;
//     const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//     console.log(userCredential.user);
// }

//btnLogin.addEventListener("click", loginEmailPassword);

//figure out how to hookup react to this functionality!



// onAuthStateChanged(auth, user => {
//     if(user != null){
//         console.log("user");
//     } else { 
//         console.log("none");
//     }
// });