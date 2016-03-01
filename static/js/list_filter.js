var options = {
	url: function(query_string) {
		return "/api/get_movie_data/?name=" + query_string;
	},
	getValue: "name",
	list: {
		onClickEvent: function() {
            onselect_handler()
		},
		onKeyEnterEvent: function() {
            onselect_handler()
		}
	},
	requestDelay: 500
};

var markers = []


var onselect_handler = function(){
    var locations = $("#basics").getSelectedItemData().locations;
    console.log(locations)
    requests = []
    if (locations[0]){
        var requests = locations.map(function(location_name){
            return  {
                location:{lat:37.773972, lng: -122.431297},
                radius:50000,
                name: location_name + " San Francisco"
            }
        })
    }
    remove_markers(markers)
    markers = []
    var service = new google.maps.places.PlacesService(map);
    console.log(requests)
    requests.forEach(function(request){
        service.radarSearch(request, 
            function(results, status)
            {
                if (status == google.maps.places.PlacesServiceStatus.OK) 
                {
                    var lat = (results[0].geometry.location.lat())
                    var lng = (results[0].geometry.location.lng())
                    var marker = new google.maps.Marker({
                        position: {lat: lat, lng:lng},
                        title: request.name
                    });
                    markers.push(marker);
                };

            })
    })
    markers.forEach(function(marker){
        marker.setMap(map)
    })
    if (markers.length){
        map.setZoom(12)
    }
}

var remove_markers = function(markers){
    markers.forEach(function(marker){
        marker.setMap(null)
    })
}
