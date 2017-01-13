var bower = require('gulp-bower');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var gulpTypings = require('gulp-typings');
var gutil = require('gulp-util');
var header = require('gulp-header');
var Jasmine = require('jasmine');
var nightwatch = require('gulp-nightwatch');
var path = require('path');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var webpack = require('webpack');

var paths = {
  dist: 'dist',
  dist_browser: 'dist/browser',
  dist_definitions: 'dist/definitions',
  dist_node: 'dist/node',
  src: 'src',
  src_ts: 'src/ts'
};

gulp.task('dist', function(done) {
  runSequence('lint_ts', 'dist_node', 'dist_browser', done);
});

gulp.task('dist_browser', function(callback) {
  webpack(require('./webpack.config.js'), function(error) {
    if (error) {
      throw new gutil.PluginError('webpack', error);
    }
    callback();
  });
});

gulp.task('dist_node', function() {
  var tsProject = ts.createProject('tsconfig.json');

  var tsResult = tsProject.src().pipe(ts(tsProject));
  return tsResult.js.pipe(gulp.dest(paths.dist_node));
});

gulp.task('lint_ts', function() {
  return gulp.src(paths.src_ts + '/**/*.ts')
    .pipe(tslint({formatter: 'verbose'}))
    .pipe(tslint.report());
});

gulp.task('default', function(done) {
  runSequence('install', 'dist', 'dev', done);
});

gulp.task('dev', function() {
  gulp.watch(paths.src_ts + '/**/*.ts', ['dist_browser']);
  gulp.watch(paths.dist + '/**/*.*').on('change', browserSync.reload);

  browserSync.init({
    port: 3636,
    server: {baseDir: './'},
    startPath: '/' + paths.dist
  });
});

gulp.task('install', ['install_typings'], function() {
});

gulp.task('install_bower', function() {
  return bower({cmd: 'install'});
});

gulp.task('install_typings', function() {
  return gulp.src('typings.json')
    .pipe(gulpTypings());
});

gulp.task('test', function(done) {
  runSequence('test_node', 'test_browser', done);
});

gulp.task('test_browser', function(done) {
  gutil.log(gutil.colors.yellow('Running tests in Google Chrome:'));

  var server = new Server({
    configFile: __dirname + '/karma.conf.js',
    files: [
      'test/js/helpers/**/*.js',
      paths.dist_browser + '/**/*.js',
      'test/js/specs/**/*Spec.js'
    ]
  }, done);

  server.start();
});

gulp.task('test_node', function(done) {
  gutil.log(gutil.colors.yellow('Running tests on Node.js:'));

  var jasmine = new Jasmine();

  jasmine.loadConfig({
    spec_files: [
      'test/js/specs/**/*Spec.js'
    ],
    helpers: [
      'test/js/helpers/**/*.js'
    ]
  });

  jasmine.configureDefaultReporter({
    showColors: true
  });

  jasmine.onComplete(function(passed) {
    if (passed) {
      done();
    } else {
      done(new Error('Node.js tests failed.'));
    }
  });

  return jasmine.execute();
});

gulp.task('test_e2e', function() {
  browserSync.init({
    open: false,
    port: 3636,
    server: {baseDir: './'}
  });

  return gulp.src('')
    .pipe(nightwatch({
      configFile: 'test/e2e/nightwatch.json'
    }))
    .on('error', function(error) {
      gutil.log(gutil.colors.red('Error during test:'), error.message);
      process.exit();
    })
    .on('end', process.exit);
});

gulp.task('dev_tdd', function() {
  gutil.log(gutil.colors.yellow('TDD'));

  var server = new Server({
    autoWatch: true,
    configFile: __dirname + '/karma.conf.js',
    reporters: ['progress'],
    singleRun: false
  });

  server.start();
});
