'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var exec = require('child_process').exec;

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var server = {
        baseDir: baseDir
    };

    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
     */
    server.middleware = proxyMiddleware('/api', {
        target: 'http://localhost:3300',
        proxyHost: 'http://localhost:3000'
    });

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]' // Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
    browserSyncInit([conf.paths.tmp,path.join(conf.paths.src,'/assets')]);
});