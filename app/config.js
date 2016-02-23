require.config({
    paths: {
        /* Classes */
        "qr": "lib/classes/qr",
        "cam": "lib/classes/cam",
        "view": "lib/classes/view",

        /* Vendors */
        "jquery-private": "lib/vendor/jquery/jquery.private", //v 1.11
        "jquery": "lib/vendor/jquery/jquery.min", //v 1.11
        "llqrcode": "lib/vendor/llqrcode",
        "twig": "lib/vendor/twig"
    },
    map: {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' }

    }
});