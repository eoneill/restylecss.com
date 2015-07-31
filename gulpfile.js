"use strict";

var gulp = require("gulp");

require("./tasks/metalsmith")(gulp);
require("./tasks/sassdoc")(gulp, ["metalsmith"]);
require("./tasks/deploy")(gulp, ["build"]);

gulp.task("build", ["metalsmith", "sassdoc"]);
gulp.task("default", ["deploy"]);
