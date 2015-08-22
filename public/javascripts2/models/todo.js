var Todo = Todo || {};
//kontroler komunicira samo s ovim
Todo.TodoModel = function(){

  return {
    get : Todo.TodoModelGet().getFromLocalStorage,
    countLeftItems : Todo.TodoModelCount().count,
    insert : Todo.TodoModelInsert().insert,
    currentTodo : Todo.TodoModelGet().getCurrentTodo,
    update : Todo.TodoModelUpdate().update,
    completeAll : Todo.TodoModelUpdate().completeAll,
    clear : Todo.TodoModelUpdate().clearCompleted
  };

};
