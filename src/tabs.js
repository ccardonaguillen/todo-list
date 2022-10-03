import $ from "jquery";
import events from "./events";
import TaskList from "./tasklist";

var home = (function () {
    const main = $("main"); 
    events.on("navItemClicked", _render);

    function _clear() {
        main.empty();
    }

    function _render(tab) {
        _clear()

        var header = $("<p>")
            .text(tab)
            .css({ "color": "black"} )
            .appendTo(main)
        var list = $("<div>")
            .css({"width": "100%", "background-color": "grey"})
            .appendTo(main)

        events.emit("tabSwitched", tab);
    }
})();
