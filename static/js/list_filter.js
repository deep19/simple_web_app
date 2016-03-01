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
    var google_map_radar_api_url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?key=AIzaSyD1LmAPLKwVX9wLtB9sAoUrR6MTgCbAqoU&location=37.773972,-122.431297&radius=50000&name="+value
    $.getJSON( google_map_radar_api_url, function( data ) {
        console.log(data)
    });
}


