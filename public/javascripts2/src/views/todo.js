;
define([
    'template',
    "text!/public/templates/todo-list.twig",
    "text!/public/templates/todo-deleted-list.twig"
], function(template, listHtml, deletedListHtml){

    var TodoView = function(){

      var onStarHover = function(event){
        $(event.currentTarget).hasClass('active-star') ?
        $(event.currentTarget).nextAll("div").removeClass('active-star'):
        $(event.currentTarget).addClass('active-star').prevAll("div").addClass('active-star');
      };

      var updateView = function(todos, itemsLeft, deleted){
        !deleted ?
        showTodos(todos) :
        showDeletedTodos(todos);
        if(todos.length > 0){ showSettings(); }
        showItemsLeft(itemsLeft);
      };

      var showTodos = function(todos){
        $('.todo-list ul').html('');
        new template(listHtml, '.todo-list ul', { todos: todos });
        $('.todos-wrapper').show();
      };

      var showDeletedTodos = function(todos){
        $('.todo-list ul').html('');
        new template(deletedListHtml, '.todo-list ul', { todos: todos });
        $('.todos-wrapper').hide();
      };

      var showSettings = function(){
        $('.todo-nav').fadeIn().css('display','inlineBlock');
      };

      var showItemsLeft = function(itemsLeft){
        var word = itemsLeft > 1 ? ' items':' item';
        $('.todos-left p').html(itemsLeft + word +  ' left');
      };

      var animateTodo = function(todo){
        $('li[data-order =' + todo + ']').hide().css('background-color','#888888').fadeIn('slow');
        setTimeout(function() {
            $('li[data-order =' + todo + ']').css('background-color','black');
          }, 3500);
      };

      return {
        updateView : updateView,
        starHover : onStarHover,
        animate : animateTodo
      };

    };
    
    return TodoView;

});