---
title: Sandbox
date: 2015-07-20
layout: default.hbt
draft: true
aside: true
topic: Dev Demo
tags: here, are, example, tags
---

## Typography (h2)

This is some normal text. Bacon ipsum dolor amet biltong pastrami t-bone pork loin tenderloin sausage short loin boudin frankfurter tail pancetta meatball beef ribs rump. Hamburger pork chop cupim, strip steak jowl pastrami spare ribs shank landjaeger meatloaf cow turkey.

Ground round frankfurter jowl pastrami strip steak turkey landjaeger drumstick kielbasa swine jerky chuck meatball. Pork chop andouille beef ribs pig, picanha turducken beef chuck doner corned beef hamburger ribeye filet mignon pork belly tail. Porchetta corned beef turducken venison leberkas.

### Links

Here's a link to [Google.com](http://www.google.com)

### This is an h3

#### This is an h4

##### This is an h5

###### This is an h6

### Blockquote

> Bacon ipsum dolor amet biltong pastrami t-bone pork loin tenderloin sausage short loin boudin frankfurter tail pancetta meatball beef ribs rump. Hamburger pork chop cupim, strip steak jowl pastrami spare ribs shank landjaeger meatloaf cow turkey. Ground round frankfurter jowl pastrami strip steak turkey landjaeger drumstick kielbasa swine jerky chuck meatball. Pork chop andouille beef ribs pig, picanha turducken beef chuck doner corned beef hamburger ribeye filet mignon pork belly tail. Porchetta corned beef turducken venison leberkas.

## Now some `code`...

This is what `inline code` will look like.

And this is what some block code will look like...
```css
.btn {
  display: inline-block;
  padding: 5px 10px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #3079ed;
  border-radius: 2px;
  background-color: #4787ed;
  color: #fff;
  cursor: pointer;
}
```

We can convert this to a reSTYLE definition as follows:

```scss
@import "restyle";

// define our UI element...
@include restyle-add(button, (
  // Note that this is different from a Sass $variable. The Sass $variable will
  //  be evaluated at definition time, whereas the special restyle variable is
  //  evaluated at invocation time. This is important for the cascading
  //  behavior of modifiers/states
  '@restyle.var border-color': #3079ed,

  display: inline-block,
  padding: 5px 10px,
  font-weight: bold,
  text-align: center,
  vertical-align: middle,
  border: 1px solid '@var.border-color',
  border-radius: 2px,
  background-color: #4787ed,
  color: #fff,
  cursor: pointer,

  '@restyle.states': (
    hover: (
      background-color: #357ae8,
      border-color: #2f5bb7
    ),

    disabled: (
      border-color: '@var.border-color',
      // note that we can reference other values within the definition
      background-color: '@root.background-color',
      color: '@root.color',
      opacity: 0.8,
      cursor: default
    )
  ),
  '@restyle.modifiers': (
    secondary: (
      '@restyle.var border-color': rgba(0, 0, 0, 0.1),
      border: 1px solid '@var.border-color',
      background-color: #f5f5f5,
      color: #444,

      '@restyle.states': (
        hover: (
          background-color: #e0e0e0,
          border-color: null,
          color: #333
        )
      )
    )
  )
));

// register the states (note that this would be a "per app" configuration)
@include restyle-add-state((
  hover: '&:hover',
  disabled: '&[disabled]'
));

// ...

// now invoke it...
.btn {
  @include restyle(button);
  &.secondary {
    @include restyle(secondary button);
  }
}
```
