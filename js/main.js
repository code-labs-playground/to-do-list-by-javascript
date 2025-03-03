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

    const $tasksCard = $('<div>').addClass('card mb-4').appendTo($container);
    const $tasksCardHeader = $('<div>').addClass('card-header bg-transparent')
        .html('<h5 class="mb-0"><i class="bi bi-list-task me-2"></i>Tasks</h5>').appendTo($tasksCard);
    const $tasksCardBody = $('<div>').addClass('card-body p-0').appendTo($tasksCard);
    const $tasksList = $('<ul>').attr('id', 'task-list').addClass('list-group list-group-flush').appendTo($tasksCardBody);

    const $completedCard = $('<div>').addClass('card mb-4').appendTo($container);
    const $completedCardHeader = $('<div>').addClass('card-header bg-transparent')
        .html('<h5 class="mb-0"><i class="bi bi-check2-all me-2"></i>Completed Items</h5>').appendTo($completedCard);
    const $completedCardBody = $('<div>').addClass('card-body p-0').appendTo($completedCard);
    const $completedList = $('<ul>').attr('id', 'completed-list').addClass('list-group list-group-flush').appendTo($completedCardBody);

    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('dark-mode');
        $themeToggle.find('i').removeClass('bi-moon-fill').addClass('bi-sun-fill');
    }

    renderTasks();
    renderCompletedTasks();

    $themeToggle.on('click', function() {
        $('body').toggleClass('dark-mode');
        const isDarkMode = $('body').hasClass('dark-mode');

        if (isDarkMode) {
            $(this).find('i').removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            $(this).find('i').removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }

        localStorage.setItem('darkMode', isDarkMode);
    });

    $addButton.on('click', function() {
        addTask();
    });

    $input.on('keypress', function(e) {
        if (e.which === 13) {
            addTask();
        }
    });

    function addTask() {
        const taskText = $input.val().trim();
        if (taskText !== '') {
            tasks.push(taskText);
            saveTasks();
            renderTasks();
            $input.val('').focus();
        }
    }

    function renderTasks() {
        $tasksList.empty();

        if (tasks.length === 0) {
            $tasksList.append(
                $('<li>').addClass('list-group-item text-center text-muted')
                    .text('No tasks yet. Add a task above!')
            );
            return;
        }

        tasks.forEach((task, index) => {
            const $li = $('<li>').addClass('list-group-item task-item d-flex justify-content-between align-items-center');

            const $taskContent = $('<div>').addClass('form-check');
            const $checkbox = $('<input>').attr({
                type: 'checkbox',
                class: 'form-check-input',
                id: 'task-' + index
            });
            const $taskText = $('<label>')
                .addClass('form-check-label task-text ms-2')
                .attr('for', 'task-' + index)
                .text(task);

            const $taskActions = $('<div>');
            const $deleteBtn = $('<button>')
                .addClass('btn btn-link p-0 delete-btn')
                .html('<i class="bi bi-trash"></i>');

            $taskContent.append($checkbox, $taskText);
            $taskActions.append($deleteBtn);
            $li.append($taskContent, $taskActions);

            $tasksList.append($li);

            $checkbox.on('change', function() {
                if (this.checked) {
                    completedTasks.push(task);
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                    renderCompletedTasks();
                }
            });

            $deleteBtn.on('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
        });
    }

    function renderCompletedTasks() {
        $completedList.empty();

        if (completedTasks.length === 0) {
            $completedList.append(
                $('<li>').addClass('list-group-item text-center text-muted')
                    .text('No completed tasks yet!')
            );
            return;
        }

        completedTasks.forEach((task, index) => {
            const $li = $('<li>').addClass('list-group-item task-item completed d-flex justify-content-between align-items-center');

            const $taskContent = $('<div>').addClass('form-check');
            const $checkbox = $('<input>').attr({
                type: 'checkbox',
                class: 'form-check-input',
                id: 'completed-' + index,
                checked: true
            });
            const $taskText = $('<label>')
                .addClass('form-check-label task-text ms-2')
                .attr('for', 'completed-' + index)
                .text(task);

            const $taskActions = $('<div>');
            const $deleteBtn = $('<button>')
                .addClass('btn btn-link p-0 delete-btn')
                .html('<i class="bi bi-trash"></i>');

            $taskContent.append($checkbox, $taskText);
            $taskActions.append($deleteBtn);
            $li.append($taskContent, $taskActions);

            $completedList.append($li);

            $checkbox.on('change', function() {
                if (!this.checked) {
                    tasks.push(task);
                    completedTasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                    renderCompletedTasks();
                }
            });

            $deleteBtn.on('click', function() {
                completedTasks.splice(index, 1);
                saveTasks();
                renderCompletedTasks();
            });
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
});
