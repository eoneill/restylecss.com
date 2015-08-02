"use strict";

var gulp = require("gulp");

require("./tasks/build")(gulp, ["doc"]);
require("./tasks/sassdoc")(gulp);
require("./tasks/deploy")(gulp, ["build"]);
require("./tasks/serve")(gulp, ["sassdoc"]);
require("./tasks/test")(gulp, ["deploy:dry"]);

gulp.task("default", ["build"]);
