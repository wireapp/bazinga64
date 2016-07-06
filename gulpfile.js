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

gulp.task('build_ts', function() {
  var tsResult = gulp.src(paths.src_ts)
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/definitions')),
    tsResult.js.pipe(gulp.dest('dist/node'))
  ]);
});

gulp.task('build', function(done) {
  runSequence('build_ts', done);
});

gulp.task('check', function(done) {
  runSequence('lint_ts', done);
});

gulp.task('lint_ts', function() {
  return gulp.src(paths.src_ts)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('default', function(done) {
  runSequence('install', 'dist', 'dev', done);
});

gulp.task('dev', ['test_forever'], function() {
  gulp.watch(paths.src_ts, ['dist']);
});

gulp.task('dist', ['build'], function() {
  return gulp.src('dist/namespace.js')
    .pipe(browserify())
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest('dist/browser'));
});

gulp.task('install', function() {
  return gulp.src('typings.json')
    .pipe(gulpTypings());
});

gulp.task('test', ['check'], function(done) {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');
  
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('test_forever', function() {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');
  new Server({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false
  }).start();
});
