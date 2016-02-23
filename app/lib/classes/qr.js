define(["jquery", "llqrcode"], function($) {
    var self = this;

    return {
        on: function(event, callback){
            $(self).on(event, callback);
        },
        off: function(event, callback){
            $(self).off(event, callback);
        },
        init: function(){
            qrcode.callback = function(data) {
                $(self).trigger("decoded", [data]);
            };
        },
        scan: function(image){
            try{
                qrcode.decode(image);
            }catch(error){
                $(self).trigger("error", [error]);
            }

        }
    }
});

