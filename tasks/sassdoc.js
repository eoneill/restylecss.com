"use strict";

var sassdoc = require("sassdoc");
var merge = require("lodash.merge");
var fs = require("fs-extra");
var wget = require("wget-improved");
var exec = require("child_process").execSync;
var config = require("../config")();

var downloadRoot = "./tmp/versions/";
var destPath = "./src/api/"
var versions = config.documentedVersions;
var stableVersion = config.stableVersion || versions[versions.length - 1];
var useTarGz = !config.useZip;
var gitRepo = config.repo || "eoneill/eyeglass-restyle";

module.exports = function(gulp, depends) {
  gulp.task("sassdoc", depends || [], function () {
    var jobs = [];
    var pendingSources = {};
    var packageExtension = useTarGz ? ".tar.gz" : ".zip";

    function addJob(version, isStable) {
      fs.mkdirp(downloadRoot);


      var downloadPath = downloadRoot + "eyeglass-restyle-" + version + "/";
      var downloadSource = "https://github.com/" + gitRepo + "/archive/v" + version + packageExtension;
      var downloadPackage = downloadRoot + version + packageExtension;
      var whenSourceReady = new Promise(function(resolve, reject) {
        // if it already exists, don't download it again
        if (!fs.existsSync(downloadPath)) {
          if (pendingSources[version]) {
            pendingSources[version].then(resolve);
          }
          else {
            // otherwise, download it from github
            console.log("downloading eyeglass-restyle@v" + version + " before performing SassDoc");
            wget.download(downloadSource, downloadPackage)
              .on("end", function(output) {
                exec([
                  useTarGz ? "tar -zxvf" : "unzip",
                  downloadPackage,
                  useTarGz ? "-C" : "-d",
                  downloadRoot,
                  "&> /dev/null"
                ].join(" "));
                resolve();
              })
              .on("error", function(err) {
                reject(err);
              });
          }
        }
        else {
          resolve();
        }
      });
      pendingSources[version] = whenSourceReady;

      var job = new Promise(function(resolve) {
        // start processing the job
        whenSourceReady.then(function() {
          var stream = sassdoc({
            // only add a versioned directory if it's not flagged as stable
            dest: destPath + (isStable ? "" : "v" + version),
            package: merge(require("../" + downloadPath + "package.json"), {
              title: "eyeglass-restyle",
              homepage: "/"
            }),
            shortcutIcon: "./src/favicon-32x32.png"
          });

          stream.promise.then(resolve);

          gulp.src(downloadPath + "sass/**/*.s[ac]ss")
            .pipe(stream);
        });

      });

      // push the promise onto the array so we can track it
      jobs.push(job);
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
