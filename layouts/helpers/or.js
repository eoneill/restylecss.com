"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("or", function(a, b) {
    return a || b;
  });
};
