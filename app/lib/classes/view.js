define(["jquery", "twig"], function($, twig) {
    var container,
        templates = {};

    templates.login = twig.twig({
        href: "interface/template/login.twig",
        async: false
    });

    return {
        init: function(containerElement){
            container = containerElement;
        },
        login: function(){
            $(container).html(templates.login.render({
                key: "world"
            }));
        }
    }
});