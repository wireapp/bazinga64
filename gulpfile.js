var assets = require('gulp-bower-assets');
var bower = require('gulp-bower');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var gulpTypings = require('gulp-typings');
var gutil = require('gulp-util');
var header = require('gulp-header');
var jasmine = require('gulp-jasmine');
var nightwatch = require('gulp-nightwatch');
var path = require('path');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var paths = {
  dist: 'dist',
  dist_browser: 'dist/browser',
  dist_definitions: 'dist/definitions',
  dist_node: 'dist/node',
  src: 'src',
  src_ts: 'src/ts'
};

gulp.task('build', function(done) {
  runSequence('install', 'dist', done);
});

gulp.task('dist', function(done) {
  runSequence('lint_ts', 'dist_node', 'dist_browser', done);
});

gulp.task('dist_browser', function() {
  var tsProject = ts.createProject('tsconfig.json', {
    module: 'system',
    outFile: `${paths.dist_browser}/${pkg.name}.js`
  });

  var tsResult = tsProject.src().pipe(ts(tsProject));
  return tsResult.js.pipe(gulp.dest(paths.dist_browser));
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

gulp.task('install', ['install_bower_assets', 'install_typings'], function() {
});

gulp.task('install_bower', function() {
  return bower({cmd: 'install'});
});

gulp.task('install_bower_assets', ['install_bower'], function() {
  return gulp.src('bower_assets.json')
    .pipe(assets({prefix: false}))
    .pipe(gulp.dest('dist/dependencies'));
});

gulp.task('install_typings', function() {
  return gulp.src('typings.json')
    .pipe(gulpTypings());
});

gulp.task('test', ['test_node', 'test_browser'], function() {
});

gulp.task('test_browser', function(done) {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');

  var server = new Server({
    configFile: __dirname + '/karma.conf.js',
    files: [
      'dist/dependencies/**/*.js',
      paths.dist_browser + '/**/*.js',
      'test/js/specs/**/*Spec.js'
    ]
  }, done);

  server.start();
});

gulp.task('test_node', function() {
  return gulp.src('test/js/specs/**/*Spec.js')
    .pipe(jasmine({
      random: true,
      stopSpecOnExpectationFailure: true
    }));
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
