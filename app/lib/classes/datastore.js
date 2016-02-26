define(["jquery", "cookies"], function($, cookie){

    var resource_uri = "",
        user_id = cookie.get("login") || 0;

    $(document).ajaxError(function(err, xhr) {
        if(err.statusText == "error"){
            window.location.href = " https://188.166.1.167";
        }
    });

    var car = {
        getByID: function(){

        },
        getAll: function(callback){
            $.ajax({
                url: resource_uri + "user/" + user_id + "/vehicles",
                method: "GET",
                type: "json",
                success: callback
            });
        },
        getParked: function(callback){
            $.ajax({
                url: resource_uri + "user/" + user_id + "/active",
                method: "GET",
                type: "json",
                success: callback
            });
        },
        getHistory: function(callback){
            $.ajax({
                url: resource_uri + "user/" + user_id + "/history",
                method: "GET",
                type: "json",
                success: callback
            });
        },
        park: function(location_id, vehicle_id, duration, callback){
            $.ajax({
                url: resource_uri + "log",
                method: "POST",
                success: callback,
                error: function(){
                    callback.call(this, {
                        created_at: false
                    });
                },
                data: {
                    "location_id": location_id,
                    "owner_id": user_id,
                    "vehicle_id": vehicle_id,
                    "expires": parseInt(new Date().getTime() / 1000)  + (parseInt(duration) * 60)
                }
            });
        },
        edit: function(){

        },
        add: function(title, plate, callback){
            $.ajax({
                url: resource_uri + "vehicle",
                method: "POST",
                type: "json",
                success: callback,
                data: {
                    owner_id: user_id,
                    plate: plate,
                    title: title
                }
            });
        },
        remove: function(){

        }
    };

    var creditcard = { /* no backend for this, as there is no payment gateway, so no need to store this information */
        getAll: function(callback){
            var result = [
                {id: 1, cardnumber: "1234-5678-9012-7644"},
                {id: 2, cardnumber: "5678-1234-1234-5678"}
            ];
            callback.call(this, result);
        },
        edit: function(){

        },
        add: function(){

        },
        remove: function(){

        }
    };

    var user = {
        login: function(username, password, callback){
            $.ajax({
                url: resource_uri + "user/login",
                method: "POST",
                type: "json",
                success: function(result, text, xhr){
                    if(xhr.status != 401 && xhr.status != 500){
                        callback.call(this, result);
                    }else{
                        callback.call(this, {
                            id: false
                        });
                    }
                },
                error: function(){
                    callback.call(this, {
                       id: false
                    });
                },
                data: {
                    email: username + "@dummy.mail",
                    password: password
                }
            });
        },
        logout: function(callback){
            cookie.delete("login");
            callback.call(this);
        },
        create: function(username, password, callback){
            $.ajax({
                url: resource_uri + "user",
                method: "POST",
                type: "json",
                success: callback,
                data: {
                    name: username,
                    email: username + "@dummy.mail",
                    username: username,
                    password: password
                }
            });
        },
        getID: function(){

        }
    };

    var location = {
        getByID: function(){

        },
        getAll: function(callback){
            $.ajax({
                url: resource_uri + "locations",
                method: "GET",
                type: "json",
                success: callback
            });
        }
    };


    return {
        setURI: function(uri){
            resource_uri = uri;
        },
        setUserID: function(userid){
            user_id = userid;
            cookie.set("login", userid, 250);
        },
        car: car,
        creditcard: creditcard,
        user: user,
        location: location
    }

});