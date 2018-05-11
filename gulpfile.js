const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-uglify');

gulp.task('css-production', function() {
	return gulp.src('./public/stylesheets/*.css')
		.pipe(concat('main.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('css-development', function() {
	return gulp.src('./public/stylesheets/*.css')
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('js-production', function() {
	return gulp.src('./public/javascripts/*.js')
		.pipe(concat('main.js'))
		.pipe(minifyJS('main-min.js'))
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('js-development', function() {
	return gulp.src('./public/javascripts/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('build', ['js-production', 'css-production']);
gulp.task('dev-build', ['js-development', 'css-development']);

gulp.task('js-watch', function() {
	return gulp.watch('./public/javascripts/*.js', ['js-development']);
});
gulp.task('css-watch', function() {
	return gulp.watch('./public/stylesheets/*.css', ['css-development']);
});
gulp.task('watch', ['js-watch', 'css-watch']);
