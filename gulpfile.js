'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const minifyJS = require('gulp-uglify');
const browserify = require('browserify');
const stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const log = require('gulplog');
const path = require('path');


gulp.task('scss', function() {
	return gulp.src('./public/stylesheets/*.scss')
		.pipe(concat('main.scss'))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		// .pipe(minifyCSS())
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('javascript', function() {
	// set up the browserify instance on a task basis
	let b = browserify({
		entries: './public/javascripts/index.js',
		debug: true,
	});

	return b
		.transform('babelify', {presets: ['env']})
		.bundle()
		.pipe(stream('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
	// Add transformation tasks to the pipeline here.
		.pipe(minifyJS())
		.on('error', log.error)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/dist/'));
});

const src = path.resolve(__dirname, 'public');
gulp.task('js-watch', function() {
	return gulp.watch(
		'javascripts/*.js',
		{cwd: src},
		['javascript']);
});
gulp.task('css-watch', function() {
	return gulp.watch(
		'stylesheets/*.scss',
		{cwd: src},
		['scss']);
});
gulp.task('watch', ['js-watch', 'css-watch']);
