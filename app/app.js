require(["./config"], function(){

    //main app
    require(["jquery", "view", "qr", "cam"], function($, view, qr, cam){


        var canvas = $("#cam").get(0),
            ctx = canvas.getContext('2d'),
            scanFrame = true; //look for qr-code in frames

        qr.init();
        qr.on("decoded", function(event, data){
            var regex = new RegExp("^[0-9]{3}-[0-9]{4}$", "i");
            if ((data.length > 0) && !regex.test(data)) {
                scanFrame = true; //not valid qr code, keep scanning frames
            }else{
                cam.stop();
                $("#cam").addClass("hidden");
                $("#location_id").val(data);
            }

        });
        qr.on("error", function(event, error){
            console.log("error:", error);
            scanFrame = true;
        });

        cam.init(function(){
            console.log("init cam");
            $("#accessCam").on("click", function(){
                $("#cam").removeClass("hidden");
                cam.start();
                scanFrame = true;
            });
            cam.on("capture", function(event, frame){
                ctx.putImageData(frame, 0, 0);
                if(scanFrame){
                    var img = canvas.toDataURL('image/png');
                    if(img){
                        qr.scan(img);
                    }

                    scanFrame = false; //don't scan more than one frame at the same time (reduce cpu time)
                }
            });
        });

        /*
        view.init($("#view").get(0));
        view.login();
*/





    });

});