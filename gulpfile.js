var browserify = require('gulp-browserify');
var gulp = require('gulp');
var gulpTypings = require('gulp-typings');
var gutil = require('gulp-util');
var merge = require('merge2');
var path = require('path');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var tsProject = ts.createProject('tsconfig.json');

var paths = {
  src: 'src',
  src_ts: 'src/*.ts'
};

gulp.task('build', function() {
  var tsResult = gulp.src(paths.src_ts)
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/definitions')),
    tsResult.js.pipe(gulp.dest('dist/node'))
  ]);
});

gulp.task('check', function() {
  return gulp.src(paths.src_ts)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('default', function(callback) {
  runSequence('dist', 'test', callback);
});

gulp.task('dev', function() {
  gulp.watch(paths.src_ts).on('change', function(file) {
    var pathObject = path.parse(file.path);
    var specificationPath = 'test/' + pathObject.name + 'Spec.js';

    gutil.log('Changed file', '\'' +  gutil.colors.yellow(pathObject.base) + '\'...');
    gutil.log('Testing specification', '\'' + gutil.colors.yellow(specificationPath) + '\'...');

    new Server({
      configFile: __dirname + '/karma.conf.js',
      files: [
        'dist/browser/**/*.js',
        specificationPath
      ],
      singleRun: true
    }).start();
  });
});

gulp.task('dist', ['pre_dist'], function() {
  return gulp.src('dist/namespace.js')
    .pipe(browserify())
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest('dist/browser'));
});

gulp.task('install', function() {
  return gulp.src('typings.json')
    .pipe(gulpTypings());
});

gulp.task('pre_dist', function(callback) {
  runSequence('install', 'build', callback);
});

gulp.task('test', ['check'], function(done) {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});
