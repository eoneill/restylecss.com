"use strict";

module.exports = function(Handlebars, config) {

  return function(files, metalsmith, done) {

    require("../helpers")(Handlebars, config);
    require("../partials")(Handlebars);

    done();
  };
};
