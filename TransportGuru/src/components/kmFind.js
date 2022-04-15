export default function calcKmFind(lat1, lon1, lat2, lon2) {

    //console.log("t", lat1, lon1, lat2, lon2)
    var R = 6371; // km
    var dLat = ((lat2 - lat1) * (Math.PI / 180));
    var dLon = ((lon2 - lon1) * (Math.PI / 180));
    var lat1 = ((lat1) * (Math.PI / 180));
    var lat2 = ((lat2) * (Math.PI / 180));
  //  console.log("r", (lat2 - lat1))
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.round(d);
}
function toRad(Value) {
    return Value * Math.PI / 180;
}
// Converts numeric degrees to radians
