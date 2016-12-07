var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass');

var src = './app/process',
    app = './public';

gulp.task('js', function() {
  return gulp.src( './app/app.js' )
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

gulp.task('watch', function() {
  gulp.watch( src + '/**/*', ['js']);
  gulp.watch( src + '/styles/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'js', 'sass', 'webserver']);
gulp.task('dev-server', ['watch', 'js', 'sass', 'webserver']);
gulp.task('build-prod', ['js', 'sass']);
