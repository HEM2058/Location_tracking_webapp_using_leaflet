var map = L.map('map').setView([28.2096, 83.9856], 15);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var baseMap = {
    'osm':osm,
    'googleSat':googleSat,
    'googleHybrid':googleHybrid


};

L.control.layers(baseMap).addTo(map);

if(!navigator.geolocation)
{
    console.log("your browser does not support geolocation service")
}

else{
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000);
    }

     var marker,circle;

    function getPosition(position) {
    console.log(position)
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    var accuracy = position.coords.accuracy
      
    if(marker)
    {
       map.removeLayer(marker)
    }
    if(circle){
        map.removeLayer(circle)
    }
    marker = L.marker([lat,lng],7)
    circle = L.circle([lat,lng], {radius:accuracy})
    var featureGroup = L.featureGroup([marker,circle]).addTo(map)
    map.fitBounds(featureGroup.getBounds())
}