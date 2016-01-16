var gulp = require('gulp');
var jshint = require('gulp-jshint');
var chaihttp = require('chai-http');
var testFiles = ['test/**/*.js'];
var appFiles = ['index.js'];

gulp.task('jshint:test', function() {
  return gulp.src(testFiles)
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node: true
    }))
    .pipe(jshint.reporter('default'));
})

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('default', ['jshint']);
