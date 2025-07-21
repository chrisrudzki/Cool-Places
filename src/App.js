import React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import StartScreen from "./components/StartScreen.jsx"
import auth from "./index.js"


import {onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {

    const [curStartDisplay, setCurStartDisplay] = useState(true);
    
    useEffect(() => {
    if (!process.env.MAPBOX_ACCESS_TOKEN) {
        console.error('mapbox access token is not defined');
        return;
    }
   
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
    }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
         console.log(user, " User is logged in.");
        setCurStartDisplay(false);
      } else {
        console.log("User is logged out.");
        setCurStartDisplay(true);
      }
    });
    
    return () => unsubscribe();
  }, []);

    const logout = async () => {
      console.log("logged out");
      await signOut(auth);
    }
  
    return (
    <>
        {curStartDisplay ? <StartScreen onDisplayStart={setCurStartDisplay}/> : undefined}
        <h1>Main page</h1>
        <button onClick={logout}>log out</button>
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </>
    );
}