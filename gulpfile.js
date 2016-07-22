'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var babelify = require('babelify');
var browserify = require("browserify");
var notify = require("gulp-notify");
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  browserify({
    entries: 'app/app.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify,{presets: ['es2015','react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public'))
  .pipe(browserSync.stream())
  .pipe(notify("JS built!"));
});

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      },
      serveStatic: ['./public'],
      open: false
  });
  gulp.watch("./app/**/*.js", ["build"]);
  gulp.watch("index.html").on('change', browserSync.reload)
  gulp.watch("./public/app.css").on('change', browserSync.reload)
});

gulp.task('nodemon', function (cb) {
	return nodemon({
		script: 'dev.js'
	}).once('start', cb);
});
