---
title: Namespaced Keys
topic: Defining Patterns
tags: restyle, special properties
layout: default.hbt
date: 2015-10-01
order: 1060
---

## Introduction

When creating UI patterns in reSTYLE, you might have a need to distinguish between multiple keys with the same name.

For example, you might have the following use case:

```css
.example {
  color: #ccc;
  color: rgba(0,0,0, 0.2);
}
```

So let's convert this into a reSTYLE definition:

```scss
@include restyle-define(example, (
  color: #ccc,
  color: rgba(0,0,0, 0,2)
));
```

## The issue

Unfortunately, you'll quickly be prompted with an error

```
Duplicate key "color" in map ...
```

We get the above error as, indeed, we have a duplicate key within our Sass map, which is invalid syntax.

## Namespaced keys

To work around this, we can use **namespaced keys** to achieve the desired behavior.

Here's an example of this definition using namespaced keys:

```scss
@include restyle-define(example, (
  color\fallback: #ccc,
  color: rgba(0,0,0, 0,2)
));
```

The `\fallback` will be stripped out for us and we'll get the expected output:

```css
... {
  color: #ccc;
  color: rgba(0,0,0, 0.2);
}
```

## Targeted changes

Namespaced keys can also be used to target changes to a specific property, while still preserving the other properties of the same name.

Given our above example, we can demonstrate this functionality by adding a modifier:

```scss
@include restyle-define(example, (
  color\fallback: #ccc,
  color: rgba(0,0,0, 0,2),

  restyle-modifier(alt): (
    color\fallback: transparent
  )
));
```

This will only update our `fallback` color, and preserve the value of the default color.

## Alternate syntax

Instead of `color\fallback`, you can also use the syntax `'color{fallback}'`, but be sure to quote the property.

## Up next

Learn an alternate way to represent [multiple values]({{link "documentation/working-with-multiple-values"}}) on a property.
