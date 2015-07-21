"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("badge-url", function(path) {
    if (/(?:github|travis)/.test(path)) {
      path += "/" + config.site.git.account + "/" + config.site.git.repo;
    }
    else if (/npm/.test(path)) {
      path += "/" + config.site.package.name;
    }

    return config.site.badges + "/" + path + ".svg?style=flat-square";
  });
};
