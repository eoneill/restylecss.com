"use strict";

var gulp = require("gulp");

require("./tasks/build")(gulp, ["sassdoc"]);
require("./tasks/lint")(gulp);
require("./tasks/depcheck")(gulp, null, {
  root: __dirname
});
require("./tasks/sassdoc")(gulp);
require("./tasks/deploy")(gulp, ["build"]);
require("./tasks/serve")(gulp, ["sassdoc"]);
require("./tasks/test")(gulp, ["lint", "depcheck", "build"]);

gulp.task("default", ["build"]);
