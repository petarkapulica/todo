var Todo = Todo || {};
//kontroler komunicira samo s ovim
Todo.TodoModel = function(){

  var remaining = 0;

  var getFromLocalStorage = function(criteria){
    return Todo.TodoModelGet().getFromLocalStorage(criteria);
  };

  var countLeftItems = function(){
    remaining = 0;
    $.each( getFromLocalStorage(),function(key,value){
      if(!value.completed && !value.deleted)
      {
        remaining ++;
      }
    });
    return remaining;
  };

  return {
    get : getFromLocalStorage,
    countLeftItems : countLeftItems,
    insert : Todo.TodoModelInsert().insert,
    currentTodo : Todo.TodoModelGet().getCurrentTodo,
    update : Todo.TodoModelUpdate().update,
    completeAll : Todo.TodoModelUpdate().completeAll,
    clear : Todo.TodoModelUpdate().clearCompleted
  };

};
