const { src, dest, parallel, series, watch } = require('gulp');

const gulp = require('gulp');
const cssnano = require('gulp-cssnano'); // css compressor
const changed = require('gulp-changed'); // запускає таски змінених файлів
const browsersync = require('browser-sync');
const imagemin = require('gulp-imagemin'); // img compressor
const clean = require('gulp-clean'); // очищає білд
const terser = require('gulp-terser'); // js compressor
const htmlmin = require('gulp-htmlmin'); // html compressor

function clear() {
  return gulp
    .src('./build/*', {
      read: false,
    })
    .pipe(clean());
}

// css

async function css() {
  const sourse = './style.css';

  return gulp
    .src(sourse)
    .pipe(changed(sourse))
    .pipe(cssnano())
    .pipe(dest('./build/'))
    .pipe(browsersync.stream());
}

// images

function img() {
  return src('./images/tovar/*/*')
    .pipe(imagemin())
    .pipe(dest('./build/images/tovar/'));
}

// html

function html() {
  return src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./build/'))
    .pipe(browsersync.stream());
}

// js

function js() {
  return src('./*.js')
    .pipe(terser())
    .pipe(dest('./build/'))
    .pipe(browsersync.stream());
}

// watch files

function watchFiles() {
  watch('./*.js', js);
  watch('./*.css', css);
  watch('./*.html', html);
  watch('./images/tovar/*/*', img);
}

// BrowserSync

function BrowserSync() {
  browsersync.init({
    server: {
      baseDir: './build',
    },
    port: 3000,
  });
}

exports.watch = parallel(watchFiles, BrowserSync);
exports.default = series(clear, gulp.parallel(html, css, js, img));
