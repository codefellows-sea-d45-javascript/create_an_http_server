var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var serverFiles = ['server.js'];
var testFiles = ['test/*.js'];

gulp.task('jshint:test', function() {
  return gulp.src(testFiles)
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:server', function() {
  return gulp.src(serverFiles)
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
  return gulp.src('./test/*.js', {read: true})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jshint', ['jshint:test', 'jshint:server']);
gulp.task('default', ['jshint', 'mocha']);
