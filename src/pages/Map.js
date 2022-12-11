import {
  TileLayer,
  MapContainer,
} from "react-leaflet";
import React, { useState } from "react";
import userIcon from "../assets/userIcon";
import L from "leaflet";
import "leaflet.markercluster";
import $ from "jquery";
import amenityIcon from "../assets/amenityIcon";

const Map = ({ id }) => {
  const [center] = useState({ lat: 53.5, lng: -8.5 });
  const [map, setMap] = useState(null);
  const [poi, setPoi] = useState("");

  let locationMarker;
  let locationCircle;
  let poi_markers;


  function map_init_basic(map) {
    updateLocation(map);
  }

  function updateLocation(map) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setMapToCurrentLocation(map, pos);
        //setNearbyCafes(pos);
        update_db(pos);
      },
      function (err) {},
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  }

  function setMapToCurrentLocation(map, pos) {
    let myLatLon = L.latLng(pos.coords.latitude, pos.coords.longitude);
    map.flyTo(myLatLon, 13);

    if (locationMarker) {
      map.removeLayer(locationMarker);
    }

    locationMarker = L.marker(myLatLon, { icon: userIcon }).addTo(map);

    if (locationCircle) {
      map.removeLayer(locationCircle);
    }

    locationCircle = L.circle(myLatLon, {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.3,
      radius: pos.coords.accuracy,
    }).addTo(map);

    locationMarker
      .bindPopup(
        "<b>Hello!</b><br>You are located at: <br> Lat: " +
          myLatLon.lat +
          "<br> Lon: " +
          myLatLon.lng
      )
      .openPopup();
  }

  async function update_db(pos) {
    let locString = pos.coords.longitude + ", " + pos.coords.latitude;

    try {
      await fetch(`${process.env.REACT_APP_DEV_API_POINT}/api/updateProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: locString,
          user_id: id,
        }),
      }).then((response) => {
        if (response.ok) {
          console.log("User profile updated with location in DB!");
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function showPoiMarkers(e) {
    e.preventDefault();
    console.log("In showPoiMarkers");

    //remove previous markers
    if (poi_markers) {
      map.removeLayer(poi_markers);
    }

    // add look to the icon
    //var icon = L.BeautifyIcon.icon(userIcon);

    $.ajax({
      type: "POST",
      headers: {},
      url: `${process.env.REACT_APP_API_END_POINT}/api/osm-query`,
      data: {
        query: poi,
        bbox: map.getBounds().toBBoxString(),
      },
    })
      .done(function (data, status, xhr) {
        poi_markers = L.markerClusterGroup();
        console.log(data);
        let geoJsonLayer = L.geoJson(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: amenityIcon });
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
          },
        });
        poi_markers.addLayer(geoJsonLayer);

        map.addLayer(geoJsonLayer);
      })
      .fail(function (xhr, status, error) {
        console.log("Status: " + xhr.status + " " + xhr.responseText);
      })
      .always(function () {});
  }


   /*
  async function setNearbyCafes(pos) {
    let locString = pos.coords.longitude + ", " + pos.coords.latitude;

    try {
      const response = await fetch("http://localhost:8000/api/nearbyCafes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "user_location": locString,
        }),
      })
      if (response.ok) {
        const content = await response.json();
        
        content.map(cafe => ({
           
        }))
      }
    

    } catch (err) {
      console.error(err);
    }
  }
  */

  map_init_basic(map);

  return (
    <div className="text-center" id="mapSection">
      <h1>Map!</h1>
      <div id="myMap">
        <MapContainer center={center} zoom={7} ref={setMap}>
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </MapContainer>
        <div class="input-group mb-3 w-50 m-auto mt-3">
        <input type="text" onChange={(e) => setPoi(e.target.value)} class="form-control" placeholder="Enter a POI" aria-label="Enter a POI" aria-describedby="button-addon2"/>
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={showPoiMarkers}>Submit</button>
      </div>
      </div>
    </div>
  );
};

export default Map;
