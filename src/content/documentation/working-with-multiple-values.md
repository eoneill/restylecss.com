---
title: Working with multiple values
shorttitle: Multiple Values
topic: Defining Patterns
tags: restyle, multiple-values
layout: default.hbt
date: 2015-10-01
order: 1070
---

## Introduction

We [previously learned how to use namespaced keys]({{link "documentation/namespaced-keys"}}) to represent multiple properties of the same key in a definition. Here we'll discuss an alternate approach when you need multiple values attached to a single key.

## `multiple-values`

reSTYLE provides a `multiple-values` function, which takes n number of arguments and decorates them into a single value but preserves the representation.

Let's rework our previous example with multiple `color` values:

```css
.example {
  color: #ccc;
  color: rgba(0,0,0, 0.2);
}
```

And again we'd get an error if we simply converted this to...

```scss
@include restyle-define(example, (
  color: #ccc,
  color: rgba(0,0,0, 0,2)
));
```

So let's give `multiple-values` a shot:

```scss
@include restyle-define(example, (
  color: multiple-values(
    #ccc,
    rgba(0,0,0, 0,2)
  )
));
```

That's all folks!

## More values, more fun

If you want to actually access these values yourself, you can use the `with-multiple-values` mixin:

```scss
$values: multiple-values(a, b, c);

@include with-multiple-values($values) {
  /* #{$restyle-current-value} */
}
```

This mixin will iterate through each value and within the `@content` block you'll have access to the current value in the `$restyle-current-value` variable.

Alternately, you can get collection of values as a list using the `get-multiple-values` function:

```scss
$values: multiple-values(a, b, c);
@each $value in get-multiple-values($values) {
  // do stuff with $value
}
```

<!--
TODO: multiple values vs namespaced keys
-->
