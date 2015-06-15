;
var Todo = Todo || {};

Todo.Application = function(){
    
};

Todo.Application.prototype = {
    
    init : function()
    {
        new Todo.Pamela();
    }
};

$(function(){
   new Todo.Application().init(); 
});