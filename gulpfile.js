var browserify = require('gulp-browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge2');
var Server = require('karma').Server;
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
  var tsResult = gulp.src('src/*.ts')
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/definitions')),
    tsResult.js.pipe(gulp.dest('dist/node'))
  ]);
});

gulp.task('dist', ['build'], function () {
  return gulp.src('dist/browser.js')
    .pipe(browserify())
    .pipe(gulp.dest('dist/browser'));
});

gulp.task('test', function (done) {
  gutil.log('Starting server', '...');

  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});
