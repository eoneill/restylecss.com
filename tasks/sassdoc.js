"use strict";

var sassdoc = require("sassdoc");
var fs = require("fs-extra");
var exec = require("child_process").execSync;
var config = require("../config")();

var installPath = "./tmp/";
var destPath = "./src/api/"
var versions = config.documentedVersions;
var stableVersion = config.stableVersion || versions[versions.length - 1];

var gitRepo = "git@github.com:eoneill/eyeglass-restyle.git";

module.exports = function(gulp, depends) {
  gulp.task("sassdoc", depends || [], function () {
    var jobs = [];

    function addJob(version, isStable) {
      var path = installPath + "eyeglass-restyle@" + version + "/";

      // if it already exists, don't download it again
      if (!fs.existsSync(path)) {
        console.log("downloading eyeglass-restyle@" + version + " before running SassDoc");
        // otherwise, download it from git
        exec("git clone --branch v" + version + " " + gitRepo + " " + path);
      }

      // create a new job for sassdoc
      var job = sassdoc({
        // only add a versioned directory if it's not flagged as stable
        dest: destPath + (isStable ? "" : "v" + version),
        package: path + "package.json"
      });
      gulp.src(path + "sass/**/*.s[ac]ss")
        .pipe(job);

      // push the job onto the array
      jobs.push(job.promise);
    }

    // remove the /api dir
    fs.removeSync(destPath);

    // create a job for all
    versions.map(function(version) {
      addJob(version);
    });

    addJob(stableVersion, true);

    return Promise.all(jobs);
  });
};
