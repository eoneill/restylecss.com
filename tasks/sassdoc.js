"use strict";

var sassdoc = require("sassdoc");
var merge = require("lodash.merge");
var fs = require("fs-extra");
var exec = require("child_process").execSync;
var config = require("../config")();

var downloadRoot = "./tmp/.eyeglass-restyle/";
var destPath = "./src/api/"
var versions = config.documentedVersions;
var stableVersion = config.stableVersion || versions[versions.length - 1];

var gitRepo = "git@github.com:eoneill/eyeglass-restyle.git";

module.exports = function(gulp, depends) {
  gulp.task("sassdoc", depends || [], function () {
    var jobs = [];

    function addJob(version, isStable) {
      fs.mkdirp(downloadRoot);

      var downloadPath = downloadRoot + "eyeglass-restyle-" + version + "/";
      var downloadZip = downloadRoot + version + ".zip";

      // if it already exists, don't download it again
      if (!fs.existsSync(downloadPath)) {
        console.log("downloading eyeglass-restyle@" + version + " before running SassDoc");
        // otherwise, download it from github
        exec([
          "curl -L -o " + downloadZip + " https://github.com/eoneill/eyeglass-restyle/archive/v" + version + ".zip &> /dev/null",
          "unzip " + downloadZip + " -d " + downloadRoot + " &> /dev/null",
          "ls -laR " + downloadPath
        ].join(" && "));
      }

      // create a new job for sassdoc
      var job = sassdoc({
        // only add a versioned directory if it's not flagged as stable
        dest: destPath + (isStable ? "" : "v" + version),
        package: merge(require("../" + downloadPath + "package.json"), {
          title: "eyeglass-restyle",
          homepage: "/"
        }),
        shortcutIcon: "./src/favicon-32x32.png"
      });

      // start processing the job
      gulp.src(downloadPath + "sass/**/*.s[ac]ss")
        .pipe(job);

      // push the promise onto the array so we can track it
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
