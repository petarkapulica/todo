define(["twig"], function(Twig){

    var Template = function(Html, context, data){
        var template = Twig.twig({ data: Html });
        $(context).html(template.render(data));
    };

    return Template;
});