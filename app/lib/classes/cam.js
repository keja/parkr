define("cam", ["jquery"], function($){
    var self = this,
        width = 400, //320,
        height = 400, //240,
        video = document.createElement("video"),
        canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        ref_stream = null,
        started = false,
        cams = {};

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
            if(!started){
                $(self).trigger("ready");
            }
            started = true;
        } catch (e) {
            return false;
        }
        return context.getImageData(0, 0, width, height);
    }

    return {
        init: function(callback){
            var gotSources = function(sourceInfos) {
                for (var i = 0; i !== sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind === 'video') {
                        console.log(sourceInfo);
                        cams[i] = sourceInfo;
                    }
                }
                callback.call(this);
            };

            if (typeof MediaStreamTrack !== 'undefined'){
                MediaStreamTrack.getSources(gotSources);
            }else{
                callback.call(this);
            }
        },
        on: function(event, callback){
            $(self).on(event, callback);
        },
        off: function(event, callback){
            $(self).off(event, callback);
        },
        start: function(){
            if(Object.keys(cams).length){
                var constraints = {
                    audio: false,
                    video: {
                        facingMode: "environment",
                        optional: [{sourceId: cams[Object.keys(cams)[Object.keys(cams).length-1]].id}]
                    }
                };
            }else{
                var constraints = {
                    audio: false,
                    video: true
                };
                alert("hej");
            }

            if(navigator.getUserMedia) {
                navigator.getUserMedia(constraints, startStream, startStreamFailed);
            }else if(navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints).then(startStream).catch(startStreamFailed);
            }else if(navigator.webkitGetUserMedia){
                navigator.webkitGetUserMedia(constraints, startStream, startStreamFailed);
            }else if(navigator.mozGetUserMedia){
                navigator.mozGetUserMedia(constraints, startStream, startStreamFailed);
            }


        },
        stop: function(){
            ref_stream.getVideoTracks().forEach(function(stream){
                stream.stop();
            });
        }
    }
});