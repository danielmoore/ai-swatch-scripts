'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var watchify = require('watchify');

var scriptName = 'extract-swatches.js';
var mainModulePath = './lib/' + scriptName;
var outDir = './dist';

function bundle(bundler) {
  bundler.plugin('browserify-extendscript');

  bundler
    .bundle()
    .pipe(source(scriptName))
    .pipe(gulp.dest(outDir));
}

gulp.task('clean', function () {
  gulp
    .src(outDir, {read: false})
    .pipe(clean());
});

gulp.task('compile', function () {
  bundle(browserify(mainModulePath));
});

gulp.task('watch', function () {
  var watcher = watchify(mainModulePath);

  watcher.on('update', rebundle);

  bundle(watcher);

  function rebundle() {
    console.log('Changes detected in %j at %s. Rebundling.', mainModulePath, new Date().toTimeString());
    bundle(watcher);
  }
});

gulp.task('default', ['clean', 'compile']);
