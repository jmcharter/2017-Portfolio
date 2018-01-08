/*jslint node: true */

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

function handleError (error) {
    console.log(error.toString());
    this.emit("end");
}

gulp.task("sass", function(){
    return gulp.src("app/css/scss/**/*.scss")
        .pipe(sass()) //Converts Sass to CSS with gulp-sass
        .on("error", handleError)
        .pipe(gulp.dest("app/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch",["browserSync","sass"], function(){
    gulp.watch("app/css/scss/**/*.scss", ["sass"]);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);

});

gulp.task("browserSync", function(){
    browserSync.init({
        server: {
            baseDir: "app"
        },
    })
});