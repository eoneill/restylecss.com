---
title: This is an example
date: 2015-07-17
layout: default.hbt
---

## {{page.title}}

some text...

some more text...

### And now some `code`...

First, some `inline code`...

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
.btn:hover {
   background-color: #357ae8;
   border-color: #2f5bb7;
}
.btn[disabled] {
  border-color: #3079ed;
  background-color: #4787ed;
  color: #fff;
  opacity: 0.8;
  cursor: default;
}


.btn.secondary {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  color: #444444;
}
.btn.secondary:hover {
  background-color: #e0e0e0;
  color: #333333;
}
.btn.secondary[disabled] {
  border-color: rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  color: #444444;
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

Bacon ipsum dolor amet biltong pastrami t-bone pork loin tenderloin sausage short loin boudin frankfurter tail pancetta meatball beef ribs rump. Hamburger pork chop cupim, strip steak jowl pastrami spare ribs shank landjaeger meatloaf cow turkey. Ground round frankfurter jowl pastrami strip steak turkey landjaeger drumstick kielbasa swine jerky chuck meatball. Pork chop andouille beef ribs pig, picanha turducken beef chuck doner corned beef hamburger ribeye filet mignon pork belly tail. Porchetta corned beef turducken venison leberkas.

Leberkas jowl tri-tip, strip steak filet mignon ham hock kevin shankle. Tail salami short ribs t-bone meatball venison. Cupim hamburger ham, bresaola ground round tenderloin turkey venison spare ribs. Turducken picanha corned beef tenderloin shankle pork loin bresaola leberkas porchetta. Sausage landjaeger pork loin fatback. Pork loin cupim tail capicola venison jowl sausage biltong. Fatback rump shankle tongue brisket doner picanha prosciutto boudin ground round beef tri-tip cow alcatra swine.

T-bone beef kevin, sirloin turkey pork belly drumstick doner shankle brisket boudin hamburger kielbasa ribeye. Sausage tail spare ribs beef bacon, alcatra chuck shoulder swine short loin meatloaf. Fatback tri-tip pastrami flank chuck short ribs tenderloin pork loin. Boudin brisket venison leberkas pork turducken. Biltong ground round ball tip pastrami capicola turkey kevin shoulder doner. Tongue turducken alcatra andouille, shankle jowl venison. Pancetta corned beef cupim turducken landjaeger.

Kielbasa shank frankfurter chicken andouille. Alcatra cupim kielbasa meatball bacon boudin. Meatloaf leberkas kevin, brisket fatback corned beef cow. Pork belly jerky turducken flank ribeye pork biltong leberkas short ribs tri-tip bresaola pancetta turkey rump. Beef bresaola shankle, boudin tongue strip steak turkey andouille kevin frankfurter pork loin flank jerky. Capicola leberkas spare ribs doner brisket picanha.

Kevin cow pancetta, sirloin chuck tri-tip bacon pork loin strip steak fatback ham tail tenderloin hamburger corned beef. Ham picanha cupim sirloin cow doner venison pancetta shank pork. Doner pastrami andouille, pork loin beef ribs short loin ball tip kielbasa turducken. Spare ribs boudin brisket frankfurter, alcatra chicken capicola short loin shank sirloin andouille cupim ham hock tail doner. Boudin beef ribs rump tenderloin alcatra. Short loin picanha landjaeger, brisket drumstick meatloaf short ribs tail strip steak beef tri-tip pork chop kevin. Alcatra ham hock ham capicola leberkas beef corned beef short ribs.