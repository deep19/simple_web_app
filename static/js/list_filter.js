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


var onselect_handler = function(){
    var value = $("#basics").getSelectedItemData().locations;
    value = value[0]
    console.log(value)
    var request = {
        location:{lat:37.773972, lng: -122.431297},
        radius:50000,
        name: value+ " San Francisco"
    }

    var service = new google.maps.places.PlacesService(map);
    service.radarSearch(request, 
        function(results, status)
        {
            if (status == google.maps.places.PlacesServiceStatus.OK) 
            {
                console.log(results)
            };

        })
}


