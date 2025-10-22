
export default function App() {

  
  
  async function tester(){
    if (!auth.currentUser){
      console.error("needs to be signed in to make post");
      return;
    }

    try {
    await setDoc(doc(Firestore, "users", auth.currentUser.uid), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", auth.currentUser);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

    const [curStartDisplay, setCurStartDisplay] = useState(true);
    
    const [curCanPost, setCurCanPost] = useState(false);
    
    

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

    map.setCenter([-123.312310125458, 48.464145303790666]);
    map.setZoom(13.5);


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
       setCurStartDisplay(false); // to take away start screen

    });
    
    return () => unsubscribe();
  }, []);

  

    const logout = async () => {
      console.log("logged out");
      await signOut(auth);
    }

    const handlePostButton = () => {

      if(curCanPost == false){
        setCurCanPost(true);
      }else{
        setCurCanPost(false);
      }
    }

    const handleMapClick = () => {
      
      myRef.current.on('click', (e) => {
      const coords = e.lngLat; // Mapbox gives a LngLat object
      console.log("Longitude:", coords.lng, "Latitude:", coords.lat);

      // Optionally, place a marker at the clicked location
      new mapboxgl.Marker()
      .setLngLat([coords.lng, coords.lat])
      .addTo(map);
      // });

    }
  
    return(
    <>
        {curStartDisplay ? <StartScreen onDisplayStart={setCurStartDisplay}/> : undefined}
        {/* <h1>Main page</h1>
        <button onClick={logout}>log out</button>
        <button onClick={tester}> submit</button>
      */}

        <div class="overlay-map" style={{ pointerEvents: "none" }}>
        
        <button onClick={logout}style={{ pointerEvents: "auto" }}>log out</button>
        <button onClick={tester} style={{ pointerEvents: "auto" }}> submit</button>
        
        {/* map.setCenter([longitude, latitude]);
map.setZoom(14); */}

        <div class="right-side-bar">
        
        {curCanPost ? <button onClick={handlePostButton} style={{ pointerEvents: "auto", backgroundColor: "red" }}>post</button> : <button onClick={handlePostButton} style={{ pointerEvents: "auto" }}>post</button>}

        <button style={{ pointerEvents: "auto" }}>profile</button>
        <button style={{ pointerEvents: "auto" }}>friends</button>
        <button style={{ pointerEvents: "auto" }}>pin</button>

        </div>
        </div>

        <div id="map" onClick={handleMapClick} style={{ width: '100vw', height: '100vh' }}></div>

        {/* <div id="map"></div> */}

        


    </>
    );

}