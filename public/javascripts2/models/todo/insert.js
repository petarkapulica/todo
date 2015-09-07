;
define([
    'models/todo/get'
],function(TodoModelGet){

    TodoModelInsert = function(){

      var todos = [];

      var getFromLocalStorage = function(criteria){
        return TodoModelGet().getFromLocalStorage(criteria);
      };

      var insertTodo = function(name, priority){
          var todo = {
              name : name,
              priority : priority || 1,
              completed : false,
              deleted : false,
              order : makeOrder(),
              modified : $.now()
          };
          todos = getFromLocalStorage();
          todos.push(todo);
          pushToLocalStorage();
      };

      var makeOrder = function(){
        return getFromLocalStorage().length > 0 ?
        parseInt( getFromLocalStorage().slice(-1)[0].order + 1 ):
        1 ;
      };

      var pushToLocalStorage = function(){
        localStorage.todos = JSON.stringify(todos);
      };

      return {
        insert : insertTodo
      };

    };
    
    return TodoModelInsert;

});