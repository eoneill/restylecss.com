---
title: Nesting Selectors
topic: Defining Patterns
tags: restyle, selectors
layout: default.hbt
date: 2015-08-17
draft: false
order: 1010
---

## Nesting Selectors

reSTYLE provides you with the ability to compose intuitive and semantic UI patterns that are decoupled from the specific selector hierarchy often found in complex stylesheets. However, pattern authors might need the flexibility to enforce some rigidity, or to work around existing global selectors within their site that would otherwise be difficult to dissociate.

Take this example output from a button nested within a button group in [Bootstrap](http://getbootstrap.com/components/#btn-groups):

```css
.btn:first-child {
  margin-left: 0;
}

.btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

```

You can use Sass syntax within your reSTYLE UI pattern to accomplish this. Simply wrap your selector in quotes, and you're good to go:

```scss
@include restyle-define(button, (

  /* button styles here... */

  '&:first-child': (
    margin-left: 0
  ),

  '&:first-child:not(:last-child):not(.dropdown-toggle)': (
    border-top-right-radius: 0,
    border-bottom-right-radius: 0
  )
));


.btn {
  @include restyle(button);
}

```

You can define selectors within other selectors for even more composability. Using the example from above:

```scss
@include restyle-define(button, (

  /* button styles here... */

  '&:first-child': (
    margin-left: 0,

    '&:not(:last-child):not(.dropdown-toggle)': (
      border-top-right-radius: 0,
      border-bottom-right-radius: 0
    )
  )
));
```

In general, we recommend against implementing an explicit selector hierarchy and suggest breaking down UI patterns into reusable components that leverage other core reSTYLE functionality like [modifiers]({{link "documentation/modifiers"}}) and [states]({{link "documentation/states"}}).

<!--[variables]({{link "documentation/restyle-variables"}}),-->