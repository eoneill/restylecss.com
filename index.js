"use strict";

var Metalsmith = require("metalsmith");
var Handlebars = require("handlebars");

var config = require("./metalsmith/config");
var plugins = require("./metalsmith/plugins")(config);
var helpers = require("./metalsmith/helpers")(Handlebars, config);
var partials = require("./metalsmith/partials")(Handlebars);

function debug(files, metalsmith, done) {
  console.log("[metalsmith]", files);
  done();
}

new Metalsmith(__dirname)
  .metadata(config)
  .use(plugins.filter())
  .use(plugins.drafts())
  .use(plugins.watch({
    paths: {
      "${source}/**/*": true,
      "${source}/styles/**/*": "**/*",
      "layouts/**/*": "**/*",
    },
    livereload: true,
  }))
  .use(plugins.collections({
    posts: {
      pattern: "content/posts/*.md",
      sortBy: "date",
      reverse: true
    }
  }))
  .use(plugins.paginate({
    perPage: 10,
    path: ":collection/page"
  }))
  .use(plugins.excerpts())
  .use(plugins.markdown({
    gfm: true,
    tables: true,
    smartLists: true,
    smartypants: true,
    highlight: function (code, lang, callback) {
      return require("highlight.js").highlightAuto(code).value;
    }
  }))
  .use(plugins.permalinks({
    pattern: ":collection/:title",
    relative: true
  }))
  .use(plugins.pagedata())
  .use(plugins.layouts({
    engine: "handlebars"
  }))
  .use(plugins.eyeglass({
    outputStyle: config.isProduction ? "compressed" : "expanded",
    root: __dirname,
    buildDir: "${source}/assets/",
    assetsHttpPrefix: "assets"
  }))
  .use(plugins.autoprefixer())
  .use(plugins.htmlMinifier())
  .use(plugins.uglify())
  .use(plugins.serve())
  .destination("./dist")
  .build(function(err) {
    if (err) { throw err; }
  });
