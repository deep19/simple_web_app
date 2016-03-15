var filter = {}    // Namespace for the file
filter.config = {}
filter.config.center = {lat:37.773972, lng: -122.431297},
filter.config.radius = 50000
filter.config.city_name = "San Francisco"
filter.config.final_zoom_level = 12
filter.config.movie_api_url = "/api/get_movie_data/?name="
filter.config.name_field = "name"
filter.config.location_field = "locations"
filter.config.delay_time = 500          // delay(in ms) in ajax request as user types
filter.config.search_element_id = "search_movie"


// Returns the easyautocomplete options with event handlers set

filter.set_filter = function(){
    var markers = []                                               // Store the marker objects of locations on map
    var service = new google.maps.places.PlacesService(gmaps.map); // The service object of google maps api to fetch coordinates given name

    var onselect_handler = function(){
        var requests = []                       // Stores the request objects for getting coordinates from name
        var center_sum = [0,0]                  // center_sum and num_markers are used to get the mean center of all locations on map
        var num_markers = 0
        var create_coordinate_fetch_request = function(locations, center, city_name, radius){
            return locations.map(function(location_name){
                return  {
                    location: center,
                    radius:radius,
                    name: location_name + ", " + city_name
                }
            })
        }
        var fetch_locations_and_show_on_map = function(requests){
            var remove_markers = function(){        
               markers.forEach(function(marker){
                   marker.setMap(null)
               })
               markers = []
            }
            var show_markers = function(marker, lat, lng, map, zoom_level){
                markers.push(marker);
                marker.setMap(map)
                map.setZoom(zoom_level)
                center_sum[0] += lat
                center_sum[1] += lng
                num_markers += 1
                if (num_markers){
                    mean_lat = center_sum[0]/num_markers
                    mean_lng = center_sum[1]/num_markers
                    map.setCenter({lat: mean_lat, lng: mean_lng})

                }
            }
            
            /*
             * Remove previously set markers and process
             * each request objects to fetch coordinates
             * and set markers on the map
             */
            
            remove_markers()
            requests.forEach(function(request){
                service.radarSearch(request, 
                    function(results, status){
                        if (status == google.maps.places.PlacesServiceStatus.OK) 
                        {
                            var lat = (results[0].geometry.location.lat())
                            var lng = (results[0].geometry.location.lng())
                            var marker = new google.maps.Marker({
                                position: {lat: lat, lng:lng},
                                title: request.name
                            });
                            show_markers(marker, lat, lng, gmaps.map, filter.config.final_zoom_level)
                        };
                    })
            });
        }

        /*
         * Fetch the location list from the DOM element and create coordinate request
         * objects for each location
         * Fetch the locations from request objects and show them on map
        */
        
        var locations = $("#"+filter.config.search_element_id).getSelectedItemData()[filter.config.location_field];
        if (locations[0]){                                         // API gives first object of list as null if no locations are there
            requests = create_coordinate_fetch_request(locations, filter.config.center, filter.config.city_name, filter.config.radius)  
            fetch_locations_and_show_on_map(requests)
        }
        else{
            alert("No screening for this movie :(")
        }
    }
   
    // Option object for easyautocomplete with event handlers
    return {
        url: function(query_string) {
            return filter.config.movie_api_url + query_string;
        },
        getValue: filter.config.name_field,
        list: {
            onClickEvent: function() {
                onselect_handler()
            },
            onKeyEnterEvent: function() {
                onselect_handler()
            }
        },
        requestDelay: filter.config.delay_time
    }
}
