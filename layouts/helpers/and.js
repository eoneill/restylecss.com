"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("and", function(a, b) {
    return a && b;
  });
};
