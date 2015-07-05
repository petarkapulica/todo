;
var Todo = Todo || {};

Todo.Controller = function(){
    //draw view on page reload
    this.doUpdate(this.criteria());
    
    //priority star animation
    $('.priority-star.js-star').on('mouseenter', $.proxy(new Todo.View().onStarHover, Todo.View));  
    
    //on todo submit
    $('#new-todo').on('keydown', $.proxy(this.onSubmit, this));
    //on todo edit submit
    $('body').on('keydown', '.edit-todo-input', $.proxy(this.onEditSubmit, this));
    
    //edit actions
    $('body').on('click', '.ico-check', $.proxy(this.onTodoCheck, this));
    $('body').on('click', '.ico-delete', $.proxy(this.onTodoDelete, this));
    $('body').on('click', '.ico-edit', $.proxy(this.onTodoEdit, this));
    $('body').on('dblclick', '.todo-item', $.proxy(this.onTodoEdit, this));
    $('body').on('click', '.js-changable-star', $.proxy(this.onPriorityEdit, this));
    
    //filter actions
    $('.filter-all').on('click', $.proxy(this.onFilterAll, this));
    $('.filter-active').on('click', $.proxy(this.onFilterActive, this));
    $('.filter-completed').on('click', $.proxy(this.onFilterCompleted, this));
    
    //button actions
    $('.ico-select-all').on('click', $.proxy(this.onSelectAll, this));
    $('.clear-completed').on('click', $.proxy(this.onClearCompleted, this));
    $('.ico-info').on('click', $.proxy(new Todo.View().showAppInfo, Todo.View));
    $('body').on('click', '.about-todo-app', $.proxy(new Todo.View().hideAppInfo, Todo.View));
    $('.recycle-bin').on('click', $.proxy(this.onRecycleBin, this));
    $('body').on('click','.ico-restore', $.proxy(this.onRestore, this));
    $('.ico-sort-priority').on('click', $.proxy(this.onSort, this));
};

Todo.Controller.prototype = {
    
    criteria : function()
    {
        return $('.js-filter').attr('data-filter');
    },
    
    onSubmit : function(event)
    {
        if(event.which === 13 && $('#new-todo').val() !== "")
        {
            new Todo.Model().insertTodo( $('#new-todo').val(), $('.active-star.js-star').length );
            this.doUpdate( this.criteria() );
            new Todo.View().animateTodo( new Todo.Model().getCurrentTodo() );
            $('#new-todo:text').val('');
        }
    },
    
    onTodoCheck : function(event)
    {
        new Todo.Model().updateTodo( this.getTodo(event), false, false );
        this.doUpdate( this.criteria() );
    },
    
    onTodoDelete : function(event)
    {
        new Todo.Model().updateTodo( this.getTodo(event), true );
        this.doUpdate(this.criteria());
    },
    
    onTodoEdit : function(event)
    {
        if($(event.currentTarget).siblings('.edit-todo-input').is(':visible'))
        {
            $(event.currentTarget).siblings('.edit-todo-input').addClass("hidden");
        }
        else
        {
            $('.edit-todo-input').addClass('hidden');
            $(event.currentTarget).siblings('.edit-todo-input').removeClass("hidden");
        }
    },
    
    onPriorityEdit : function(event)
    {
        var newPriority = parseInt($(event.currentTarget).text()) + 1 ;
        newPriority = newPriority > 5 ? 1 : newPriority;
        new Todo.Model().updateTodo( this.getTodo(event), false, true, false, newPriority );
        this.doUpdate( this.criteria() );
    },
    
    onClearCompleted : function()
    {
        new Todo.Model().clearCompleted();
        this.doUpdate( this.criteria() );
    },
    
    getTodo : function(event)
    {
        return $(event.currentTarget).closest('li').attr('data-order');
    },
    
    onFilterAll : function(event)
    {
        this.changeCriteria(event);
        this.doUpdate( this.criteria() );
    },
    
    onFilterActive : function(event)
    {
        this.changeCriteria(event);
        this.doUpdate( this.criteria() );
    },
    
    onFilterCompleted : function(event)
    {
        this.changeCriteria(event);
        this.doUpdate( this.criteria() );
    },
    
    changeCriteria : function(event)
    {
        $('.js-filter').removeClass('js-filter');
        $(event.currentTarget).addClass('js-filter');
    },
    
    onEditSubmit : function(event)
    {
        if(event.which === 13 && $('.edit-todo-input:visible').val() !== "")
        {
            new Todo.Model().updateTodo( this.getTodo(event), false, true, $('.edit-todo-input:visible').val() );
            this.doUpdate(this.criteria());
            $('.edit-todo-input:visible').val('');
        }
    },
    
    onSelectAll : function()
    {
        new Todo.Model().makeAllCompleted();
        this.doUpdate( this.criteria() );
    },
    
    doUpdate : function(criteria,deleted)
    {
        new Todo.View().updateView( 
            new Todo.Model().getFromLocalStorage(criteria),
            new Todo.Model().countLeftItems(),
            deleted
         );
    },
    
    onRecycleBin : function(event)
    {
        this.changeCriteria(event);
        this.doUpdate( this.criteria(), true );
    },
    
    onRestore : function(event)
    {
        new Todo.Model().updateTodo( this.getTodo(event), false, true, false, false );
        this.doUpdate( this.criteria(), true );
    },
    
    onSort : function()
    {
        var deleted = this.criteria() === 'deleted' ? true : false;
        new Todo.View().updateView( 
            new Todo.Model().getFromLocalStorage(this.criteria()).sort(function(a, b) {
                    return parseFloat(b.priority) - parseFloat(a.priority);
                }),
            new Todo.Model().countLeftItems(),
            deleted
         );
    }
};