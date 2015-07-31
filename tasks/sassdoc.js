"use strict";

var sassdoc = require("sassdoc");
var wait = require("gulp-wait");

var restylePath = "./node_modules/eyeglass-restyle/";
var waitDelay = 1000;

module.exports = function(gulp, depends) {
  gulp.task("sassdoc", depends || [], function () {
    var stream = sassdoc({
      dest: "./tmp/dist/api",
      package: restylePath + "package.json"
    });

    return gulp.src(restylePath + "sass/**/*.s[ac]ss")
      .pipe(stream)
      // TODO - this is a hack :(
      .pipe(wait(waitDelay));
  });
};
