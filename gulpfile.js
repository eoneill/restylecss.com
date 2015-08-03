"use strict";

var gulp = require("gulp");

require("./tasks/build")(gulp, ["sassdoc"]);
require("./tasks/lint")(gulp);
require("./tasks/sassdoc")(gulp);
require("./tasks/deploy")(gulp, ["build"]);
require("./tasks/serve")(gulp, ["sassdoc"]);
require("./tasks/test")(gulp, ["lint", "build"]);

gulp.task("default", ["build"]);
