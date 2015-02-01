/*jslint node:true*/
"use strict";

// require all the plugins used --------------------------------------------------------------------
var gulp        = require('gulp'),
  coffee        = require('gulp-coffee'),
  sass          = require('gulp-sass'),
  connect       = require('gulp-connect'),
  gulpif        = require('gulp-if'),
  imagemin      = require('gulp-imagemin'),
  include       = require('gulp-include'),
  grunt         = require('gulp-grunt'),
  jade          = require('gulp-jade'),
  modernizr     = require('gulp-modernizr'),
  newer         = require('gulp-newer'),
  plumber       = require('gulp-plumber'),
  svgmin        = require('gulp-imagemin'),
  uglify        = require('gulp-uglify'),
  autoprefixer  = require('gulp-autoprefixer'),

  // gulp_args = argument parser
  gulp_args = require('minimist')(process.argv.slice(2)),

  development = gulp_args.dev || false,
  paths;


// all the paths------------------------------------------------------------------------------------

var stylesheets = 'src/stylesheets',
  javascripts   = 'src/javascripts',
  cssImageSrc   = 'img',
  images        = 'public/' + cssImageSrc;


paths = {
  pages: 'src/*.jade',
  styles: stylesheets,
  stylesheet:  stylesheets + '/style.{scss,sass}',
  stylesheets: stylesheets + '/**/*.{scss,sass}',
  javascript:  javascripts + '/scripts.coffee',
  javascripts: javascripts + '/**/*.{coffee,js}',
  images: 'src/images/**/*.{png,jpg,gif,jpeg}',
  svg: 'src/images/**/*.svg'
};


// define tasks ------------------------------------------------------------------------------------
gulp.task('pages', function () {
  var stream = gulp
    .src(paths.pages)
    .pipe(plumber())
    .pipe(gulpif(development, jade({ pretty: true }), jade()))
    .pipe(gulp.dest('public'))
    .pipe(gulpif(development, connect.reload()));
  return stream;
});

gulp.task('styles', function () {
  var stream = gulp
    .src(paths.stylesheet)
    .pipe(plumber())
    .pipe(sass({
      indentedSyntax: true,
      includePaths: paths.styles,
      imagePath: cssImageSrc,
      outputStyle: development ? 'expanded' : 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public'))
    .pipe(gulpif(development, connect.reload()));
  return stream;
});

gulp.task('scripts', function () {
  var stream = gulp
    .src(paths.javascript)
    .pipe(plumber())
    .pipe(include())
    .pipe(coffee())
    .pipe(gulpif(development, uglify()))
    .pipe(gulp.dest('public/js'))
    .pipe(gulpif(development, connect.reload()));
  return stream;
});

gulp.task('modernizr', function () {
  var stream = gulp
    .src('public/**/*.{js,css}')
    .pipe(modernizr('modernizr.js'))
    .pipe(uglify())
    .pipe(gulp.dest("public/js"));
  return stream;
});

gulp.task('images', function () {
  var stream = gulp
    .src(paths.images)
    .pipe(plumber())
    .pipe(newer(images))
    .pipe(imagemin())
    .pipe(gulp.dest(images))
    .pipe(gulpif(development, connect.reload()));
  return stream;
});

gulp.task('svg', function () {
  var stream = gulp
    .src(paths.svg)
    .pipe(plumber())
    .pipe(newer(images))
    .pipe(svgmin())
    .pipe(gulp.dest(images))
    .pipe(gulpif(development, connect.reload()));
  return stream;
});

gulp.task('copy', function () {
  gulp.src('src/CNAME')
    .pipe(gulp.dest('public'));

  gulp.src('src/favicon.ico')
    .pipe(gulp.dest('public'));

  gulp.src('src/*.txt')
    .pipe(gulp.dest('public'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('deploy', ['grunt-gh-pages']);

gulp.task('watch', function () {
  gulp.watch(paths.pages, ['pages']);
  gulp.watch(paths.stylesheets, ['styles']);
  gulp.watch(paths.javascripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.svg, ['svg']);
});


// define grouped tasks ----------------------------------------------------------------------------
gulp.task('default', [
  'copy',
  'pages',
  'styles',
  'scripts',
  'images',
  'svg',
  'modernizr',
  'connect',
  'watch'
]);

gulp.task('build', [
  'copy',
  'pages',
  'styles',
  'scripts',
  'images',
  'svg',
  'modernizr'
]);

// Add all Grunt tasks to Gulp
grunt(gulp);
