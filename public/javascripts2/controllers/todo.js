;
var Todo = Todo || {};

Todo.TodoController = function(){

  //priority stars hover
  $('.priority-star.js-star').on('mouseenter', function(){
    Todo.TodoView().starHover(event);
  });

  //on todo submit
  $('#new-todo').on('keydown', function(event){
    if(event.which === 13 && $('#new-todo').val() !== "")
    {
      Todo.TodoModel().insert( $('#new-todo').val(), $('.active-star.js-star').length );
      doUpdate(criteria());
      Todo.TodoView().animate( Todo.TodoModel().currentTodo() );
      $('#new-todo:text').val('');
    }
  });
  //on edit submit
  $('body').on('keydown', '.edit-todo-input', function(event){
    if(event.which === 13 && $('.edit-todo-input:visible').val() !== "")
    {
      new Todo.Model().updateTodo( this.getTodo(event), false, true, $('.edit-todo-input:visible').val() );
      doUpdate(criteria());
      $('.edit-todo-input:visible').val('');
    }
  });

  var doUpdate = function(criteria, deleted){
    Todo.TodoView().updateView(
      Todo.TodoModel().get(criteria),
      Todo.TodoModel().countLeftItems(),
      deleted
    );
  };

  var criteria = function(){
    return $('.js-filter').attr('data-filter');
  };

  doUpdate(criteria());

};
