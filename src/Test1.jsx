import { MapContainer} from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker} from 'react-leaflet/Marker'
import {Popup} from 'react-leaflet/Popup'

import { useState } from 'react'
import {useMapEvents} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'


import L, { Icon } from 'leaflet'
import marker  from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// const myIcon = new Icon({iconUrl: marker, iconSize: [32,50]}) ;


export default function Test1() {


  
  let DefaultIcon = L.icon({
      iconUrl: marker,
      shadowUrl: iconShadow,
      iconAnchor: [12, 41]
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
  <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}  style={{height: '500px'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <Marker position={[51.505, -0.09]} icon={myIcon}> */}
    {/* <Marker position={[51.505, -0.09]} >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    <LocationMarker />
  </MapContainer>
  );
}




function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}