//we use the goog.js lib to load google services ( goog! ) as they do not support Require/AMD and we pull them from google's server.
define("maps", ['jquery', 'goog!maps,3'], function($){

    var map = null,
        me = null,
        markers = [],
        windows = [],
        loaded = false;

    me = {
        init: function(element, cords){
            map = new google.maps.Map(element, {
                center: cords,
                scrollwheel: false,
                zoom: 13
            });
            google.maps.event.addListener(map, 'idle', function(){
                if(!loaded){
                    load = true;
                    $(element).trigger('mapLoaded');
                }
            });
        },
        set: function(){

        },
        navigateToLatLng: function(lat, lng){
            map.setCenter({
                lat: lat,
                lng: lng
            });
        },
        navigateToMarker: function(id){
            var pos = markers[id].position;
            me.navigateToLatLng(pos.lat(), pos.lng());
        },
        addMarker: function(id, cords, title, html, image, callback){

            var settings = {
                map: map,
                position: cords,
                title: title
            };
            if(typeof image != "undefined"){
                settings.icon = image;
            }
            markers[id] = new google.maps.Marker(settings);
            windows[id] = new google.maps.InfoWindow({
                content: html
            });

            markers[id].addListener('click', function() {
                if(typeof callback != "undefined"){
                    callback.call(this, id);
                }
                me.closeMarkers();
                windows[id].open(map, markers[id]);
            });


        },
        removeMarker: function(id){
            markers[id].setMap(null);
            windows[id].close();
            delete(markers[id]);
            delete(windows[id]);
        },
        removeMarkers: function(){
            markers.forEach(function(item, index){
               me.removeMarker(index);
            });
        },
        closeMarkers: function(){
          windows.forEach(function(item, index){
            item.close();
          });
        },
        openMarker: function(id){
            windows[id].open(map, markers[id]);
            //new google.maps.event.trigger( markers[id], 'click' ); //better to trigger click as we might have a callback on the click event.

        },
        resize: function(){
            google.maps.event.trigger(map, 'resize');
        }

    };

    return me;

});