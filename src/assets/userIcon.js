import L from "leaflet";

const userIcon = new L.Icon({
    iconUrl: require("../assets/images/userIcon.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
})

export default userIcon;