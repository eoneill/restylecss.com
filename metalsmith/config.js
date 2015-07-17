"use strict";

var merge = require("lodash.merge");

var argv = require("minimist")(process.argv.slice(2), {
  alias: {
    env: "environment",
    serve: "server"
  }
});

var pkg = require("../package.json");
var config = {
  site: {
    themeColor: "#5a95dd",
    title: "reSTYLE - an eyeglass module",
    description: "TODO",
    tagline: "TODO",
    styles: ["main.css"],
    copyright: {
      holder: "LinkedIn Corporation",
      year: new Date().getFullYear()
    },
    url: "",
    git: {
      account: "eoneill",
      repo: "eyeglass-restyle"
    },
    badges: "https://img.shields.io"
  },
  livereload: {
    host: "localhost:35729"
  },
  isProduction: false,

  environment: {
    production: {
      site: {
        url: "http://www.restylecss.com"
      },
      isProduction: true,
      livereload: false
    }
  }
};

if (argv.environment) {
  config = merge(config, (config.environment && config.environment[argv.environment]) || {});
}

module.exports = merge(config, {
  argv: argv
});
