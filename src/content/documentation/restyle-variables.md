---
title: reSTYLE Variables
shorttitle: Variables
topic: Defining Patterns
tags: restyle, variables, var, restyle-var, special properties
layout: default.hbt
date: 2015-10-13
order: 1050
---

## Introduction

We all know how powerful Sass `$variables` are and how much they've changed the world of CSS.

reSTYLE variables aren't quite as revolutionary, but they solve a problem that Sass variables don't address: lazy evaluation.

## Lazy evaluation

Sass variables are evaluated at the time they are referenced, which is very intuitive and will cover most use cases you'll encounter. reSTYLE variables behave slightly different, and aren't evaluated until the entire style map is ready to resolve.

Similar to how we used [property references]({{link "documentation/property-references"}}) earlier, variables allow us to define values within our definition that we can reference elsewhere.

```scss
@include restyle-define(example, (
  restyle-var(color): black,
  // ...
  color: restyle-var(color),
  restyle-modifier(alt): (
    restyle-var(color): blue
  )
));

.example {
  @include restyle(example);
  &.alt {
    @include restyle(alt example);
  }
}
```

will output:

```css
.example {
  color: black;
}
.example.alt {
  color: blue;
}
```

## Scope

reSTYLE variable references will look up the scope chain to find a variable definition. This is different than property references, which only look at the properties on the current context.

```scss
@include restyle-define(example, (
  restyle-var(color): black,
  color: restyle-var(color),  // black
  background-color: this(color),  // black
  restyle-state(hover): (
    background-color: restyle-var(color), // black
    background-color: this(color) // error: cannot resolve this(color)
  )
));
```
