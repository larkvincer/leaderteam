'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const log = require('gulplog');


gulp.task('css', function() {
	return gulp.src('./public/stylesheets/*.css')
		.pipe(concat('main.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('javascript', function() {
	// set up the browserify instance on a task basis
	let b = browserify({
		entries: './public/javascripts/index.js',
		debug: true,
	});

	return b
		.transform('babelify', {presets: ['es2015']})
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

gulp.task('js-watch', function() {
	return gulp.watch('./public/javascripts/*.js', ['javascript']);
});
gulp.task('css-watch', function() {
	return gulp.watch('./public/stylesheets/*.css', ['css']);
});
gulp.task('watch', ['js-watch', 'css-watch']);
