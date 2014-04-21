var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  compass = require('gulp-compass'),
  coffee = require('gulp-coffee'),
  include = require('gulp-include'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  imagemin = require('gulp-imagemin'),
  svgmin = require('gulp-svgmin'),
  environment = 'develop',
  paths;

paths = {
  stylesheet: 'app/stylesheets/style.{scss,sass}',
  stylesheets: 'app/stylesheets/**/*.{scss,sass,css}',
  javascript: 'app/javascripts/js.coffee',
  javascripts: 'app/javascripts/**/*.{coffee,js}',
  images: 'app/images/**/*.{jpg,gif,png}',
  svg: 'app/images/**/*.svg'
};

gulp.task('stylesheets', function() {
  stream = gulp
    .src(paths.stylesheet)
    .pipe(plumber())
    .pipe(compass({
      sass: 'app/stylesheets',
      css: './'
    }));

  if(environment == 'production') {
    stream = stream.pipe(minifyCSS({keepSpecialComments: 1}));
  }

  return stream
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('javascripts', function() {
  stream = gulp
    .src(paths.javascript)
    .pipe(plumber())
    .pipe(include())
    .pipe(coffee());

  if(environment == 'production') {
    stream = stream.pipe(uglify());
  }

  return stream
    .pipe(gulp.dest('./js'))
    .pipe(livereload());
});

gulp.task('images', function() {
  return gulp
    .src(paths.images)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest('./images'))
    .pipe(livereload());
});

gulp.task('svg', function() {
  return gulp
    .src(paths.svg)
    .pipe(svgmin())
    .pipe(plumber())
    .pipe(gulp.dest('./images'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.svg, ['svg']);
  gulp.watch(paths.stylesheets, ['stylesheets']);
  gulp.watch(paths.javascripts, ['javascripts']);
});

gulp.task('default', ['images', 'svg', 'stylesheets', 'javascripts', 'watch']);

gulp.task('build', function(){
  environment = 'production';
  gulp.run('images', 'svg', 'stylesheets', 'javascripts', function(){
    console.log('Build process completed!');
    process.exit(0);
  });
});
