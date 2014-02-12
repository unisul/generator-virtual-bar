// Load Gulp and your plugins
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    plumber = require('gulp-plumber');

var paths = {
    styles: 'stylus/**/*',
    html: '*.html',
    js: 'js/*.js'
};

// Connect task
gulp.task('connect', connect.server({
    root: __dirname + '/',
    port: 1337,
    livereload: true,
    open: {
        browser: 'chrome'
    }
}));

// Uglify
gulp.task('compress', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('js'))
});

// HTML task
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

// JS task
gulp.task('js', function () {
    gulp.src('js/*.js')
        .pipe(connect.reload());
});

// Stylus task
gulp.task('stylus', function () {
    gulp.src('./stylus/**/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: ['nib'], 
            set: ['compress']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

// Default gulp task to run
gulp.task('default', ['stylus']);

// Gulp watch
gulp.task('watch', function () {
    gulp.run('connect');
    gulp.watch(paths.styles, ['stylus']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js, ['js']);
});