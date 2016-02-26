require(["./config"], function(){

    //MAIN APP
    require(["jquery", "view", "qr", "cam", "maps", "datastore"], function($, view, qr, cam, map, datastore){

        datastore.setURI("https://188.166.1.167/api/v1/");


        //QR READER
        var scanFrame = true; //look for qr-code in frames

        qr.init();
        qr.on("decoded", function (event, data) {
            var regex = new RegExp("^[0-9]{3}-[0-9]{4}$", "i");
            if ((data.length > 0) && !regex.test(data)) {
                scanFrame = true; //not valid qr code, keep scanning frames
            } else {
                cam.stop();
                $("#cam").addClass("hidden");
                $("#location_id").val(data);
            }

        });
        qr.on("error", function (event, error) {
            console.log("error:", error);
            scanFrame = true;
        });

        //VIEWS
        view.init($("#view"));
        view.on("change", function(event, page){

            //HOME SCREEN
            if(page == "home") {
                $("nav").removeClass("hidden");

                //check if already parked
                var checkIfParked = $.Deferred();
                datastore.car.getParked(function(parked){
                    checkIfParked.resolve(parked);
                });
                $.when(checkIfParked).done(function(parked) {
                    if(parked.length){

                        $("#parked_car").html(parked[0].title);
                        $("#parked_location").html(parked[0].zone);
                        $("#parked_from").html(parked[0].created_at);
                        $("#parked_to").html(parked[0].expires);
                        $("#parked_rate").html(parked[0].price + " DKK");

                        $("#parkScreen").addClass("hidden");
                        $("#parkedScreen").removeClass("hidden");

                        return;
                    }

                    $("#parkScreen").removeClass("hidden");
                    $("#parkedScreen").addClass("hidden");

                    //make sure no double binds
                    $(document).off("click", "#accessCam");
                    $(document).off("click", "#btn_park");
                    cam.off("capture");

                    var canvas = $("#cam").get(0),
                        ctx = canvas.getContext('2d');

                    cam.init(function () {
                        $(document).on("click", "#accessCam", function () {

                            if ($("#cam:not(.hidden)").length) { //cam is running, stop it
                                $("#cam").addClass("hidden");
                                cam.stop();
                                scanFrame = true;
                            } else {
                                $("#cam").removeClass("hidden");
                                cam.start();
                                scanFrame = true;
                            }
                        });
                        cam.on("capture", function (event, frame) {
                            ctx.putImageData(frame, 0, 0);
                            if (scanFrame) {
                                var img = canvas.toDataURL('image/png');
                                if (img) {
                                    qr.scan(img);
                                }
                                scanFrame = false; //don't scan more than one frame at the same time (reduce cpu time)
                            }
                        });
                    });

                    $(document).on("click", "#btn_park", function () {
                        var full_id = $("#location_id").val().toString().split("-");
                        var location_id = full_id[full_id.length > 0 ? full_id.length -1 : 0],
                            vehicle_id = $("#car_id").val(),
                            duration = $("#duration").val();

                        datastore.car.park(location_id, vehicle_id, duration, function (result) {
                            if (result && result.created_at) {
                                view.home();
                            } else {
                                alert("You can't park there.");
                            }
                        });

                    });
                });
            }

            //LOGIN / CREATE USER SCREEN
            else if(page == "login"){
                $("#login_btn").on("click", function(){
                    var username = $("#form_login_username").val(),
                        password = $("#form_login_password").val();
                    datastore.user.login(username, password, function(result){
                        if(result && result.id){
                            datastore.setUserID(result.id);
                            view.home();
                        }else{
                            alert("Failed to login, try again");
                        }
                    });
                });
                $("#create_account").on("click", function(){
                    var username = $("#form_create_username").val(),
                        password = $("#form_create_password").val(),
                        passw0rd = $("#form_create_password_again").val();

                    if(username.length && password.length && (passw0rd == password)){
                        datastore.user.create(username, password, function(result){
                            if(result && result.id){
                                datastore.setUserID(result.id);
                                view.home();
                            }
                        });
                    }else{
                        alert("form is invalid");
                    }
                });
                $("#register").on("click", function(){
                    $("#login-page, #login-regi-page").hide();
                    $("#register-page").show();
                });
                $("#register-page .back, #login-page .back").on("click", function(){
                    $("#login-regi-page").show();
                    $("#login-page, #register-page").hide();
                });
                $("#login").on("click", function(){
                    $("#login-page").show();
                    $("#register-page, #login-regi-page").hide();
                });

            }

            //MAP SCREEN
            else if(page == "map"){

                map.init($("#google_map").get(0), {
                    lat: 55.403756,
                    lng: 10.402370
                });

                var icon_me = {
                    url: '//noviks.dk/app/interface/graphics/icon_me.svg',
                    size: new google.maps.Size(42, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(21, 50)
                },
                icon_car = {
                    url: '//noviks.dk/app/interface/graphics/icon_car.svg',
                    size: new google.maps.Size(42, 50),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(21, 50)
                },
                icon_p = {
                    url: '//noviks.dk/app/interface/graphics/icon_space.svg',
                    size: new google.maps.Size(21, 25),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10.5, 25)
                };


                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        map.addMarker(0, {lat: position.coords.latitude, lng: position.coords.longitude}, "You are here", "<p>You are here</p>", icon_me);
                    });
                }
                datastore.car.getParked(function(result){
                   if(result.length){ //TODO: add lat & lng from db, when added to db.
                       map.addMarker(1, {lat: 55.403756, lng: 10.402370}, "Your car is here", "<p>Your car are here</p>", icon_car);
                   }
                });
                datastore.location.getAll(function(locations){
                    if(locations.length){
                        locations.forEach(function(location, index){
                            map.addMarker(5+index, {lat: location.lat, lng: location.long}, "you can park here", "", icon_p);
                        })
                    }
                })

            }

            //SETTINGS SCREEN
            else if(page == "settings"){

                $(document).off("click", "#addCar");
                $(document).on("click", "#addCar", function(){
                    var plate = prompt("Licence plate");
                    var title = prompt("Short description of car");
                    if(plate && title){
                        datastore.car.add(title, plate, function(result){
                           if(result){
                               view.settings();
                           }else{
                               alert("failed save create car");
                           }
                        });
                    }
                });


                $(document).on("click", ".settings-button-edit", function(){
                    $(this).parent().find("p").attr("contenteditable", true).focus();
                });

                $("#btn_logout").on("click", function(){
                   datastore.user.logout(function(){
                       view.login();
                       $("#login-page").show();
                       $("#register-page, #login-regi-page").hide();
                       $("nav").addClass("hidden");
                   });
                });

            }


        });

        view.login();


        //NAVIGATION BAR
        $(document).on("click", "nav li", function(){
           var target = $(this).find("a").data("target");
            try {
                view[target]();
                $("nav ul li").removeClass("active");
                $(this).addClass("active");
            }catch(e){
                console.log(view);
                console.log("View: " + target + ", not found");
            }
        });

    });

});