import $ from "jquery";

$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    const $container = $('<div>').addClass('container py-4').appendTo('body');

    const $header = $('<div>').addClass('header d-flex justify-content-between align-items-center mb-4').appendTo($container);
    const $title = $('<h1>').addClass('mb-0').html('<i class="bi bi-check-circle-fill checkmark"></i>Todo List').appendTo($header);
    const $themeToggle = $('<button>').addClass('btn theme-toggle').html('<i class="bi bi-moon-fill"></i>').appendTo($header);

    const $inputCard = $('<div>').addClass('card mb-4').appendTo($container);
    const $inputCardBody = $('<div>').addClass('card-body').appendTo($inputCard);
    const $inputGroup = $('<div>').addClass('input-group').appendTo($inputCardBody);
    const $input = $('<input>').attr({
        type: 'text',
        id: 'new-task',
        placeholder: 'Add a new task...'
    }).addClass('form-control').appendTo($inputGroup);
    const $addButton = $('<button>').attr('id', 'add-task').addClass('btn btn-primary')
        .html('<i class="bi bi-plus-lg me-1"></i>ADD').appendTo($inputGroup);


});
