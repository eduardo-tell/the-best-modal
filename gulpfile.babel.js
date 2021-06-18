import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import browserSync from 'browser-sync'
import autoprefix from "gulp-autoprefixer"

exports.sass = () => (
    gulp.src('./src/scss/**/**')
    .pipe(sass({outputStyle: "compressed",errLogToConsole: true,}))
    .pipe(autoprefix())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
);

exports.scripts = () => (

	gulp.src(['./src/js/components/*.js', './src/js/main.js'])
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