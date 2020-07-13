import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import stripDebug from 'gulp-strip-debug';
import browserSync from "browser-sync";
import browserify from 'gulp-browserify'

exports.sass = () => (
    gulp.src('./src/scss/**/**')
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
);

exports.scripts = () => (
	gulp.src('./src/js/main.js')
	// .pipe(stripDebug())
    .pipe(concat('scripts.min.js'))
	.pipe(babel())
	.pipe(browserify({
		insertGlobals : true
	}))
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