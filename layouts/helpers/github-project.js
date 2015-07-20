"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("github-project", function(path) {
    return "//github.com/" + config.site.git.account + "/" + config.site.git.repo + "/" + path;
  });
};
