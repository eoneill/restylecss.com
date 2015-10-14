---
title: Custom Functions
topic: Defining Patterns
tags: restyle, function, special properties
layout: default.hbt
date: 2015-10-13
order: 1080
---

## Introduction

reSTYLE allows you to author very expressive patterns, but has one major limitation: it doesn't allow logic. This is starkly different from Sass' mixins, which encourage logic throughout your code.

reSTYLE leverages conventions to intuitively build up UI patterns, but there are times when you may still need some logic, and that's where reSTYLE custom functions come in.

## `restyle-function`

The special `restyle-function` directive allows us to define special blocks of code within a UI pattern definition that will be executed as a function upon invocation.

Here's a quick example:

```scss
@import "restyle";

@function my-background($value) {
  @return (
    background: transparent url($value);
  )
}

@include restyle-define(example, (
  // ...
  restyle-function(my-background): 'path/to/image.png'
));

.example {
  @include restyle(example);
}
```
And the output:

```css
.example {
  /* ... */
  background: transparent url(path/to/image.png);
}
```

As you see here, we pass the name of our custom function to the `restyle-function` directive. At invocation time, we then execute `my-background` function passing it the values on the right-hand side. The custom function then returns a `map` that is merged back into the styles.

## With lazy values

Another use case is when you have lazy evaluated values that you need to pass into a function.

For example, we might want to do something like this:

```scss
@import "restyle";

@include restyle-define(example, (
  color: black,
  font-color: invert(this(color))
));
```

The problem is that `this(color)` is lazy and won't be evaluated at the time that `invert()` is invoked.

To work around this, we would use a custom function:

```scss
@import "restyle";

@at-root {
  @function font-color-invert($color) {
    @return (
      font-color: invert($color)
    );
  }

  @include restyle-define(example, (
    color: black,
    restyle-function(font-color-invert): this(color)
  ));
}
```

This will now work the way we intended.

But what's with the `@at-root`, I hear you asking? `@at-root` creates a new scope in Sass, which we can take advantage of here to not leak our `font-color-invert` function into the global scope!
