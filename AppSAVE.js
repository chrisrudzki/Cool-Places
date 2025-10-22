import React from 'react';
import { useRef, useEffect, useState } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'
import StartScreen from "./components/StartScreen.jsx"
import Post from "./components/Post.jsx"
import { auth, Firestore } from "./index.js"

import { getFirestore, doc, setDoc, getDocs, getDoc, collection, addDoc, query } from "firebase/firestore";

import {onAuthStateChanged, signOut } from 'firebase/auth';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


const posts = [];

export default function App() {
  
  const navigate = useNavigate();

  let docRef;

  const mapRef = useRef(null);

    const [curStartDisplay, setCurStartDisplay] = useState(true);
    
    const [curCanPost, setCurCanPost] = useState(false);
    const [allPosts, setPosts] = useState([]);


    // const fetchData = async () => {
    //   //populate array with routes
    //   const genSnapshot = await getDocs(collection(Firestore, "posts"));
    //   //console.log("snapshot: ", genSnapshot);

    //   const newPosts = [];
    //   genSnapshot.forEach((doc) => {
    //     const data = doc.data();
    //     console.log("doc id: "+ doc);
    //     // posts.push(<Route key={doc.id} path={`/${doc.id}`} element={<Post content={data} />} />);
    //     // <Route key={doc.id} path={`/${doc.id}`} element={<Post content={data} />} />
    //     newPosts.push(<Route key={doc.id} path={`/${doc.id}`} element={<Post content={data} />} />);
    //   });

    //   setPosts(newPosts);

    //   }
    
    
    useEffect(() => {
    if (!process.env.MAPBOX_ACCESS_TOKEN) {
        console.error('mapbox access token is not defined');
        return;
    }
   
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/chrisrudzki/cmg6z3e6a00ew01rjdn9u35kw',
      center: [-74.5, 40],
      zoom: 9,
    });

    mapRef.current.setCenter([-123.312310125458, 48.464145303790666]);
    mapRef.current.setZoom(13.5);
     }, []);


  // create new post
  useEffect(() => {
  if (!mapRef.current) return;

  const handleMapClick = (e) => {
    const coords = e.lngLat;
    if (curCanPost) {

      console.log("POSTED! Longitude:", coords.lng, "Latitude:", coords.lat);

      try {
          // console.log(auth.currentUser.uid);
            docRef = addDoc(collection(Firestore, "posts"), {
            Longitude : coords.lng,
            Latitude: coords.lat,
            postUser: auth.currentUser.uid,
            postDisc: "captionn"
            // add date and time
            // photos
          });

          
          //getDocData(docRef);
          // setPosts(...allPosts, <Route key={docRef.id} path={`/${docRef.id}`} element={<Post content={docSnap.data()} />} />);


            console.log("Document written ");
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          //create async function for retreveing getDoc


          const addPosts = async () => {

            const docSnap = await getDoc(docRef);

            setPosts(...allPosts, <Route key={docRef.id} path={`/${docRef.id}`} element={<Post content={docSnap.data()} />} />);
          }

          addPosts();
      

    
      const Marker = new mapboxgl.Marker().setLngLat([coords.lng, coords.lat]);


      Marker.getElement().addEventListener("click", ()=> {
        setCurCanPost(false);
        if(docRef){
          console.log("doc ref:" + docRef);
        handlePostClick(docRef);
        }
      });

      Marker.getElement().classList.add("post-pin");

      Marker.addTo(mapRef.current);

    }
  };







  mapRef.current.on('click', handleMapClick);

  return () => {
    mapRef.current.off('click', handleMapClick);
  };

}, [curCanPost]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
         console.log(user, " User is logged in.");
        setCurStartDisplay(false);
      } else {
        console.log("User is logged out.");
        setCurStartDisplay(true);
      }
      //  setCurStartDisplay(false); // to take away start screen
    });
    return () => unsubscribe();
  }, []);

    const logout = async () => {
      console.log("logged out");
      await signOut(auth);
    }

    async function handlePostClick(docRef){ 
      const result = await docRef;
      console.log("result id : " + result.id);
      navigate("/" + result.id);
    }

    const handlePostButton = () => {
      setCurCanPost(prev => !prev);
      console.log(curCanPost);
    }

    //---
    async function getDocData(docRef){ 
      const result = await docRef;
      console.log("result id : " + result.id);
      navigate("/" + result.id);
    }

    // const genPages = async () => {

    //   const genSnapshot = await getDocs(collection(Firestore, "Posts"));
    //   genSnapshot.forEach((e) => {
    //     const data = e.data();

    //     <Route
    //       key={e.id}
    //       path={"/" + e.id}
    //       element={<Post content={data} />}
    //   }

    // }


    //initalize map posts on refresh
    useEffect (() => {
      const fetchData = async () => {
      //populate array with routes
      const genSnapshot = await getDocs(collection(Firestore, "posts"));
      //console.log("snapshot: ", genSnapshot);

      const newPosts = [];
      genSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("doc id: "+ doc);
        // posts.push(<Route key={doc.id} path={`/${doc.id}`} element={<Post content={data} />} />);
        // <Route key={doc.id} path={`/${doc.id}`} element={<Post content={data} />} />
        newPosts.push(<Route key={doc.id} path={`/${doc.id}`} element={<Post content={data} />} />);
      });

      setPosts(newPosts);
      }

     
    fetchData();
    }, []);


    useEffect(() => {
      console.log("posts updated:", allPosts);
      console.log("all posts length:", allPosts.length);

    }, [allPosts]);

 useEffect(() => {                                                   
      if (!mapRef.current) return;

      const fetchMarkers = async () => {
      const querySnapshot = await getDocs(collection(Firestore, "posts"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const Marker = new mapboxgl.Marker().setLngLat([data.Longitude, data.Latitude])
          
          Marker.getElement().addEventListener("click", ()=> {
          setCurCanPost(false);
          if(doc.ref){

          console.log("in first use effect again");
          handlePostClick(doc.ref);
          }

          });
          Marker.getElement().classList.add("post-pin");
          Marker.addTo(mapRef.current);
      });
    };

    fetchMarkers();
    }, []);




    // const Marker = new mapboxgl.Marker().setLngLat([coords.lng, coords.lat]);


    //   Marker.getElement().addEventListener("click", ()=> {
    //     setCurCanPost(false);
    //     if(docRef){
    //     handlePostClick(docRef);
    //     }
    //   });

    //   Marker.getElement().classList.add("post-pin");

    //   Marker.addTo(mapRef.current);



    return(
    <>
        {curStartDisplay ? <StartScreen onDisplayStart={setCurStartDisplay}/> : undefined}
        
        <div class="overlay-map" style={{ pointerEvents: "none" }}>
        
        <button onClick={logout}style={{ pointerEvents: "auto" }}>log out</button>
        {/* <button onClick={tester} style={{ pointerEvents: "auto" }}> submit</button>
         */}

        <div class="right-side-bar">
        
        <button onClick={handlePostButton} style={{ pointerEvents: "auto", backgroundColor: curCanPost ? "red" : "unset" }}>post</button>

        <button style={{ pointerEvents: "auto" }}>profile</button>
        <button style={{ pointerEvents: "auto" }}>friends</button>

        {/* HOW DO ROUTES WORK?? */}
 
        </div>
        </div>

          {/* whats going on here exactly? */}
        <Routes>
          {/* <Route path="/" element={<StartScreen onDisplayStart={setCurStartDisplay} />} /> */}
          {/* <Route path="/a" element={<Post />} /> */}
          

          {
          allPosts.map( Post => (
            Post
          ))
        }
          
        </Routes>
        <Link to="/ZprjBlYIGV3NWtXdxDQm" >
        <button>Go to Post</button>
        </Link>

        <div id="map" style={{ width: '100vw', height: '100vh' }}></div>

        {/* <div id="map"></div> */}
    </>
    );

}