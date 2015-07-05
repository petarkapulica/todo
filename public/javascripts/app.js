;
var Todo = Todo || {};

Todo.Application = function(){
    
};

Todo.Application.prototype = {
    
    init : function()
    {
        new Todo.Controller();
    }
};

$(function(){
   new Todo.Application().init(); 
});