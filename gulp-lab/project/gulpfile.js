const gulp =  require('gulp');
const browserSync =  require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');


function copy() {
    return gulp.src([
        'app/*.html',
        'app/**/*.jpg'
    ])
    .pipe(gulp.dest('build'));
}

function processCss() {
  return gulp.src('app/styles/*.css')
  .pipe(cleanCss({compatibility: 'ie8'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/styles'))
}

function processJs() {
    return gulp.src('app/scripts/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/scripts'));
  }

function watch() {
  gulp.watch('app/scripts/*.js', processJs);
  gulp.watch('app/styles/*.css', processCss);
}

function serve() {
  return browserSync.init({
    server: 'build',
    open: false,
    port: 3000
  });
}

gulp.task('copy', copy);
gulp.task('processCss', processCss);
gulp.task('processJs', processJs);
gulp.task('watch', watch);
gulp.task('buildAndServe', gulp.series(copy, processJs, processCss, gulp.parallel(watch, serve)));
