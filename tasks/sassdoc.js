"use strict";

var sassdoc = require("sassdoc");
var merge = require("lodash.merge");
var fs = require("fs-extra");
var wget = require("wget-improved");
var exec = require("child_process").execSync;
var config = require("../config")();

module.exports = function(gulp, depends, options) {
  options = merge({
    tmp: "./tmp/versions/",
    dest: "./src/api/",
    versions: config.documentedVersions,
    archiveExtension: ".tar.gz",
    repo: config.site.git && (config.site.git.account + "/" + config.site.git.repo),
    includeStable: true
  }, options);

  options.stableVersion = options.stableVersion || options.versions && options.versions[options.versions.length - 1];

  var useTarGz = /\.t(?:ar\.)?gz$/.test(options.archiveExtension);

  gulp.task("sassdoc", depends || [], function () {
    var jobs = [];
    var pendingSources = {};
    var packageExtension = useTarGz ? ".tar.gz" : ".zip";

    function addJob(version, isStable) {
      fs.mkdirp(options.tmp);

      // the URL to download the archive from
      var archiveUrl = "https://github.com/" + options.repo + "/archive/v" + version + options.archiveExtension;
      // the local path to download the archive to
      var archivePath = options.tmp + version + options.archiveExtension;
      // the path to extract to
      var extractPath = options.tmp + "eyeglass-restyle-" + version + "/";

      var whenSourceReady = pendingSources[version] || new Promise(function(resolve, reject) {
        try {
          // if it already exists, don't download it again
          if (!fs.existsSync(extractPath)) {
            // otherwise, download it from github
            console.log("downloading eyeglass-restyle@v" + version + " before performing SassDoc");
            wget.download(archiveUrl, archivePath)
              .on("end", function(output) {
                exec([
                  useTarGz ? "tar -zxvf" : "unzip",
                  archivePath,
                  useTarGz ? "-C" : "-d",
                  options.tmp,
                  "&> /dev/null"
                ].join(" "));
                resolve();
              })
              .on("error", function(err) {
                reject(err);
              });
          }
          else {
            resolve();
          }
        }
        catch (e) {console.log(e)};
      });
      pendingSources[version] = whenSourceReady;

      var job = new Promise(function(resolve) {
        // start processing the job
        whenSourceReady.then(function() {
          var stream = sassdoc({
            // only add a versioned directory if it's not flagged as stable
            dest: options.dest + (isStable ? "" : "v" + version),
            package: merge(require("../" + extractPath + "package.json"), {
              title: "eyeglass-restyle",
              homepage: "/"
            }),
            shortcutIcon: "./src/favicon-32x32.png"
          });

          stream.promise.then(resolve);

          gulp.src(extractPath + "sass/**/*.s[ac]ss")
            .pipe(stream);
        });

      });

      // push the promise onto the array so we can track it
      jobs.push(job);
    }

    // remove the /api dir
    fs.removeSync(options.dest);

    // create a job for all
    if (options.versions) {
      options.versions.map(function(version) {
        addJob(version);
      });
    }

    if (options.includeStable && options.stableVersion) {
      addJob(options.stableVersion, true);
    }

    return Promise.all(jobs);
  });
};
