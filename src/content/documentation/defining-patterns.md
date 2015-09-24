---
title: Defining UI Patterns
topic: Defining Patterns
tags: getting started, patterns, restyle-define, grammar
layout: default.hbt
date: 2015-09-24
order: 1000
---

## Introduction

reSTYLE's core concept is defining (or registering) UI patterns. This is accomplished by associating a pattern _identifier_ with a pattern _definition_ (as a Sass map).

Let's start out with creating a simple `button` pattern.

```scss
@include restyle-define(button, (
  background-color: #4787ed,
  border: 1px solid #3079ed,
  border-radius: 2px,
  color: #fff,
  display: inline-block,
  font-weight: bold,
  padding: 5px 10px,
  text-align: center,
  vertical-align: middle
));
```

This pattern can now be invoked with the `restyle()` mixin:

```scss
.btn {
  @include restyle(button);
}
```

This will output the following CSS...

```css
.btn {
  background-color: #4787ed;
  border: 1px solid #3079ed;
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  font-weight: bold;
  padding: 5px 10px;
  text-align: center;
  vertical-align: middle;
}
```

Simple, right?

## Capturing Definitions

Already have CSS you want to convert into a UI pattern? It's as simple as capturing the CSS into your pattern identifier:

```scss
@include restyle-define(button) {
  background-color: #4787ed;
  border: 1px solid #3079ed;
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  font-weight: bold;
  padding: 5px 10px;
  text-align: center;
  vertical-align: middle;
}

.btn {
  @include restyle(button);
}
```

Capturing is a great solution for converting existing stylesheets, but lacks many of the advanced features when using a proper reSTYLE definition.

<!--
TODO
advanced examples
-->