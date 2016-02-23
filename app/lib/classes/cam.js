define("cam", ["jquery"], function($){
    var self = this,
        width = 320,
        height = 240,
        video = document.createElement("video"),
        canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        ref_stream = null;

        video.height = height;
        video.width = width;
        canvas.height = height;
        canvas.width = width;

    function startStream(stream) {
        video.src = URL.createObjectURL(stream);
        video.play();
        ref_stream = stream;
        requestAnimationFrame(draw);
    }
    function startStreamFailed(error){
        console.error(error);
    }

    function draw() {
        var frame = readFrame();
        if (frame) {
            $(self).trigger("capture",[frame]);
        }
        requestAnimationFrame(draw);
    }

    function readFrame() {
        try {
            context.drawImage(video, 0, 0, width, height);
        } catch (e) {
            return false;
        }
        return context.getImageData(0, 0, width, height);
    }

    return {
        on: function(event, callback){
            $(self).on(event, callback);
        },
        off: function(event, callback){
            $(self).off(event, callback);
        },
        start: function(){
            if(navigator.getUserMedia) { 
                navigator.getUserMedia({video: true, audio: false}, startStream, startStreamFailed); 
            }else if(navigator.mediaDevices.getUserMedia) { 
                navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false}).then(startStream).catch(startStreamFailed); 
            }else if(navigator.webkitGetUserMedia){ 
                navigator.webkitGetUserMedia({video:true, audio: false}, startStream, startStreamFailed); 
            }else if(navigator.mozGetUserMedia){ 
                navigator.mozGetUserMedia({video: true, audio: false}, startStream, startStreamFailed);
             }
        },
        stop: function(){
            ref_stream.getVideoTracks()[0].stop();
        }
    }
});