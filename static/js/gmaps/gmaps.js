var map;
var initMap = function() {
  console.log("Map Initialized")
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 8
  });
}

