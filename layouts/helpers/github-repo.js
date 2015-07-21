"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("github-repo", function(path) {
    return "https://github.com/" + config.site.git.account + "/" + config.site.git.repo + "/" + (path || "");
  });
};
