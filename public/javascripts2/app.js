;
requirejs.config({
    baseUrl: 'public/javascripts2',
    paths: {
        jquery: 'bower/jquery/dist/jquery'
    }
});

require([
  'jquery',
  'controllers/todo'
],function($, TodoController) {

  $(function(){
      
    TodoController();

  });

});