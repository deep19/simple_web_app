//model
var Thing = {}
Thing.list = function() {
    /*
    return m.request({method: "GET", url: "/api/things"})
*/
    return [{id:1, name:"yo"}, {id:2, name:"lo"}, {id:3, name:"mo"}, {id:4, name:"fos"}]

}

//top level component
var things = {}

things.controller = function() {
    var ctrl = this

    ctrl.list = new list.controller({
        visible: function(item) {
            return item.name.indexOf(ctrl.filter.searchTerm()) > -1
        }
    })

    ctrl.filter = new filter.controller()
}

things.view = function(ctrl) {
    return m(".row", [
        m(".col-md-2", [
            filter.view(ctrl.filter)
        ]),
        m(".col-md-10", [
            list.view(ctrl.list)
        ])
    ])
}

//filter
var filter = {}
filter.controller = function(options) {
    this.searchTerm = m.prop("")
}
filter.view = function(ctrl) {
    return m("input", {oninput: m.withAttr("value", ctrl.searchTerm)})
}

//list
var list = {}
list.controller = function(options) {
    this.items = Thing.list()
    this.visible = options.visible
}
list.view = function(ctrl) {
    return m("table", [
        ctrl.items.filter(ctrl.visible).map(function(item) {
            return m("tr", [
                m("td", item.id),
                m("td", item.name)
            ])
        })
    ])
}

//run

