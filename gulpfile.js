var gulp = require('gulp')
var del = require('del')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var runSequence = require('run-sequence')
var connect = require('gulp-connect')

var config = {
  src: 'src',
  dist: 'dist',
}

gulp.task('sass', function () {
 return gulp.src(`${config.src}/scss/lgtm.scss`)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.dist));
});

gulp.task('clean', () => {
  del.sync([
    config.dist
  ])
})

gulp.task('build', (done) => {
  runSequence(
    'clean',
    'sass',
    () => {
      done()
    }
  )
})

gulp.task('serve', ['build'], () => {
  connect.server({
    root: '.',
    port: 3000,
    livereload: true
  })
  gulp.watch(`${config.src}/scss/lgtm.scss`, ['sass'])
})

gulp.task('default', ['serve'])
