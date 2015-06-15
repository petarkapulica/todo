;
var Todo = Todo || {};

Todo.View = function(){
    
};

Todo.View.prototype = {
    
    updateView : function(todos, itemsLeft, deleted)
    {
        !deleted ? 
        this.showTodos(todos) : 
        this.showDeletedTodos(todos);
        if(todos){ this.showSettings(); }
        this.showItemsLeft(itemsLeft);
    },
    
    showTodos : function(todos)
    {
        $('.todo-list ul').html('');
        $.each(todos,$.proxy(this.drawTodos,this));
        $('.todos-wrapper').show();
    },
    
    showDeletedTodos : function(todos)
    {
        $('.todo-list ul').html('');
        $.each(todos,$.proxy(this.drawDeletedTodos,this));
        $('.todos-wrapper').hide();
    },
    
    drawTodos : function(key, value)
    {
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
    },
    
    drawDeletedTodos : function(key, value)
    {
        var html;
        html = "<li data-order=" + (value.order) + ">";
        html += "<div class='todo-item left'>";
        html += "<div class='todo-text ";
        if(value.completed){ html += "js-completed"; }
        html += "'>" + value.name + "</div>";
        html += "</div>";
        html += "<div title='restore todo' class='ico ico-restore right'></div>";
        $('.todo-list ul').append(html);
    },
    
    showSettings : function()
    {
        $('.todo-nav').fadeIn().css('display','inlineBlock');
    },
    
    hideSettings : function()
    {
        $('.todo-nav').hide();   
    },
    
    onStarHover : function(event)
    {
        $(event.currentTarget).hasClass('active-star') ?
        $(event.currentTarget).nextAll("div").removeClass('active-star'):
        $(event.currentTarget).addClass('active-star').prevAll("div").addClass('active-star');
    },
    
    showItemsLeft : function(itemsLeft)
    {
        var word = itemsLeft > 1 ? ' items':' item';
        $('.todos-left p').html(itemsLeft + word +  ' left');
    },
    
    showAppInfo : function()
    {
        $('.about-todo-app').fadeIn();
        $('.todos').css('opacity',0.1);
    },
    
    hideAppInfo : function()
    {
        $('.about-todo-app').hide();
        $('.todos').css('opacity',1);
    },
    
    animateTodo : function(todo)
    {
      $('li[data-order =' + todo + ']').hide().css('background-color','#888888').fadeIn('slow');
      setTimeout(function() {
          $('li[data-order =' + todo + ']').css('background-color','black');
        }, 3500);
    }
    
};