'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();


gulp.task('inject', ['styles', 'concat', 'html', 'ico'], function() {
    return gulp.src(path.join(conf.paths.tmp,'/index.html'))
        .pipe($.inject(gulp.src([path.join(conf.paths.tmp, '/**/*.js'), path.join(conf.paths.tmp, '/**/*.css')], {
            read: false
        }), {
            addRootSlash: true,
            ignorePath: conf.paths.tmp
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp,'/')))
        .pipe(browserSync.reload({ stream: true }));
});
