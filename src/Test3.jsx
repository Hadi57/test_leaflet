import { MapContainer} from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker} from 'react-leaflet/Marker'
import {Popup} from 'react-leaflet/Popup'
import {useMapEvents, Polyline} from 'react-leaflet'
import L from 'leaflet'

import { useState, useEffect } from 'react'
import axios from 'axios';

import 'leaflet/dist/leaflet.css'


import marker  from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



let positions, setPositions;
let multiPolyline, setMultiPolyline;

export default function Test3() {

  [positions, setPositions] = useState([]);
  [multiPolyline, setMultiPolyline] = useState([]);


  let DefaultIcon = L.icon({
      iconUrl: marker,
      shadowUrl: iconShadow,
      iconAnchor: [12, 41]
  });
  L.Marker.prototype.options.icon = DefaultIcon;



  return (
    <MapContainer center={[47.3751, 8.52813]} zoom={13} scrollWheelZoom={false}  style={{height: '500px'}} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MyEventComponent />

      <MarkersLayer />
      <PolylineLayer />
    </MapContainer>
  );
}


function MyEventComponent() {
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
      if (positions.length  > 0) fetchData(positions[positions.length-1], e.latlng);

      setPositions([...positions, e.latlng]);
    },
  });
  return null;
}


  function fetchData(Pa: LatLng, Pb: LatLng){
    const api_key = '5b3ce3597851110001cf6248b6139f92bba148f29c94e7102833572a';
    const url = `http://45.149.77.73//api/Route?api_key=${api_key}&Lat_A=${Pa.lat}&Lon_A=${Pa.lng}&Lat_B=${Pb.lat}&Lon_B=${Pb.lng}`

    axios.get(url)
      .then(response => {
        const sPoints = response.data.Alternatives[0].points
        const Points = sPoints.split(",");
        const Points2 = []
        for (let i = 0; i < Points.length; i+=2) {
          Points2.push([Points[i], Points[i+1]]);
        }
        setMultiPolyline([...multiPolyline, Points2])
      })
      .catch(error => {
        console.error("EEROR:" + error); 
      });
  }


function MarkersLayer() {
  return (
    positions.map((item, k) => 
      <Marker key={k} position={item}>
        <Popup>You are here {JSON.stringify(item)}</Popup>
      </Marker>
    )
  )
}

function PolylineLayer() {
  return(
    <Polyline pathOptions={{ color: 'purple' }} positions={multiPolyline} />
  );
}