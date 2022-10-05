import $ from "jquery";

import events from "./events";
import Task from "./task";

var TaskList = (function () {
    var tasks = [];
    var idCounter = 0;

    function getTasks() {
        return tasks;
    }

    function addTask(task) {
        task["id"] = idCounter;
        idCounter++;
        tasks.push(task);

        events.emit("taskAdded", task);
    }

    function deleteTask(id) {
        tasks = tasks.filter((task) => task.id !== id);

        events.emit("taskDeleted", id);
    }

    // function editTask(id, newInfo)
    // function sort(by, ord)

    return {
        getItems: getTasks,
        addTask,
        deleteTask,
    };
})();

var taskListView = (function (taskList) {
    const main = $("main");
    var taskFilter = { filter: "", value: "" },
        list;

    events.on("tabSwitched", _switchTab);
    events.on("taskAdded", _renderItem);

    function _renderTaskList() {
        list = $("main> div");

        TaskList.getItems().forEach((task) => {
            _renderItem(task);
        });
    }

    function _renderItem(task) {
        if (!_filterTask(task)) return;

        const priorityColor = { 0: "white", 1: "blue", 2: "orange", 3: "red" };

        const container = $("<div>").addClass("list-item");
        list = $("main> div");

        $("<input>")
            .attr("type", "checkbox")
            .addClass("checkbox")
            .appendTo(container)
            .on("change", _changeTaskStatus)
        $("<p>").text(task.title).addClass("item-title").appendTo(container);
        $("<div>")
            .attr("data-priority", task.priority)
            .addClass("item-prio")
            .css({ "background-color": priorityColor[task.priority] })
            .appendTo(container);
        $("<p>").text(task.date).addClass("item-date").appendTo(container);

        container.appendTo(list);

    }

    function _switchTab(tab) {
        switch (tab) {
            case "home":
                taskFilter = { filter: "", value: "" };
                break;
            case "today":
                taskFilter = { filter: "date", value: "0" };
                break;
            case "upcoming":
                taskFilter = { filter: "date", value: "7" };
                break;
            default:
                taskFilter = { filter: "project", value: "tab" };
                break;
        }

        _renderTaskList();
    }

    function _filterTask(task) {
        if (taskFilter.filter === "date") {
            var msecs = new Date(task.date) - new Date();
            var days = msecs / (1000 * 60 * 60 * 24);
            return Math.floor(days) <= taskFilter.value;
        } else if (taskFilter.filter === "project") {
            return taskFilter.value in task.project;
        }

        return true;
    }

    function _changeTaskStatus(e) {
        const title = $(e.currentTarget).parent().find("p");
        title.toggleClass("completed")
    }
})();

function _renderIcon(url) {
    var $svg;
    $.get(
        url,
        function (data) {
            $svg = $(data).find("svg");
            $svg = $svg.removeAttr("xmlns:a");
            console.log($svg);
        },
        "xml"
    );
    return $svg;
}

var taskListController = (function (taskList) {})();

export default TaskList;
