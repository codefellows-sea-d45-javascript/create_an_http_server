var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('default', ['jshint', 'test']);

gulp.task('jshint', function(){
  gulp.src(['gulpfile.js', 'index.js', 'test/*.js', 'lib/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});



gulp.task('test', ['jshint'], function(){
  gulp.src('test/*test.js')
  .pipe(mocha({reporter: 'nyan'}));
});
