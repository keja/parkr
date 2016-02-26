define("cam", ["jquery"], function($){
    var self = this,
        width = 400, //320,
        height = 400, //240,
        video = document.createElement("video"),
        canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        ref_stream = null,
        started = false,
        cams = {},
        req_id = 0;

        video.height = height;
        video.width = width;
        canvas.height = height;
        canvas.width = width;

    function startStream(stream) {
        video.src = URL.createObjectURL(stream);
        video.play();
        ref_stream = stream;
        req_id = requestAnimationFrame(draw);
    }
    function startStreamFailed(error){
        alert(error);
    }

    function draw() {
        var frame = readFrame();
        if (frame) {
            $(self).trigger("capture",[frame]);
        }
        req_id = requestAnimationFrame(draw);
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
            cams = [];
            var gotSources = function(sourceInfos) {
                for (var i = 0; i !== sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind === 'video') {
                        //console.log(sourceInfo);
                        cams[i] = sourceInfo.id;
                    }
                }
                callback.call(this);
            };
            if(typeof navigator.mediaDevices !== 'undefined'){
                navigator.mediaDevices.enumerateDevices()
                    .then(function(devices) {
                        devices.forEach(function(device, i) {
                            //console.log(i, device);
                            if(device.kind == "videoinput"){
                                cams[i] = device.deviceId;
                            }
                            //console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
                        });
                        callback.call(this);
                    })
                    .catch(function(err) {
                        alert(err.name + ": " + error.message);
                    });
            }else if (typeof MediaStreamTrack !== 'undefined'){
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
            var constraints = {};
            if(Object.keys(cams).length){
                constraints = {
                    audio: false,
                    video: {
                        optional: [{ sourceId: cams[Object.keys(cams)[Object.keys(cams).length-1]] }]
                    }
                };
            }else{
                constraints = {
                    audio: false,
                    video: true
                };
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
            if(ref_stream){
                ref_stream.getVideoTracks().forEach(function(stream){
                    stream.stop();
                });
            }
            cancelAnimationFrame(req_id);
        }
    }
});