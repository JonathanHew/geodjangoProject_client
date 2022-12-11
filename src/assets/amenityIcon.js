import L from "leaflet";

const amenityIcon = new L.Icon({
    iconUrl: require("../assets/images/cafe.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
})

export default amenityIcon;