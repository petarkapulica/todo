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
      Todo.TodoModel().update( getTodo(event), false, true, $('.edit-todo-input:visible').val() );
      doUpdate(criteria());
      $('.edit-todo-input:visible').val('');
    }
  });

  //edit actions
  $('body').on('click', '.ico-edit', function(event){
    todoEdit(event);
  });
  $('body').on('dblclick', '.todo-item', function(event){
    todoEdit(event);
  });
  $('body').on('click', '.ico-check', function(event){
    Todo.TodoModel().update( getTodo(event), false, false );
    doUpdate(criteria());
  });
  $('body').on('click', '.ico-delete', function(event){
    Todo.TodoModel().update( getTodo(event), true );
    doUpdate(criteria());
  });
  $('body').on('click', '.js-changable-star', function(event){
    var newPriority = parseInt($(event.currentTarget).text()) + 1 ;
    newPriority = newPriority > 5 ? 1 : newPriority;
    Todo.TodoModel().update( getTodo(event), false, true, false, newPriority );
    doUpdate(criteria());
  });

  //filter actions
  $('.filter-all, .filter-active, .filter-completed').on('click', function(event){
    changeCriteria(event);
    doUpdate(criteria());
  });

  //button actions
  $('.ico-select-all').on('click', function(){
    Todo.TodoModel().completeAll();
    doUpdate(criteria());
  });
  $('.clear-completed').on('click', function(){
    Todo.TodoModel().clear();
    doUpdate(criteria());
  });
  $('.ico-info').on('click', function(){
    $('.about-todo-app').fadeIn();
    $('.todos').css('opacity',0.1);
  });
  $('body').on('click', '.about-todo-app', function(){
    $('.about-todo-app').hide();
    $('.todos').css('opacity',1);
  });
  $('.recycle-bin').on('click', function(){
    changeCriteria(event);
    doUpdate( criteria(), true );
  });
  $('body').on('click','.ico-restore', function(event){
    Todo.TodoModel().update( getTodo(event), false, true, false, false );
    doUpdate( criteria(), true );
  });
  $('.ico-sort-priority').on('click', function(){
    var deleted = criteria() === 'deleted' ? true : false;
    Todo.TodoView().updateView(
      Todo.TodoModel().get( criteria() ).sort(function(a, b) {
        return parseFloat(b.priority) - parseFloat(a.priority);
      }),
      Todo.TodoModel().countLeftItems(),
      deleted
     );
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

  var getTodo = function(event){
    return $(event.currentTarget).closest('li').attr('data-order');
  };

  var todoEdit = function(event){
    if($(event.currentTarget).siblings('.edit-todo-input').is(':visible'))
    {
      $(event.currentTarget).siblings('.edit-todo-input').addClass("hidden");
    }
    else
    {
      $('.edit-todo-input').addClass('hidden');
      $(event.currentTarget).siblings('.edit-todo-input').removeClass("hidden");
    }
  };

  var changeCriteria = function(event){
    $('.js-filter').removeClass('js-filter');
    $(event.currentTarget).addClass('js-filter');
  };

  doUpdate(criteria());

};
