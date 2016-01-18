/*Gulp includes and dependencies */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

/*Webpack includes and dependencies */
var webpack = require('webpack-stream');
var config = require('./webpack.config.js');

//Execute default task
gulp.task('default', ['serve']);

// Static Server + watching scss/js/html files
gulp.task('serve', ['sass','js'], function() {

    browserSync.init({
        server: "./production/"
    });

    gulp.watch("development/css/*.scss", ['sass']);
    gulp.watch("development/js/*.js", ['js-watch']);
    gulp.watch("production/*.html").on('change', browserSync.reload);
    
    gulp.task('js-watch', ['js'], browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("development/css/*.scss")
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest("production/css/"))
        .pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('development/js/*js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(gulp.dest('production/js/'));
});









