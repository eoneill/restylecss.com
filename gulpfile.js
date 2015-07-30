"use strict";

var gulp = require("gulp");

require("./tasks/build")(gulp);
require("./tasks/sassdoc")(gulp, ["build"]);
require("./tasks/deploy")(gulp, ["sassdoc"]);

gulp.task("default", ["deploy"]);
