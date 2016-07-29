//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'geolocation/*.js',
      // 'geolocation/geolocation_test.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'requirejs'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      "karma-requirejs",
      'karma-junit-reporter'
    ],


    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    browserNoActivityTimeout: 100000

  });
};
