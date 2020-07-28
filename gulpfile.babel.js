const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const stripDebug = require('gulp-strip-debug');
const browserSync = require('browser-sync');
const browserify = require('gulp-browserify');

exports.sass = () => (
    gulp.src('./src/scss/**/**')
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
);

exports.scripts = () => (

	gulp.src(['./src/js/components/*.js', './src/js/main.js'])
	// .pipe(stripDebug())
    .pipe(concat('scripts.min.js'))
	.pipe(babel())
    .pipe(gulp.dest('./dist/js'))
);

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/**', gulp.series('sass'))
    gulp.watch('./src/js/**/**', gulp.series('scripts'))
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        },
        notify: false,
        injectChanges: true
    });

    gulp.watch('./src/scss/**/**', gulp.series('sass'))
    gulp.watch('./src/js/**/**', gulp.series('scripts'))
    gulp.watch('./**/**/**').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('watch'));