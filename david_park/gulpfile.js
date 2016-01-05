var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var publicFiles = ['index.js', 'public/**/*.js', 'bin/**/*.js'];
var testFiles = ['test/**/*.js'];

gulp.task('mocha:test', function() {
  return gulp.src(testFiles, {read:false})
  .pipe(mocha({reporter: 'nyan'}));
});

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

gulp.task('jshint:public', function() {
  return gulp.src(publicFiles)
    .pipe(jshint({
      node:true
    }))
    .pipe(jshint.reporter('default'));
})

gulp.task('jshint-mocha', ['jshint:test', 'jshint:public', 'mocha:test']);
gulp.task('default', ['jshint-mocha'])
