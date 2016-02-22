require.config({
    paths: {
        /* Classes */
        "qr": "lib/classes/qr",
        "webcam": "lib/classes/webcam",

        /* Vendors */
        "jquery": "lib/vendor/jquery/jquery.private",
        "llqrcode": "lib/vendor/llqrcode"
        //"twig": host + "/vendor/twig/twig.min",
    },
    map: {
        "*": {
            "jquery": "lib/vendor/jquery/jquery.min"
        }
    }
});