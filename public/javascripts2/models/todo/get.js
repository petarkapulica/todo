var Todo = Todo || {};

Todo.TodoModelGet = function(){

  var todos = [];

  var getFromLocalStorage = function(criteria){
    var myTodos = localStorage.todos !== undefined ?
    JSON.parse(localStorage.todos) : [];
    switch(criteria) {
        case 'all': return getAllTodos(myTodos);
        break;
        case 'active': return getActiveTodos(myTodos);
        break;
        case 'completed': return getCompletedTodos(myTodos);
        break;
        case 'deleted': return getDeletedTodos(myTodos);
        break;
        default: return getTodos(myTodos);
    };
  };

  var getAllTodos = function(myTodos){
    todos = [];
    if(myTodos)
    {
      $.each(myTodos,function(key,value){
        if(!value.deleted)
        {
          todos.push(value);
        }
      });
      return todos;
    }
    else
    {
      return false;
    }
  };

  var getActiveTodos = function(myTodos){
    todos = [];
    if(myTodos)
    {
      $.each(myTodos,function(key, value){
        if(!value.completed && !value.deleted)
        {
            todos.push(value);
        }
      });
      return todos;
    }
    else
    {
      return false;
    }
  };

  var getCompletedTodos = function(myTodos){
    todos = [];
    if(myTodos)
    {
      $.each(myTodos,function(key, value){
        if(value.completed && !value.deleted)
        {
          todos.push(value);
        }
      });
      return todos;
    }
    else
    {
      return false;
    }
  };

  var getDeletedTodos = function(myTodos){
    todos = [];
    if(myTodos)
    {
      $.each(myTodos, function(key, value){
        if(value.deleted)
        {
          todos.push(value);
        }
      });
      return todos;
    }
    else
    {
      return false;
    }
  };

  var getTodos = function(myTodos){
    todos = [];
    if(myTodos)
    {
      $.each(myTodos,function(key, value){
        todos.push(value);
      });
      return todos;
    }
    else
    {
      return false;
    }
  };

  var getCurrentTodo = function(){
    var todoArr = getFromLocalStorage();
    var lowest = Number.POSITIVE_INFINITY;
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i = todoArr.length - 1 ; i >= 0 ; i--) {
        tmp = todoArr[i].modified;
        if (tmp > highest)
        {
            return todoArr[i].order;
        }
    }
  };

  return {
    getFromLocalStorage : getFromLocalStorage,
    getCurrentTodo : getCurrentTodo
  };

};
