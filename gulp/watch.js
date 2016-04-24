'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
    return event.type === 'changed';
}

gulp.task('watch',['inject'], function() {

    gulp.watch([path.join(conf.paths.src, '/*.html')], function(event) {
        gulp.start('inject');
    });

    gulp.watch([
        path.join(conf.paths.src, '/**/*.css'),
        path.join(conf.paths.src, '/**/*.scss')
    ], function(event) {
        gulp.start('styles');
    });

    gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
        gulp.start('concat');
    });

});

gulp.task('html', function() {
    return gulp.src([path.join(conf.paths.src, '/index.html')])
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/')));
});