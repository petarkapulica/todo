;
//kontroler komunicira samo s ovim

define([
    './todo/count',
    './todo/get',
    './todo/insert',
    './todo/update'  
],function(Count, Get, Insert, Update){

    var TodoModel = function(){

      return {
        get : Get().getFromLocalStorage,
        countLeftItems : Count().count,
        insert : Insert().insert,
        currentTodo : Get().getCurrentTodo,
        update : Update().update,
        completeAll : Update().completeAll,
        clear : Update().clearCompleted
      };

    };

    return TodoModel;

});