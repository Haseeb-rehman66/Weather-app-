
import React, { useEffect, useState } from "react";
import Weather from "./weather";
import { Dimmer, Loader } from 'semantic-ui-react';


export default function Latlong() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${'https://api.openweathermap.org/data/2.5'}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${'30bd85165d222c08a2341d0f2fe11392'}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])
  
  return (
    <div className="App">
    {(typeof data.main != 'undefined') ? (
      <Weather weatherData={data}/>
    ): (
      <div>
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
     </div>
   )}
</div>
  );
}