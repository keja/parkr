//http://www.openalpr.com/demo-image.html

//capture image
define(["jquery"], function($) {
    var self = this;
    return {
        color: "blue",
        size: "large",
        on: function(event, callback){
            $(self).on(event, callback);
        },
        off: function(event, callback){
            $(self).off(event, callback);
        },
        decode: function(image){

        },
        init: function(){
            //test if canvas is supported
            //test if webcam is supported
        }
    }
});