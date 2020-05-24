var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
const sync = require("browser-sync").create();

gulp.task('default', ['watch'], function () { });

gulp.task('sass', function () {
    return gulp.src('css/sass/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('css/dist'));
});

gulp.task('scripts', function () {

    arquivos = [
        'js/src/animate.min.js',
        'js/src/cash.js',
        'js/src/buttons.js',
        'js/src/cards.js',
        'js/src/carousel.js',
        'js/src/chips.js',
        'js/src/collapsible.js',
        'js/src/component.js',
        'js/src/datepicker.js',
        'js/src/dropdown.js'
    ]

    return gulp.src(arquivos)
        .pipe(stripDebug()).on('error', console.error)
        .pipe(babel({ "presets": ['env'] })).on('error', console.error)
        .pipe(concat('scripts.min.js')).on('error', console.error)
        // .pipe(uglify()).on('error', console.error)
        .pipe(gulp.dest('js/dist')).on('error', console.error)
});

gulp.task('watch', function () {
    sync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('css/sass/components/*.scss', ['sass']);
    gulp.watch('js/src/*.js', ['scripts']);
});
