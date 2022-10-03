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

        const container = $("<div>").addClass("list-item");
        list = $("main> div");

        $("<p>").css({ color: "red" }).text(task.title).appendTo(container);
        $("<p>").css({ color: "blue" }).text(task.priority).appendTo(container);
        $("<p>").css({ color: "green" }).text(task.date).appendTo(container);

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

        _renderTaskList()
    }

    function _filterTask(task) {
        if (taskFilter.filter === "date") {
            var msecs = task.date - new Date;
            var days = msecs / (1000 * 60 * 60 * 24);
            return Math.floor(days) <= taskFilter.value;
        } else if (taskFilter.filter === "project") {
            return taskFilter.value in task.project;
        }

        return true;
    }
})();

var taskListController = (function (taskList) {})();

export default TaskList;
