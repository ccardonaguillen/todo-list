import $ from "jquery";

import events from "./events.js";
import TaskList from "./tasklist.js";
import Task from "./task.js";

var modal = (function () {
    const newTaskButton = $("#new-task");
    const overlay = $("#modal-overlay");
    const form = $("#new-task-form");

    newTaskButton.on("click", _openModal);
    form.on("submit", _submitNewTask);

    function _submitNewTask(e) {
        console.log("submit")

        e.preventDefault();
        const newTask = Task(_processForm());

        TaskList.addTask(newTask);

        console.log(newTask);
        _closeModal();
    }

    function _processForm() {
        let formData = new FormData(form[0]);
        let formContents = Object.fromEntries(formData.entries());
        
        return formContents
    }

    function _openModal() {
        overlay.removeClass("hidden");
    }

    function _closeModal() {
        overlay.addClass("hidden");
        form.trigger("reset");
    }
})();
