// Task Model

const Task = (function createTask(){
  var id = 0;
  return class Task {
    constructor(listId, description, priority){
      this.id = ++id;
      this.listId = listId;
      this.description = description;
      this.priority = priority
      store.tasks = [...store.tasks, this];
    }
  }
})();
// "syntax = static get all" create a get all task for all method
$(function() {
  $('form#add_task').on('submit', function(event){
    event.preventDefault();
    let listId = $('#select_list option:checked').data().id
    let description = $("#task_description").val();
    let priority = $("#task_priority").val();
    let taskObject = new Task(listId, description, priority);
    //below removes and re-renders tasks
    updateTask()
    //below just clears the form
    $("#task_description").val('');
    $("#task_priority").val('');

  })
})

function updateTask(){
  $('li.task').remove();
  [...store.tasks].forEach(function(taskObj){
    let li = document.createElement("li")
    li.innerHTML = taskObj.description
    $(`ul[data-id="${taskObj.listId}"]`).append(li)
  })
  $('li').addClass("task")
};
