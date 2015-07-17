"use strict";

var moment = require("moment");

var dateFormats = {
  xmldate: "ddd, DD MMM YYYY HH:mm:ss ZZ",
  sitemapdate: "YYYY-MM-DD",
  date: "Do MMMM YYYY"
};

function formatDate(format, date) {
  return moment(date).format(format);
}

module.exports = function(Handlebars) {
  Object.keys(dateFormats).forEach(function(type) {
    var format = dateFormats[type];
    Handlebars.registerHelper(type, formatDate.bind(formatDate, format));
  });
};
