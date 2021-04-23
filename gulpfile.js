var gulp = require('gulp');
var webpack = require('webpack-stream');
var replace = require('gulp-replace');
var del = require('del');
var ts = require('gulp-typescript');

var configData = {
  dest: './dist/',
  jsSrc: './src/openrum.ts',
  htmlSrc: './src/views/*.html'
};

/*SUB TASKS*/
gulp.task('clean:dist', function() {
  return del(['./dist/**/*']);
});
gulp.task('webpack:prod', function() {
      return gulp.src(configData.jsSrc).pipe(
        ts({})
      ).pipe(gulp.dest('dist/'));
});


/*MAIN TASKS*/
gulp.task('build:dev', gulp.series('clean:dist'), function() {});
gulp.task('build:prod', gulp.series('clean:dist'), function() {});
