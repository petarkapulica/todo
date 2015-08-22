;
var Todo = Todo || {};

Todo.Application = function(){

  var init = function(){
    Todo.TodoController();
  };

  return {
    init : init
  };

};

$(function(){

   Todo.Application().init();

});
