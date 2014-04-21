// require all the plugins used --------------------------------------------------------------------
var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    compass     = require('gulp-compass'),
    plumber     = require('gulp-plumber'),
    livereload  = require('gulp-livereload'),
    imagemin    = require('gulp-imagemin'),
    svgmin      = require('gulp-imagemin'),
    modernizr   = require('gulp-modernizr'),
    uglify      = require('gulp-uglify'),
    include     = require('gulp-include'),
    coffee      = require('gulp-coffee'),

    // open a file or url
    open    = require('open'),

    // http server
    http = require('http'),
    connect       = require('connect'),

    // through = stream handling
    through       = require('through'),

    // gulp_args = argument parser
    gulp_args     = require('minimist')(process.argv.slice(2)),

    development = gulp_args.dev,
    dev = function (stream) {
      return development ? stream : through();
    },
    CONNECT_PORT = 8000,
    paths;


// saving paths ------------------------------------------------------------------------------------
paths = {
  pages: './*.jade',
  styles: 'app/stylesheets/',
  stylesheet: 'app/stylesheets/style.sass',
  stylesheets: 'app/stylesheets/**/*.{scss,sass}',
  javascript: 'app/javascripts/scripts.coffee',
  javascripts: 'app/javascripts/**/*.{coffee,js}',
  images: 'app/images/**/*.{png,jpg,gif,jpeg}',
  svg: 'app/images/**/*.svg'
};


// define tasks ------------------------------------------------------------------------------------
gulp.task('pages', function() {
  var stream = gulp
    .src(paths.pages)
    .pipe(plumber())
    .pipe(jade(dev({ pretty: true })))
    .pipe(gulp.dest('./'));

  if(development) {
    stream = stream.pipe(livereload());
  }

  return stream;
});

gulp.task('styles', function() {
  var stream = gulp
    .src(paths.stylesheet)
    .pipe(plumber())
    .pipe(compass({
      sass: paths.styles,
      css: './',
      style: development ? 'expanded' : 'compressed'
    }))
    .pipe(gulp.dest('./'));

  if(development) {
    stream = stream.pipe(livereload());
  }

  return stream;
});

gulp.task('scripts', function() {
  var stream = gulp
    .src(paths.javascript)
    .pipe(plumber())
    .pipe(include())
    .pipe(coffee())
    .pipe(uglify(dev({ compress: false })))
    .pipe(gulp.dest('./js'));

  if(development) {
    stream = stream.pipe(livereload());
  }

  return stream;
});

gulp.task('modernizr', function() {
  var stream = gulp
    .src('./style.css')
    .pipe(modernizr('modernizr-cust.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./"));
  return stream;
});

gulp.task('images', function() {
  var stream = gulp
    .src(paths.images)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));

  if(development) {
    stream = stream.pipe(livereload());
  }

  return stream;
});

gulp.task('svg', function() {
  var stream = gulp
    .src(paths.svg)
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(gulp.dest('./images'));

  if(development) {
    stream = stream.pipe(livereload());
  }

  return stream;
});

gulp.task('watch', function() {
  gulp.watch(paths.pages, ['compile']);
  gulp.watch(paths.stylesheets, ['styles']);
  gulp.watch(paths.javascripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.svg, ['svg']);
});

gulp.task('serve', ['default'], function() {

  // Start Connect server
  var app = connect().use(connect.static('.'));
  http.createServer(app).listen(CONNECT_PORT);

  // Open local server in browser
  open('http://localhost:' + CONNECT_PORT);

});

// define grouped tasks ----------------------------------------------------------------------------
gulp.task('default', ['pages', 'styles', 'scripts', 'images', 'svg', 'serve', 'watch']);

gulp.task('build', ['pages', 'styles', 'scripts', 'images', 'svg', 'modernizr']);
