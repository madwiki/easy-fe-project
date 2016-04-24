'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('concat', function() {
    return gulp.src([path.join(conf.paths.src, '/lib/**/*.js'),path.join(conf.paths.src, '/js/**/*.js'),path.join(conf.paths.src, '/index.js')])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/js/')))
        .pipe(browserSync.reload({
            stream: true
        }));
});