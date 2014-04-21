// require all the plugins used
var gulp          = require('gulp'),
    jade          = require('gulp-jade'),
    compass       = require('gulp-compass'),
    plumber       = require('gulp-plumber'),

    // through = stream handling
    through       = require('through'),

    // gulp_args = argument parser
    gulp_args     = require('minimist')(process.argv.slice(2)),
    dev = function (stream) {
      return gulp_args.dev ? stream : through();
    },
    paths;

paths = {
  pages: '*.jade'
};

// define tasks
gulp.task('compile', function() {
  var stream = gulp
    .src(paths.pages)
    .pipe(plumber())
    .pipe(jade(dev({ pretty: true })))
    .pipe(gulp.dest('./'));
  return stream;
});

gulp.task('watch', function() {
  gulp.watch('*.jade', ['compile']);
});


// define grouped tasks
gulp.task('default', ['compile', 'watch']);














// gulp.task('build', function(){
//   environment = 'production';
//   gulp.run('images', 'svg', 'stylesheets', 'javascripts', function(){
//     console.log('Build process completed!');
//     process.exit(0);
//   });
// });
