require(["./config"], function(){

    //main app
    require(["jquery", "qr", "cam"], function($, qr, cam){
        console.log("here");

        var canvas = $("#cam").get(0),
            ctx = canvas.getContext('2d');


        qr.init();
        qr.on("decoded", function(event, data){
            console.log(data);
            cam.stop();
        });
        qr.on("error", function(event, error){
           console.log("error:", error);
            scanFrame = true;
        });

        cam.start();
        var scanFrame = true;
        cam.on("capture", function(event, frame){
            ctx.putImageData(frame, 0, 0);

            if(scanFrame){
                //qr.scan(canvas.toDataURL('image/png'));
                scanFrame = false;
            }
        });
        setTimeout(function(){
            cam.stop();
        }, 5000);
    });

});