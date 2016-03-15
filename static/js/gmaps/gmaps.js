var gmaps = {}   // Namespace for the file objects
gmaps.map = null;
gmaps.config = {}
gmaps.config.center = {lat: 37.773972, lng: -122.431297}
gmaps.config.initial_zoom = 8


gmaps.initMap = function() {
  console.log("Map Initialized")
  gmaps.map = new google.maps.Map(document.getElementById('map'), {
    center: gmaps.config.center,
    zoom: gmaps.config.initial_zoom
  });
}

