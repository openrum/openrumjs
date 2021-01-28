var gulp = require('gulp');
var webpack = require('webpack-stream');
var pump = require('pump');
var replace = require('gulp-replace');
var del = require('del');

var configData = {
  dest: './dist/',
  jsSrc: './src/openrum.js',
  htmlSrc: './src/views/*.html'
};

/*SUB TASKS*/
gulp.task('clean:dist', function() {
  return del(['./dist/**/*']);
});
gulp.task('webpack:prod', function(cb) {
  pump(
    [
      gulp.src(configData.jsSrc),
      webpack(require('./webpack.prod.config.js')),
      gulp.dest(configData.dest)
    ],
    cb
  );
});
gulp.task('copy:min-html', function(cb) {
  pump(
    [
      gulp.src(configData.htmlSrc),
      replace('piio.dev.min.js', 'piio.min.js'),
      gulp.dest(configData.dest)
    ],
    cb
  );
});

/*MAIN TASKS*/
gulp.task('build:dev', gulp.series('clean:dist'), function() {});
gulp.task('build:prod', gulp.series('clean:dist', 'webpack:prod'), function() {});
