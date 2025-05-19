const { src, dest, watch, series, parallel, tree } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));                                
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sprite = require('gulp-svg-sprite');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const del = require('del');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');

const isDevelopment = process.env.NODE_ENV == 'development' ? true : false; // Check work mode | Смотрим какой режим разработки выбран
const dir = 'dist'; // Output | Папка с конечными файлами

// Launch app on localhost | Запускаем приложение на локальном хостинге
function browsersync() {
    browserSync.init({
        server: {
            baseDir: dir,
            index: "index.html"
        }
    });
}

// Оптимизация стилей | Optimizing styles
function style() {
    return src('src/sass/**/*.+(scss|sass)')
        .pipe(gulpIf(isDevelopment, sourcemaps.init())) // Инициализация source-maps (Работает только в режиме разработки) | Source-maps initialization (Only works in development mode)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // From sass to css
        .pipe(rename({ suffix: '.min', prefix: '' })) // Добавление суффикса min к style.css | Adding min suffix to style.css
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Автоматическая расстановка кроссбраузерных префиксов | Automatic placement of cross-browser prefixes
        .pipe(cleanCSS({ compatibility: 'ie8' })) //
        .pipe(gulpIf(isDevelopment, sourcemaps.write())) // Запись source-maps (Работает только в режиме разработки) | Source-maps entry (Only works in development mode)
        .pipe(dest(dir + "/css")) // Избавляемся от мусора c cleanCSS | Getting rid of garbage with cleanCSS
        .pipe(browserSync.stream()) // Наблюдаем за измениями в стилях | Watching Style Changes
}

// Просто перенос html файлов | Just transferring html files
function html() {
    return src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(dir + '/'))
}

// // Сборка JS модулей с помощью webpack | Building JS modules using webpack
// function scripts() {
//     return src([
//         'src/JS/libs/**/*.js',
//         'src/JS/index.js'
//     ])
//         .pipe(gulpIf(isDevelopment, sourcemaps.init())) // Инициализация source-maps (Работает только в режиме разработки) | Source-maps initialization (Only works in development mode)
//         .pipe(concat('bundle.js'))
//         .pipe(uglify())
//         .pipe(gulpIf(isDevelopment, sourcemaps.write())) // Запись source-maps (Работает только в режиме разработки) | Source-maps entry (Only works in development mode)
//         .pipe(dest(dir + '/JS/'))
// }

function scripts() {
    return src('src/js/*/**.js')
        .pipe(webpack({
            mode: isDevelopment ? 'development' : 'production',
            entry: './src/js/index.js',
            output: {
                filename: 'bundle.js'
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'], 
                    }
                ],
            },
        }))
        .pipe(dest(dir + '/js/'))
}

// Наблюдаем за всеми изменениями (gulp-watch) | Watch all changes (gulp-watch)
function startWatch() {
    watch(['src/sass/**/*.+(scss|sass)'], style);
    watch(['src/js/**/*.js', '!src/**/*.min.js'], scripts);
    watch(['src/**/*.html'], html);
    watch(['src/**/*.html']).on('change', browserSync.reload);
    watch(['src/images/**/*'], images);
    watch(['src/svg/stack/mono/*'], svgspriteMono);
    watch(['src/svg/stack/multi/*'], svgspriteMulti);
    watch(['src/fonts/**/*'], fonts);
    watch(['src/svg/stack/mono/*'], svgspriteMono);
    watch(['src/svg/stack/multi/*'], svgspriteMulti);
}


// Оптимизация и конвертация картинок в webp | Optimization and conversion of images to webp
function images() {
    return src('src/images/**/*')
        .pipe(newer(dir + '/images'))
        .pipe(webp({
            quality: 100,
            sns: 100,
            filter: 100,
            sharpness: 7,
            method: 6,
        })) // Оптимизируем картинки если режим разработки prod | We optimize pictures if the prod mode
        .pipe(dest(dir + '/images/'))
}

//video to dev/prod
function video() {
    return src('src/video/**/*')
        .pipe(dest(dir + '/video/'))
}

// Спрайт для векторной графики
function svgspriteMono() {
    return src('src/svg/stack/mono/*')
        .pipe(sprite({
            shape: {
                spacing: {
                    padding: 0
                },
                transform: [{
                    "svgo": {
                        "plugins": [
                            { removeAttrs: { attrs: ['class', 'data-name', 'color'] }}
                        ]
                    }
                }]
            },
            mode: {
                stack: {
                    sprite: 'spriteMono.svg'  // sprite file name
                }
            },
        }))
        .pipe(dest(dir + '/svg/dest/'))
}

function svgspriteMulti() {
    return src('src/svg/stack/multi/*')
        .pipe(sprite({
            shape: {
                spacing: {
                    padding: 0
                },
            },
            mode: {
                stack: {
                    sprite: 'spriteMulti.svg'  // sprite file name
                }
            },
        }))
        .pipe(dest(dir + '/svg/dest/'))
}

// Удаление картинок в выходной папке, если те удалены в входящей | Deleting pictures in the output folder, if they were deleted in the input
function cleanImg() {
    return del(dir + '/images/**/*{.png, .jpg, .webp}', { force: true })
}

// Удаление шрифтов в выходной папке, если те удалены в входящей | Deleting fonts in the output folder, if they were deleted in the input
function cleanFonts() {
    return del(dir + '/fonts/**/*', { force: true })
}


// Просто перенос шрифтов | Just transferring fonts
function fonts() {
    return src('src/fonts/**/*')
        .pipe(dest(dir + '/fonts/'))
}


exports.browsersync = browsersync;
exports.scripts = scripts;
exports.style = style;
exports.html = html;
exports.cleanImg = cleanImg;
exports.cleanFonts = cleanFonts;
exports.fonts = fonts;
exports.svgspriteMulti = svgspriteMulti;
exports.svgspriteMono = svgspriteMono;
exports.video = video;

exports.default = parallel(style, html, scripts, fonts, cleanFonts, svgspriteMono, svgspriteMulti, images, video, cleanImg, browsersync, startWatch);
