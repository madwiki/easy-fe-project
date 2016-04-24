'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('clean', function() {
    return $.del(path.join(conf.paths.dist, '/'));
});

var jsFilter = $.filter('**/*.js', {
    restore: true
});
var cssFilter = $.filter('**/*.css', {
    restore: true
});
var htmlFilter = $.filter('**/*.html', {
    restore: true
});


gulp.task('build', ['prebuild'], function() {
    return gulp.src([path.join(conf.paths.tmp, '/**/*.html')])
        .pipe($.inject(gulp.src([path.join(conf.paths.dist, '/**/*.js'), path.join(conf.paths.dist, '/**/*.css')], {
            read: false
        }), {
            addRootSlash: true,
            ignorePath: conf.paths.dist
        }))
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('prebuild',['inject', 'assets'], function() {
    return gulp.src([path.join(conf.paths.tmp, '/**/*'), '!' + path.join(conf.paths.tmp, '/**/*.ico')])
        .pipe(jsFilter)
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        })).on('error', conf.errorHandler('Uglify'))
        .pipe($.rename('app.min.js'))
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/js/')))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.sass({outputStyle: 'compressed'})).on('error', conf.errorHandler('Sass'))
        .pipe($.rename('app.min.css'))
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/css')))
        .pipe(cssFilter.restore);
});

gulp.task('assets', function() {
    return gulp.src([path.join(conf.paths.src, '/assets/**/*'), path.join(conf.paths.tmp, '/favicon.ico')])
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});