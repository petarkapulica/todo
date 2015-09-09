;
requirejs.config(SiteConfig);

require([
  'jquery',
  'controllers/todo'
],function($, TodoController) {

  $(function(){
      
    TodoController();

  });

});