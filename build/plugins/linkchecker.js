"use strict";

var cheerio = require("cheerio");
var minimatch = require("minimatch");
var path = require("path");
var request = require("request");
var merge = require("lodash.merge");
var jsonfile = require("jsonfile");

var rProtocol = /^(?:http(s)?:)?\/\//;

var linkableTags = {
  a: "href",
  script: "src",
  link: "href",
  img: "src"
};

module.exports = function(config) {

  config = config || {};
  config.cache = config.cache && path.resolve(config.cache);

  function isExternalLink(link) {
    return rProtocol.test(link);
  }

  function resolveLocalLink(link, file) {
    // strip off any hash
    link = link.replace(/#.*$/, "");
    return path.resolve("/" + path.dirname(file), link).replace(/^\//, "") || "index.html";
  }

  function normalizeRealLink(link, isExternal, file) {
    if (isExternal) {
      return link.replace(rProtocol, "http$1://");
    }

    return resolveLocalLink(link, file);
  }

  function isExcluded(link) {
    if (!config.exclude) {
      return false;
    }
    if (!Array.isArray(config.exclude)) {
      config.exclude = [config.exclude];
    }

    return config.exclude.some(function(exclude) {
      if (minimatch(link, exclude)) {
        return true;
      }
    });
  }

  function normalizeLink(link, file) {
    if (!link || isExcluded(link)) {
      return;
    }

    link = link.replace(config.base, "");

    var isExternal = isExternalLink(link);

    return {
      uri: normalizeRealLink(link, isExternal, file),
      isExternal: isExternal,
      isLocal: !isExternal,
      file: file
    };
  }

  function readCache() {
    if (config.cache) {
      try {
        return jsonfile.readFileSync(config.cache);
      }
      catch (e) {}
    }
  }

  var allKnownFiles = [];

  return function(files, metalsmith, done) {

    var links = [];
    var brokenLinks = [];
    var cachedLinks = readCache();
    var checkedLinks = merge({}, cachedLinks, config.override);
    var filenames = Object.keys(files);

    allKnownFiles.push.apply(allKnownFiles, filenames);

    var linkableSelector = Object.keys(linkableTags).map(function(tag) {
      return tag + "[" + linkableTags[tag] + "]";
    }).join(",");

    function validateLink(link) {
      return new Promise(function(fulfill) {
        if (link.isExternal) {
          validateExternalLink(link, fulfill);
        }
        else {
          validateLocalLink(link, fulfill);
        }
      });
    }

    function validateExternalLink(link, cb) {
      if (checkedLinks[link.uri]) {
        if (!checkedLinks[link.uri].status >= 400) {
          brokenLinks.push(link);
        }

        cb();
      }
      else {
        request(link, function(error, response) {
          var status = 200;
          if (error || !response || response.statusCode >= 400) {
            status = (response && response.statusCode) || 999;
            brokenLinks.push(link);
          }
          checkedLinks[link.uri] = {
            status: status
          };
          cb();
        });
      }
    }

    function isFileMissing(file) {
      return allKnownFiles.indexOf(file) === -1;
    }

    function validateLocalLink(link, cb) {

      // if the link (or `/index.html` version) does not exist...
      if (
        isFileMissing(link.uri) &&
        isFileMissing(link.uri.replace(/\/?$/, "/index.html"))
      ) {
        brokenLinks.push(link);
      }
      cb();
    }

    filenames.forEach(function(file) {
      if (minimatch(file, "**/*.html")) {
        var data = files[file];
        var contents = data.contents && data.contents.toString();
        if (contents) {
          var $ = cheerio.load(contents);
          $(linkableSelector).each(function() {
            var attr = linkableTags[this.name];
            var link = normalizeLink(this.attribs && this.attribs[attr], file);
            if (link) {
              links.push(validateLink(link));
            }
          });
        }
      }
    });

    Promise.all(links).then(function() {
      var message = "";
      var error;

      if (brokenLinks.length) {
        message += "[metalsmith-linkchecker] The following links are broken:";
        brokenLinks.forEach(function(link) {
          message += "\n  " + link.uri + "  (in " + link.file + ")";
        });

        if (config.reportOnly) {
          console.error(message);
        }
        else {
          error = new Error(message);
        }
      }

      if (config.cache) {
        jsonfile.writeFileSync(config.cache, checkedLinks, {
          spaces: 2
        });
      }

      done(error);
    });
  };
};
