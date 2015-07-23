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
    themeColor: "#0077b5",
    title: "reSTYLE - an eyeglass module",
    description: pkg.description,
    tagline: "TODO",
    styles: ["default.css"],
    copyright: {
      holder: "LinkedIn Corporation",
      year: new Date().getFullYear(),
      website: "http://engineering.linkedin.com"
    },
    feed: ["examples"],
    url: "",
    git: {
      account: "eoneill",
      repo: "eyeglass-restyle"
    },
    package: {
      name: "eyeglass-restyle"
    },
    badges: "//img.shields.io",
    nav: [
      {
        href: "documentation",
        title: "Docs",
        description: "Read the docs!"
      },
      {
        href: "https://github.com/{git.account}/{git.repo}",
        title: "GitHub",
        description: "View the source on GitHub",
        target: "_blank"
      },
      {
        href: "examples",
        title: "Examples"
      },
      {
        href: "tutorials",
        title: "Tutorials"
      }
    ]
  },
  livereload: {
    host: "localhost:35729"
  },
  isProd: false,

  environments: {
    production: {
      site: {
        url: "//www.restylecss.com"
      },
      isProd: true,
      livereload: false
    },
    staging: {
      site: {
        url: ""
      },
      isProd: true,
      livereload: false
    }
  }
};

if (argv.environment) {
  config = merge(config, (config.environments && config.environments[argv.environment]) || {});
}

config.isDev = !config.isProd;

config.isServer = config.isServer || (argv && argv.server);

module.exports = merge(config, {
  argv: argv
});
