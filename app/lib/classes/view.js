define(["jquery", "twig"], function($, twig) {
    var container,
        templates = {};

    templates.login = twig.twig({
        href: "interface/template/login.twig",
        async: false
    });
    templates.home = twig.twig({
        href: "interface/template/home.twig",
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
        },
        home: function(){
            $(container).html(templates.home.render({
                key: "world"
            }));
        }
    }
});