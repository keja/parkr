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
    templates.map = twig.twig({
        href: "interface/template/map.twig",
        async: false
    });
    templates.stats = twig.twig({
        href: "interface/template/stats.twig",
        async: false
    });
    templates.settings = twig.twig({
        href: "interface/template/settings.twig",
        async: false
    });

    var cb = function(page){
        $(container).trigger("change", [page]).data("active", page);
    };

    return {
        init: function(containerElement, callback){
            container = containerElement;
            if(callback){
                cb = callback;
            }
        },
        on: function(event, callback){
            $(container).on(event, callback);
        },
        login: function(){
            $(container).html(templates.login.render({
                key: "world"
            }));
            cb("login");
        },
        home: function(){
            $(container).html(templates.home.render({
                key: "world"
            }));
            cb("home");
        },
        map: function(){
            $(container).html(templates.map.render({
                key: "world"
            }));
            cb("map");
        },
        stats: function(){
            $(container).html(templates.stats.render({
                key: "world"
            }));
            cb("stats");
        },
        settings: function(){
            $(container).html(templates.settings.render({
                key: "world"
            }));
            cb("settings");
        }
    }
});