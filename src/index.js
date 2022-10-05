import $ from "jquery";

import "./tabs.js";
import "./modal.js";

import events from "./events.js";
import TaskList from "./tasklist.js";
import Task from "./task.js";

(function () {
    const navItems = $(".nav-item");
    const navProjects = $(".project-item");

    navItems.on("click", (e) => {
        events.emit("navItemClicked", $(e.currentTarget).attr("value"));
    });

    $(navItems[0]).trigger("click");

    TaskList.addTask(Task({ title: "This is a test", date: "2022-10-04" }));
    TaskList.addTask(Task({ title: "This is a test", date: "2022-10-08" }));
    TaskList.addTask(Task({ title: "This is a test", date: "2022-10-25" }));
})();

/* Replace all imgs with their svg */
$(function () {
    $("img[src$='.svg']").each(function () {
        var $img = $(this);
        var imgURL = $img.attr("src");

        $.get(
            imgURL,
            function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find("svg");

                // Remove any invalid XML tags
                $svg = $svg.removeAttr("xmlns:a");

                $svg.attr("id", $img.attr("id"));
                $svg.attr("class", $img.attr("class"));

                // Replace IMG with SVG
                $img.replaceWith($svg);
            },
            "xml"
        );
    });
});
