define(["jquery"], function($) {
        var self = this;
        return {
            color: "blue",
            size: "large",
            on: function(event, callback){
                $(self).on(on, callback);
            },
            off: function(event, callback){
                $(self).off(event, callback);
            },
            captureImage: function(canvas){
                if(!canvas){
                    var canvas = document.createElement('canvas'),
                        w = 600,
                        h = 800;
                    canvas = document.getElementById("qr-canvas");
                    canvas.style.width = w + "px";
                    canvas.style.height = h + "px";
                    canvas.width = w;
                    canvas.height = h;
                    gCtx = canvas.getContext("2d");
                    gCtx.clearRect(0, 0, w, h);
                }
            },
            init: function(){
                //test if canvas is supported
                //test if webcam is supported
            }
        }
    }
);