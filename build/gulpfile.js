// Load plugins
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require('sass'));
const uglify = require("gulp-uglify");
const sassGlob = require("gulp-sass-glob");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const ejs = require('gulp-ejs');
const rename = require("gulp-rename");
const tinyping = require("gulp-tinypng-compress");

// CSS task
function css() {
	return gulp
		.src("../common/scss/**/*.scss", { sourcemaps: true })
		.pipe(sassGlob())
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(postcss([autoprefixer({
			cascade: false
		})]))
		.on("error", sass.logError)
		.pipe(cleanCSS())
		.pipe(gulp.dest("../common/css", { sourcemaps: './' }))
		.pipe(browsersync.stream());
}

// JS task
// function js() {
// 	return gulp
// 		.src([
// 			'./js/*.js',
// 			'!./js/*.min.js'
// 		])
// 		.pipe(uglify())
// 		.pipe(gulp.dest('../src/js'))
// 		.pipe(browsersync.stream());
// }

// Tasks
gulp.task("css", css);
// gulp.task("js", js);

// BrowserSync
function browserSync(done) {
	browsersync.init({
		proxy: "http://localhost:8888/ramen/"
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}
gulp.task("ejs", function () {
	return gulp.src(["ejs/**/*.ejs", '!' + "ejs/**/_*.ejs"])
		.pipe(ejs({}, {}, { ext: '.html' }))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("../"));
});
// Watch files
function watchFiles() {
	gulp.watch("../common/scss/**/*", css);
	gulp.watch("../build/ejs/**/*.ejs", gulp.series("ejs"));
	// gulp.watch(["../build/js/**/*.js", "!./js/*.min.js"], js);
	gulp.watch("../**/*.html", browserSyncReload);
}

gulp.task("compress", function(done) {
	gulp
	  .src("../common/img/**/*.{png,jpg,jpeg}")
	  .pipe(
		tinyping({
		  key: "RhvTfJQdQD73cjBckkjxTpjZn33q5c7p" 
		})
	  )
	  .pipe(gulp.dest("../common/compress/"));
	  done();
  });

// dev task
gulp.task("default", gulp.parallel(watchFiles, browserSync));
