"use strict";

var gulp = require("gulp");

require("./tasks/build")(gulp);
require("./tasks/deploy")(gulp, ["build"]);

gulp.task("default", ["deploy"]);
