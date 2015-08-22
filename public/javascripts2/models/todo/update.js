var Todo = Todo || {};

Todo.TodoModelUpdate = function(){

  var todos = [];

  var getFromLocalStorage = function(criteria){
    return Todo.TodoModelGet().getFromLocalStorage(criteria);
  };

  var updateTodo = function( todoOrder, newDeleted, newCompleted, newName, newPriority ){
    var oldTodo;
    $.each(getFromLocalStorage(),function(key, value){
        if(value.order == todoOrder)
        {
            oldTodo = value;
        }
    });
    oldTodo.deleted = newDeleted;
    if(newCompleted === false)
    {
        newCompleted === oldTodo.completed ?
        oldTodo.completed = !newCompleted:
        oldTodo.completed = newCompleted;
    }
    oldTodo.name = newName || oldTodo.name;
    oldTodo.priority = newPriority || oldTodo.priority;
    var newTodo = oldTodo;
    updateLocalStorage(newTodo, todoOrder);
  };

  var updateLocalStorage = function( newTodo, todoOrder ){
    createTodosArray();
    $.extend( todos[todoOrder - 1], newTodo );
    pushToLocalStorage();
  };

  var createTodosArray = function(){
    todos = getFromLocalStorage();
  };

  var pushToLocalStorage = function(){
    localStorage.todos = JSON.stringify(todos);
  };

  var makeAllCompleted = function(){
    createTodosArray();
    $.each(todos, function(key, value){
      value.completed = true;
    });
    pushToLocalStorage();
  };

  var clearCompleted = function(){
    createTodosArray();
    $.each(todos, function(key, value){
      if(value.completed && !value.deleted)
        {
            value.deleted = true;
        }
    });
    pushToLocalStorage();
  };

  return {
    update : updateTodo,
    completeAll : makeAllCompleted,
    clearCompleted : clearCompleted
  }

};
