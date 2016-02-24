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
        },
        map: function(){
            $(container).html(templates.map.render({
                key: "world"
            }));
        },
        stats: function(){
            $(container).html(templates.stats.render({
                key: "world"
            }));
        },
        settings: function(){
            $(container).html(templates.settings.render({
                key: "world"
            }));
        }
    }
});