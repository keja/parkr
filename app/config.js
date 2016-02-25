require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        /* Classes */
        "qr": "lib/classes/qr",
        "cam": "lib/classes/cam",
        "view": "lib/classes/view",
        "maps": "lib/classes/maps",
        "datastore": "lib/classes/datastore",

        /* Vendors */
        "jquery-private": "lib/vendor/jquery/jquery.private", //v 1.11
        "jquery": "lib/vendor/jquery/jquery.min", //v 1.11
        "llqrcode": "lib/vendor/llqrcode",
        "twig": "lib/vendor/twig",
        "goog": "lib/vendor/goog",
        "async": "lib/vendor/async",
        "propertyParser": "lib/vendor/propertyParser"
    },
    map: {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' }

    }
});