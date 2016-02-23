require(["./config"], function(){

    //main app
    require(["jquery", "qr", "cam"], function($, qr, cam){


        var canvas = $("#cam").get(0),
            ctx = canvas.getContext('2d');


        qr.init();
        qr.on("decoded", function(event, data){
            var regex = new RegExp("^[0-9]{3}-[0-9]{4}$", "i");
            if ((data.length > 0) && !regex.test(data)) {
                scanFrame = true; //not valid qr code, keep scanning frames
            }else{
                cam.stop();
                console.log("QR found:", data);
            }

        });
        qr.on("error", function(event, error){
            console.log("error:", error);
            scanFrame = true;
            qr.init();
        });

        cam.start();

        /*
        cam.on("ready", function(){

            setTimeout(function(){
                scanFrame = true;

            }, 2500);
        });
        */
        var scanFrame = true;
        cam.on("capture", function(event, frame){
            ctx.putImageData(frame, 0, 0);

            if(scanFrame){
                qr.scan(canvas.toDataURL('image/png'));
                scanFrame = false;
            }
        });

    });

});