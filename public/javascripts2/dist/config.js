;(function() {

  var config = {
    baseUrl: '/public/javascripts2/src',
    paths: {
      jquery: '../../bower/jquery/dist/jquery',
      twig : '../../bower/twig.js/twig',
      text : '../../bower/text/text',
      templates:"../../templates"
    },
    shim: {

    }
  };

  if ((typeof module != 'undefined') && (module.exports)) { // Node Module
  module.exports = config;
  } else if (typeof window != 'undefined') { // Fall back to attaching to window
  window.SiteConfig = config;
  };
}).call(this);
