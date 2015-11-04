"use strict";
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var appFiles = ['index.js', 'lib/**/*.js', 'bin/**/*.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('mocha:test', function(){
  return gulp.src(testFiles)
  .pipe(mocha());
});

gulp.task('mocha', ['mocha:test']);
