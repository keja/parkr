define(['async', 'propertyParser'], function (async, propertyParser) {

    var rParts = /^([^,]+)(?:,([^,]+))?(?:,(.+))?/;

    function parseName(name){
        var match = rParts.exec(name),
            data = {
                moduleName : match[1],
                version : match[2] || '1'
            };
        data.settings = propertyParser.parseProperties(match[3]);
        return data;
    }

    return {
        load : function(name, req, onLoad, config){
            if (config.isBuild) {
                onLoad(null); //avoid errors on the optimizer
            } else {
                var data = parseName(name),
                    settings = data.settings;

                settings.callback = onLoad;

                req(['async!'+ (document.location.protocol === 'https:'? 'https' : 'http') +'://www.google.com/jsapi'], function(){
                    google.load(data.moduleName, data.version, settings);
                });
            }
        }
    };

});