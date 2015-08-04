---
title: Getting Started
topic: Getting Started
tags: getting started
layout: default.hbt
date: 2015-07-20
order: 0
---

## Introduction

reSTYLE introduces a new way of thinking about and authoring reusable, composable UI patterns.

reSTYLE is an [eyeglass](http://github.com/sass-eyeglass/eyeglass/) module that brings UI pattern authoring to your [Sass](http://sass-lang.com).

<!-- Learn more about the [philosophy of reSTYLE]({{link "philosophy"}}). -->

## Installation

Install `eyeglass-restyle` via npm.

```sh
npm install eyeglass-restyle --save
```

### `dependencies` vs `devDependencies`

If you're integrating reSTYLE into your application, you can safely use `--save-dev` and add it to your `devDependencies`.

If you're creating a pattern library to distribute via npm, you should use `--save` to add it to your `dependencies`.

### Integrating with your app

If you're building an app with reSTYLE, you'll need to ensure that `eyeglass` and `node-sass` are correctly configured and integrated into your build pipeline.

You'll want to check out the [`eyeglass` installation guide](https://github.com/sass-eyeglass/eyeglass#user-content-installing-eyeglass) for more details and advanced options, but here's a quick example integrating with a `broccoli` pipeline.

First, install the `broccoli-eyeglass` module:
```sh
npm install broccoli-eyeglass --save-dev
```

Then configure it in your `Brocfile.js`:
```js
var compileSass = require('broccoli-eyeglass');

var outputDirectory = "dist";
var options = {
  cssDir: "assets/css",
  fullException: false
}
var outputTree = new compileSass(inputTrees, options);
```

## Usage

Once you've got your pipeline configured, you can start using reSTYLE in your Sass. Using it starts out as simple as adding an `@import` to your Sass file:

```scss
@import "restyle";
```

You can now define reusable, composable UI patterns using the `restyle-define()` mixin:

```scss
@include restyle-define(my-ui-pattern, (
  color: #333,
  border: 1px solid #444
));
```

And retrieving the definition is one call to `restyle()` away:

```scss
.my-element {
  @include restyle(my-ui-pattern);
}
```

That's it! You're now ready to create your own UI patterns.


## Up next

Learn more about [configuration options]({{link "documentation/configuration"}}).

<!--TODO[what makes up a UI pattern]({{link "documentation/what-are-ui-patterns"}}), [defining UI patterns]({{link "documentation/defining-ui-patterns"}}), and-->
