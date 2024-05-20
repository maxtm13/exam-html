const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const rename = require('gulp-rename')
const cleancss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const newer = require('gulp-newer');
const browsersync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));;
// const webp = require('gulp-webp')
// const sass_st = require('gulp-sass');
// import dartSass from 'sass';
// import gulpSass from 'gulp-sass';
// const sass = gulpSass(dartSass);

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  sass_style: {
    src: 'src/styles/**/*.{scss,sass}',
    dest: 'dist/css',
    dest2: 'src/styles/css'
  },
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/css',
    dest2: 'src/styles/css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts'
  }

}
// function webpict() {
//   return gulp.src(paths.images.src)
//     .pipe(webp())
//     .pipe(gulp.dest(paths.images.dest))
// }
//Задача для обработки HTML
function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({
      showFiles: true,
      pretty: true
    }))
    .pipe(gulp.dest(paths.html.dest))
  // .pipe(browsersync.stream())
}

//Задача для обработки изображений
function img() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(size({
      showFiles: true,
      pretty: true
    }))
    .pipe(gulp.dest(paths.images.dest))
}

function clean() {
  return del(['dist/*', '!dist/img'])
}
//Задача для обработки стилец
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest2))
    .pipe(cleancss({
      level: 2
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true,
      pretty: true
    }))
    .pipe(gulp.dest(paths.styles.dest))
  // .pipe(browsersync.stream())
}

function styles2() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(gulp.dest(paths.styles.dest2))

}
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}

function sass_styles() {
  return gulp.src(paths.sass_style.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass_style.dest2))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleancss({
      level: 2
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '_sass.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true,
      pretty: true
    }))

    .pipe(gulp.dest(paths.sass_style.dest2))
    .pipe(gulp.dest(paths.sass_style.dest))
    .pipe(browsersync.stream())

}

//Задача для обработки скриптов
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true,
      pretty: true
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}


function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.styles.src, styles2)
  gulp.watch(paths.sass_style.src, sass_styles)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.images.src, img)
  //Синхронизация с браузером
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.styles.dest).on('change', browsersync.reload)
  gulp.watch(paths.scripts.dest).on('change', browsersync.reload)
  gulp.watch(paths.sass_style.dest).on('change', browsersync.reload)

}


const build = gulp.series(clean, html, gulp.parallel(styles, sass_styles, scripts, img, fonts), watch)

exports.html = html
exports.clean = clean
exports.img = img
// exports.webp = webp
exports.styles = styles
exports.styles2 = styles2
exports.watch = watch
exports.scripts = scripts
exports.fonts = fonts
exports.build = build
exports.default = build
exports.sass_styles = sass_styles