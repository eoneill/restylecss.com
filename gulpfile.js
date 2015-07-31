"use strict";

var gulp = require("gulp");

require("./tasks/metalsmith")(gulp, ["sassdoc", "version-docs"]);
require("./tasks/sassdoc")(gulp);
require("./tasks/version-docs")(gulp, ["sassdoc"]);
require("./tasks/deploy")(gulp, ["build"]);
require("./tasks/serve")(gulp);

gulp.task("build", ["metalsmith"]);
gulp.task("default", ["deploy"]);
