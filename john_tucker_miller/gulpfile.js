var gulp = require('gulp');
var mocha = require('gulp-mocha')
var jshint = require('gulp-jshint');


gulp.task('testing', function() {
    return gulp.src('./test/test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jshint:server', function() {
  return gulp.src(__dirname + '/server.js')
    .pipe(jshint({
      node: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:test', function() {
  return gulp.src(__dirname + '/test/test.js')
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

gulp.task('default', ['testing', 'jshint:server', 'jshint:test']);
