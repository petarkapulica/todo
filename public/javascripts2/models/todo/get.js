;
define([],function(){

    TodoModelGet = function(){

      var getFromLocalStorage = function(criteria){
        var myTodos = localStorage.todos !== undefined ?
        JSON.parse(localStorage.todos) : [];
        var todos = [];
        if(myTodos)
        {
          $.each(myTodos,function(key, value){
            if(checkStatus(criteria, value))
            {
              todos.push(value);
            }
          });
        }
        return todos;
      };

      var checkStatus = function(criteria, value){
        switch(criteria) {
          case 'all': return !value.deleted;
          break;
          case 'active': return !value.completed && !value.deleted;
          break;
          case 'completed': return value.completed && !value.deleted;
          break;
          case 'deleted': return value.deleted;
          break;
          default: return true;
        };
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

    return TodoModelGet;

});