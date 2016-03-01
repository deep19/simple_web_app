var options = {
	url: function(query_string) {
		return "/api/get_movie_data/?name=" + query_string;
	},
	getValue: "name",
	list: {
		onClickEvent: function() {
			var value = $("#basics").getSelectedItemData().locations;
            console.log(value)
		},
		onKeyEnterEvent: function() {
			var value = $("#basics").getSelectedItemData().locations;
            console.log(value)
		}

        requestDelay: 500

	}
};
