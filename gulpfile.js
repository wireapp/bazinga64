var browserify = require('gulp-browserify');
var gulp = require('gulp');
var gulpTypings = require('gulp-typings');
var gutil = require('gulp-util');
var merge = require('merge2');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
  var tsResult = gulp.src('src/*.ts')
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/definitions')),
    tsResult.js.pipe(gulp.dest('dist/node'))
  ]);
});

gulp.task('check', function () {
  return gulp.src('src/*.ts')
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('default', function (callback) {
  runSequence('dist', 'test', callback);
});

gulp.task('dist', ['install', 'build'], function () {
  return gulp.src('dist/namespace.js')
    .pipe(browserify())
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest('dist/browser'));
});

gulp.task('install', function () {
  return gulp.src('typings.json')
    .pipe(gulpTypings());
});

gulp.task('test', ['check'], function (done) {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');
  new Server({configFile: __dirname + '/karma.conf.js'}, done).start();
});
