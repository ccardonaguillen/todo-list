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

        $("<p>")
            .text(tab)
            .css({ "color": "black"} )
            .addClass("header")
            .appendTo(main)
        $("<div>")
            .addClass("tasklist-container")
            .appendTo(main)

        events.emit("tabSwitched", tab);
    }
})();
