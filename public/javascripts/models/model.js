;
var Todo = Todo || {};

Todo.Model = function(){
    
};

Todo.Model.prototype = {
    
    todos : [],
    
    remaining : 0,
    
    insertTodo : function(name, priority)
    {
        var todo = {
            name : name,
            priority : priority || 1,
            completed : false,
            deleted : false,
            order : this.makeOrder(),
            modified : $.now()
        };
        this.todos.push(todo);
        this.pushToLocalStorage();
    },
    
    makeOrder : function()
    {
        return this.getFromLocalStorage() ? 
        parseInt( this.getFromLocalStorage().slice(-1)[0].order + 1 ):
        1 ;
    },
    
    pushToLocalStorage : function()
    {
        localStorage.todos = JSON.stringify(this.todos);
    },
    
    getFromLocalStorage : function(criteria)
    {
        var todos = localStorage.todos !== undefined ?
        JSON.parse(localStorage.todos) : false;
        switch(criteria) {
            case 'all': return this.getAllTodos(todos);
            break;
            case 'active': return this.getActiveTodos(todos);
            break;
            case 'completed': return this.getCompletedTodos(todos);
            break;
            case 'deleted': return this.getDeletedTodos(todos);
            break;
            default: return this.getTodos(todos);
        };
    },
    
    getAllTodos : function(todos)
    {
        this.todos = [];
        if(todos)
        {
            $.each(todos,$.proxy(this.allTodos, this));
            return this.todos;
        }
        else
        {
            return false;
        }
    },
    
    allTodos : function(key, value)
    {
        if(!value.deleted)
        {
            this.todos.push(value);
        }
    },
    
    getActiveTodos : function(todos)
    {
        this.todos = [];
        if(todos)
        {
            $.each(todos,$.proxy(this.activeTodos, this));
            return this.todos;
        }
        else
        {
            return false;
        } 
    },
    
    activeTodos : function(key, value)
    {
        if(!value.completed && !value.deleted)
        {
            this.todos.push(value);
        }
    },
    
    getCompletedTodos : function(todos)
    {
        this.todos = [];
        if(todos)
        {
            $.each(todos,$.proxy(this.completedTodos, this));
            return this.todos;
        }
        else
        {
            return false;
        } 
    },
    
    completedTodos : function(key, value)
    {
        if(value.completed && !value.deleted)
        {
            this.todos.push(value);
        }
    },
    
    getDeletedTodos : function(todos)
    {
        this.todos = [];
        if(todos)
        {
            $.each(todos,$.proxy(this.deletedTodos, this));
            return this.todos;
        }
        else
        {
            return false;
        } 
    },
    
    deletedTodos : function(key, value)
    {
        if(value.deleted)
        {
            this.todos.push(value);
        }
    },
    
    getTodos : function(todos)
    {
        this.todos = [];
        if(todos)
        {
            $.each(todos,$.proxy(this.todo, this));
            return this.todos;
        }
        else
        {
            return false;
        } 
    },
    
    todo : function(key, value)
    {
        this.todos.push(value);
    },
    
    updateTodo : function(todoOrder, newDeleted, newCompleted, newName, newPriority)
    {
        var oldTodo;
        $.each(this.getFromLocalStorage(),function(key, value){
            if(value.order == todoOrder)
            {
                oldTodo = value;
            }
        });
        oldTodo.deleted = newDeleted;
        if(newCompleted === false)
        {
            newCompleted === oldTodo.completed ?
            oldTodo.completed = !newCompleted:
            oldTodo.completed = newCompleted;
        }
        oldTodo.name = newName || oldTodo.name;
        oldTodo.priority = newPriority || oldTodo.priority;
        var newTodo = oldTodo;
        this.updateLocalStorage(newTodo, todoOrder);
    },
    
    updateLocalStorage : function(newTodo, todoOrder)
    {
        this.createTodosArray();
        $.extend( this.todos[todoOrder - 1], newTodo );
        this.pushToLocalStorage();
    },
    
    createTodosArray : function()
    {
        this.todos = this.getFromLocalStorage();
    },
    
    countLeftItems : function()
    {
        this.remaining = 0;
        $.each( this.getFromLocalStorage(),$.proxy(this.todosLeft,this) );
        return this.remaining;
    },
    
    todosLeft : function(key,value)
    {
        if(!value.completed && !value.deleted)
        {
            this.remaining ++; 
        }
    },
    
    clearCompleted : function()
    {
        this.createTodosArray();
        $.each(this.todos, $.proxy(this.clearTodo, this));
        this.pushToLocalStorage();
    },
    
    clearTodo : function(key,value)
    {
        if(value.completed && !value.deleted)
        {
            value.deleted = true;
        }
    },
    
    makeAllCompleted : function()
    {
        this.createTodosArray();
        $.each(this.todos, $.proxy(this.completeTodo, this));
        this.pushToLocalStorage();
    },
    
    completeTodo : function(key, value)
    {
        value.completed = true;
    },
    
    getCurrentTodo : function()
    {
        var todoArr = this.getFromLocalStorage();
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
    }
    
};