var Todo = Todo || {};

Todo.TodoModelCount = function(){

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
    count : countLeftItems
  }

};
