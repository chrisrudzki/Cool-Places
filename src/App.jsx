import { useEffect, useState } from 'react'
import './App.css'
import mapboxgl from 'mapbox-gl'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNydWR6a2kiLCJhIjoiY21jczlybHZnMHZrODJrcTIyaXpyZnUxNSJ9.iNC1iYW4Ra5qTmee9BCluA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // optional: initial map center [lng, lat]
      zoom: 9, // optional: initial zoom level
    });
  }, [])

  return (
    <>
      <h1>Cool places</h1>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </>
  )
}

export default App