module.exports = function (config) {
  config.set({
    basePath: './src',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-reporter'),
    ],

    // Default configuration
    sonarqubeReporter: {
      basePath: './src',
      filePattern: '**/*spec.ts',
      encoding: 'utf-8',
      outputFolder: 'reports',
      legacyMode: false,
      reportName: function (metadata) {
        return 'sonarqube_report.xml';
      },
    },
    client: {
      jasmine: {},
      clearContext: config.singleRun,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/venue-seat-demo'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/venue-seat-demo'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcov' }],
    },

    check: {
      global: {
        statements: 80,
        branches: 75,
        functions: 75,
        lines: 80,
      },
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    restartOnFileChange: true,

    // list of files / patterns to load in the browser
    files: [],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    preprocessors: {},

    // test results reporter to use
    reporters: ['progress', 'kjhtml', 'sonarqube', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    singleRun: false,

    // Concurrency level
    concurrency: Infinity,
  });
};
