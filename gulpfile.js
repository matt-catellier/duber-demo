var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass');

var src = './app/process',
    app = './builds/app';

gulp.task('js', function() {
  return gulp.src( src + '/app/app.js' )
    .pipe(browserify({
      transform: 'reactify',
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('sass', function () {
  return gulp.src( src + '/styles/app.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(app + '/css'));
});

gulp.task('html', function() {
  gulp.src( app + '/**/*.html');
});

gulp.task('css', function() {
  gulp.src( app + '/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch( src + '/js/**/*', ['js']);
  // gulp.watch( app + '/css/**/*.css', ['css']);
  gulp.watch( src + '/styles/*.scss', ['sass']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'webserver']);
