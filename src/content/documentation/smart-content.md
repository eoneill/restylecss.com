---
title: Smart Content
topic: Integration
tags: smart content
layout: default.hbt
date: 2015-10-01
order: 2010
---

## Introduction

reSTYLE Smart Content allows you to quickly enable performance benefits without changing your stylesheets.

## Enabling Smart Content

Smart Content is disabled by default, but it's easy to enable via a config option:

```scss
@include restyle-config(smart-content-enabled, true);
```

## What it does

Smart Content will automatically start using `@extend` and dynamic `%placeholders` behind the scenes.

This can drastically reduce your CSS output.

### Show me the codes

First our definition:

```scss
@include restyle-define(example, (
  color: red,
  font-size: 100%
));
```

And now and implementation:

```scss
.example1 {
  @include restyle(example);
}

.example2 {
  @include restyle(example);
}
```

This will output a unique set of rules per selector:

```css
.example1 {
  color: red;
  font-size: 100%;
}

.example2 {
  color: red;
  font-size: 100%;
}
```

#### And now with Smart Content enabled:

```scss
@include restyle-config(smart-content-enabled, true);

.example1 {
  @include restyle(example);
}

.example2 {
  @include restyle(example);
}
```

Our output is now...

```css
.example1, .example2 {
  color: red;
  font-size: 100%;
}
```

## Notice about support

To use Smart Content, you must be using `node-sass >= 3.4`. There was a bug in `libsass` that will cause incorrect selectors to be generated. See [sass/libsass#1297](https://github.com/sass/libsass/issues/1297).
