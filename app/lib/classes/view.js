define(["jquery", "twig", "datastore", "cookies"], function($, twig, datastore, cookie) {
    var container,
        templates = {};

    datastore.setURI("https://188.166.1.167/api/v1/");

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

    var r = {
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
            var userid = cookie.get("login");
            if(userid){
                datastore.setUserID(userid); //yup it is that insecure, but hey its a prototype #DealWithIt
                r.home();
            }else{
                $(container).html(templates.login.render());
                cb("login");
            }
        },
        home: function(){
            var awaitCars = $.Deferred();
            var awaitCards = $.Deferred();

            datastore.car.getAll(function(cars){
                awaitCars.resolve(cars);
            });
            datastore.creditcard.getAll(function(cards){
                awaitCards.resolve(cards);
            });

            $.when(awaitCars, awaitCards).done(function(cars, cards) {
                $(container).html(templates.home.render({
                    cars: cars,
                    cards: cards
                }));
                cb("home");
            });
        },
        map: function(){
            var awaitParkedCars = $.Deferred();
            datastore.car.getParked(function(locations){
                awaitParkedCars.resolve(locations);
            });
            $.when(awaitParkedCars).done(function(cars){
                console.log(cars);
                $(container).html(templates.map.render({
                    cars: cars
                }));
                cb("map");
            });
        },
        stats: function(){
            var awaitStatsInactive = $.Deferred();
            var awaitStatsActive = $.Deferred();

            datastore.car.getHistory(function(entities){
                awaitStatsInactive.resolve(entities);
            });
            datastore.car.getParked(function(entities){
                awaitStatsActive.resolve(entities);
            });
            $.when(awaitStatsActive, awaitStatsInactive).done(function(active, inactive) {
                $(container).html(templates.stats.render({
                    active: active,
                    inactive: inactive
                }));
                cb("stats");
            });
        },
        settings: function(){
            var awaitCars = $.Deferred();
            var awaitCards = $.Deferred();

            datastore.car.getAll(function(cars){
                awaitCars.resolve(cars);
            });
            datastore.creditcard.getAll(function(cards){
                awaitCards.resolve(cards);
            });

            $.when(awaitCars, awaitCards).done(function(cars, cards) {
                $(container).html(templates.settings.render({
                    cars: cars,
                    cards: cards
                }));
                cb("settings");
            });


        }
    };
    return r;
});