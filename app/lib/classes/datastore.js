define(["jquery"], function(){

    var resource_uri = "";

    var car = {
        getByID: function(){

        },
        getAll: function(){

        },
        edit: function(){

        },
        add: function(){

        },
        remove: function(){

        }
    };

    var creditcard = {
        getAll: function(){

        },
        edit: function(){

        },
        add: function(){

        },
        remove: function(){

        }
    };

    var user = {
        login: function(){

        },
        logout: function(){

        },
        create: function(){

        },
        getID: function(){

        }
    };

    var location = {
        getByID: function(){

        },
        getAll: function(){

        }
    };

    return {
        setURI: function(uri){
            resource_uri = uri;
        },
        car: car,
        creditcard: creditcard,
        user: user,
        location: location
    }

});