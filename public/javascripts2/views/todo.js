;

define([],function(){

    TodoView = function(){

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
        $.each(todos,function(key,value){
          drawTodos(key,value);
        });
        $('.todos-wrapper').show();
      };

      var showDeletedTodos = function(todos){
        $('.todo-list ul').html('');
        $.each(todos,function(key,value){
          drawDeletedTodos(key,value);
        });
        $('.todos-wrapper').hide();
      };

      var showSettings = function(){
        $('.todo-nav').fadeIn().css('display','inlineBlock');
      };

      var showItemsLeft = function(itemsLeft){
        var word = itemsLeft > 1 ? ' items':' item';
        $('.todos-left p').html(itemsLeft + word +  ' left');
      };

      var drawTodos = function(key, value){
        var html;
        html = "<li data-order=" + (value.order) + ">";
        html += "<div class='ico ico-check left ";
        if(value.completed){ html += "js-completed"; }
        html += "'></div>";
        html += "<div class='todo-item left'>";
        html += "<div class='todo-text ";
        if(value.completed){ html += "js-completed"; }
        html += "'>" + value.name + "</div>";
        html += "<span class='priority-star active-star js-changable-star right'>" + value.priority +"</span>";
        html += "</div>";
        html += "<div class='ico ico-edit right'></div>";
        html += "<div class='ico ico-delete right'></div>";
        html += "<input type='text' class='edit-todo-input hidden'/>";
        html += "</li>";
        $('.todo-list ul').append(html);
      };

      var drawDeletedTodos = function(key,value){
        var html;
        html = "<li data-order=" + (value.order) + ">";
        html += "<div class='todo-item left'>";
        html += "<div class='todo-text ";
        if(value.completed){ html += "js-completed"; }
        html += "'>" + value.name + "</div>";
        html += "</div>";
        html += "<div title='restore todo' class='ico ico-restore right'></div>";
        $('.todo-list ul').append(html);
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