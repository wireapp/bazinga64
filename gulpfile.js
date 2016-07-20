var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var gulpTypings = require('gulp-typings');
var gutil = require('gulp-util');
var header = require('gulp-header');
var merge = require('merge2');
var nightwatch = require('gulp-nightwatch');
var path = require('path');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var Server = require('karma').Server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var banner = ['/**',
  ' * <%= pkg.name %> — <%= pkg.description %>',
  ' * @license <%= pkg.license %>',
  ' * @link <%= pkg.homepage %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''].join('\n');

var paths = {
  dist_browser: 'dist/browser',
  dist_definitions: 'dist/definitions',
  dist_node: 'dist/node',
  src: 'src',
  src_ts: 'src/ts'
};

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build_ts', ['lint_ts'], function() {
  var tsResult = gulp.src(paths.src_ts + '/**/*.ts')
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest(paths.dist_definitions)),
    tsResult.js.pipe(gulp.dest(paths.dist_node))
  ]);
});

gulp.task('build', function(done) {
  runSequence('build_ts', done);
});

gulp.task('check', function(done) {
  runSequence('lint_ts', done);
});

gulp.task('lint_ts', function() {
  return gulp.src(paths.src_ts + '/**/*.ts')
    .pipe(tslint({formatter: 'verbose'}))
    .pipe(tslint.report());
});

gulp.task('default', function(done) {
  runSequence('install', 'dist', 'dev', done);
});

gulp.task('dev', ['test_forever'], function() {
  gulp.watch(paths.src_ts + '/**/*.ts', ['dist']);
  gulp.watch(paths.dist_browser + '/**/*.*')
    .on('change', browserSync.reload);

  browserSync.init({
    port: 3636,
    server: {baseDir: './'},
    startPath: '/' + paths.dist_browser
  });
});

gulp.task('dist', ['build'], function() {
  return gulp.src('dist/namespace.js')
    .pipe(browserify())
    .pipe(rename(pkg.name + '.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(paths.dist_browser));
});

gulp.task('install', function() {
  return gulp.src('typings.json')
    .pipe(gulpTypings());
});

gulp.task('test', ['check'], function(done) {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');

  var server = new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done);

  server.start();
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

gulp.task('test_forever', function() {
  gutil.log('Starting', gutil.colors.yellow('test'), 'server ...');

  var server = new Server({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false
  });

  server.start();
});
