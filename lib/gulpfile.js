const {src, dest, series, parallel} = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');

const config = {
    SOURCE_FOLDER: './src',
    OUTPUT_FOLDER: './dist'
}

function clean() {
    return del(config.OUTPUT_FOLDER);
}

function buildStyles() {
    return src(`${config.SOURCE_FOLDER}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(config.OUTPUT_FOLDER));
}

function buildHtml() {
    return src(`${config.SOURCE_FOLDER}/**/*.html`)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(dest(config.OUTPUT_FOLDER));
}


exports.build = series(clean, parallel(buildHtml, buildStyles));
