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
                //make sure no double binds
                $(document).off("click", "#accessCam");
                $(document).off("click", "#btn_park");
                cam.off("capture");

                var canvas = $("#cam").get(0),
                    ctx = canvas.getContext('2d');

                cam.init(function() {
                    $(document).on("click", "#accessCam", function(){

                        if($("#cam:not(.hidden)").length){ //cam is running, stop it
                            $("#cam").addClass("hidden");
                            cam.stop();
                            scanFrame = true;
                        }else{
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

                $(document).on("click", "#btn_park", function(){
                    var location_id = $("#location_id").val(),
                        vehicle_id = $("#car_id").val(),
                        duration = $("#duration").val();

                    datastore.car.park(location_id, vehicle_id, duration, function(result){
                        console.log(result);
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
                map.addMarker(1, {lat: 55.403756, lng: 10.402370}, "Your car is here", "<p>Your car are here</p>", icon_car);

            }

        });

        //delay load
        view.login();
        //setTimeout(function(){view.home();}, 1500);


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