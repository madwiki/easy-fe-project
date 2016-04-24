'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var _ = require('lodash');

gulp.task('styles', function () {
  var sassOptions = {
    outputStyle: 'expanded'
  };

  return gulp.src([
    path.join(conf.paths.src, '/index.scss')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/css/')))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('ico', function() {
    return gulp.src([path.join(conf.paths.src, '/favicon.ico')])
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/')));
});