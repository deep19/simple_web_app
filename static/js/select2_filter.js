var Select2 = {
    //    Returns a select box
    view: function(ctrl, attrs) {
        var selectedId = attrs.value().id;
        //Create a Select2 progrssively enhanced SELECT element
        return m("select", {config: Select2.config(attrs)}, [
            attrs.data.map(function(item) {
                var args = {value: item.id};
                //    Set selected option
                if(item.id == selectedId) {
                    args.selected = "selected";
                }
                return m("option", args, item.name);
            })
        ]);
    },
    /**
    Select2 config factory. The params in this doc refer to properties of the `ctrl` argument
    @param {Object} data - the data with which to populate the <option> list
    @param {prop} value - the prop of the item in `data` that we want to select
    @param {function(Object id)} onchange - the event handler to call when the selection changes.
        `id` is the the same as `value`
    */
    //    Note: The config is never run server side.
    config: function(ctrl) {
        return function(element, isInitialized) {
            if(typeof jQuery !== 'undefined' && typeof jQuery.fn.select2 !== 'undefined') {
                var el = $(element);
                if (!isInitialized) {
                    el.select2()
                        .on("change", function(e) {
                            var id = el.select2("val");
                            m.startComputation();
                            //Set the value to the selected option
                            ctrl.data.map(function(d){
                                if(d.id == id) {
                                    ctrl.value(d);
                                }
                            });

                            if (typeof ctrl.onchange == "function"){
                                ctrl.onchange(el.select2("val"));
                            }
                            m.endComputation();
                        });
                }
                el.val(ctrl.value().id).trigger("change");
            } else {
                console.warn('ERROR: You need jquery and Select2 in the page');    
            }
        };
    }
};

var Dashboard = {
    controller: function() {
        var ctrl = this,
          //list of users to show
          data = [
            {id: 1, name: "John"}, 
            {id: 2, name: "Mary"}, 
            {id: 3, name: "Seniqua"}
          ];

        ctrl.data = data;
        //  Has to use a prop for the current user
        ctrl.currentUser = m.prop(data[1]);
        ctrl.changeUser = function(id) {
          console.log(id);
        };
    },

    view: function(ctrl) {
        return m("div", [
            m("label", "User:"),
            m.component(Select2, {
              data: ctrl.data, 
              value: ctrl.currentUser, 
              onchange: ctrl.changeUser
            })
        ]);
    }
};

