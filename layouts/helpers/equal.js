"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("equal", require("handlebars-helper-equal"));
};
