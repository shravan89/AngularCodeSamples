require.config({
    waitSeconds: 200,
    paths: {
        'angular': 'bower_components/angular/angular',
        'angularRoute': 'bower_components/angular-route/angular-route',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'handlebar': 'bower_components/handlebars/handlebars'
    },
    shim: {
        angularRoute: {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports : 'angular'
        },
        jquery:{
            exports:'jquery'
        },
        handlebar:{
            exports:'handlebar'
        }
    },
    baseUrl: '/'
});

require(['app'], function (app) {
    app.init();
});


