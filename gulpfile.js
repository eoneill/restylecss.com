"use strict";

var gulp = require("gulp");

require("./tasks/metalsmith")(gulp);
require("./tasks/sassdoc")(gulp, ["metalsmith"]);
require("./tasks/version-sassdoc")(gulp, ["sassdoc"]);
require("./tasks/deploy")(gulp, ["build"]);
require("./tasks/serve")(gulp);

gulp.task("build", ["metalsmith", "sassdoc", "version-sassdoc"]);
gulp.task("default", ["deploy"]);
