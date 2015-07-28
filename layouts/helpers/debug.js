"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("debug", function() {
    console.log.apply(console.log, ["{{debug}}"].concat(Array.prototype.slice.call(arguments, 0, -1)));
  });
};
