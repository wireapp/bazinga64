module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browserNoActivityTimeout: 90000,
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    colors: true,
    concurrency: Infinity,
    coverageReporter: {
      reporters: [
        {
          dir: 'coverage',
          type: 'html'
        },
        {
          dir: 'coverage',
          file: 'coverage-summary.txt',
          type: 'text-summary'
        }
      ],
      check: {
        global: {
          statements: 90,
          branches: 60,
          functions: 100,
          lines: 90
        }
      }
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    exclude: [],
    files: [
      'dist/dependencies/**/*.js',
      'dist/browser/**/*.js',
      'test/js/specs/**/*Spec.js'
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'dist/browser/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    singleRun: true
  });

  if (process.env.TRAVIS) {
    config.set({
      port: 9877
    });
  }
};
