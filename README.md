# devmentor.pl - HTML and CSS RWD: project based on design from [Colorlib.](https://colorlib.com/)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

To check how everything works please upload an example.csv file from my repository into the website.

### The challengels

The goal of this task was to complete the project for a hypothetical client that was left in the middle by another soft developer. At the starting point, I had a HTML structure and very basic CSS styling.

Features to create:

- User has to be able to upload CSV file with trips details,
- trips details have to be converted to be displayed to User,
- after loading trips, User can choose any trip by adding a number of adults and children to the order and by clicking the button "dodaj do zamówienia" ("add to order"),
- after adding the trip to the order, the trips are added to the basket and the total is displayed to the User,
- User can add as many trips as he/she wants to the basket or remove them by clicking on " X ",
- User can order trips by filling out the full name and e-mail address and clicking the button "zamawiam" ("order").
- enable the option of adding the empty trip to the basket (my idea),

- add a little bit of styling to make the website looks more user-friendly.

### Screenshot

![](./assets/screenshot.png)

### Links

- Solution URL: [See my code]()
- Live Site URL: [Check it out here]()

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Vanilla JS
- desktop only version

### What I learned

This project was a final task for the javascript forms section. By coding it I learned what CSV file is and how to add it to the website using `FileReader()` object. One of the difficult parts was to convert data from file to lines and columns, actually, columns were harder part. To do it I had to use a match method and regex. I wanted to separate every sentence by commas but to ignore commas inside the double-quotes. That was a long search and read for me to find a matching regex as before I used it only to validate data, not splitting it.

```const content = rawContent.map((col) =>
    col.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
  );
```

After converting the details I had to get all data separated into variables which I achieved by using forEach loop and deconstruction. To create a markup, instead of cloning NodeElement and filling it with data I decided to create a full HTML markup inside JS file. I learned this approach some time ago from the JS course I took.

With this project, I had to plan all the functionality and decided what steps should I take to make it work. The very first time I decided to refactor my code into smaller functions along the way instead of doing it in the end and I was very pleased with the process of coding as this approach made it much easier and cleaner.

I had a chance to sharpen my skills in moving around in a DOM tree and selecting elements that were created dynamically by JS and could not be selected another way.

```const adultField = currentSubmit.firstElementChild.firstElementChild;
  const adultPrice = adultField.firstElementChild.innerText.slice(1, -1);
```

To figure out what element is clicked by User and which trip should be added to the basket I had to use event delegation (which means listening for the event on the parent element and figuring out which element was clicked). I used the same method to find out what trip should be deleted from the basket as well.

In the end, I would like to share the code which I am proud of as it took me longer than other parts to figure out. The problem was finding out what element User wants to delete (to search the basket (array)) and to delete only this element. I decided to use `findIndex()` method with two conditions and then the splice method.

```const deleteItemfromBasket = function (e) {
  const title = e.target.parentElement.firstElementChild.innerText;
  const price = Number(
    e.target.parentElement.firstElementChild.nextElementSibling.innerText.slice(
      0,
      -3
    )
  );
  const index = basket.findIndex(function (item, i) {
    if (item.title === title && item.total === price) {
      return i;
    }
  });
  basket.splice(index, 1);
};
```

I had a lot of fun coding this task and loved coding in plain javascript.

### Useful resources

- [Regex101.com](https://regex101.com/) - Genius website to test regex expressions.
- [Stackoverflow: Regex](https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript) - This thread helped me to split CSV file into columns exactly how I needed plus I learned a lot thanks to its users explanations.
- [MDN Web Docs](https://developer.mozilla.org/en-US/) - This is really the best place to go when the method doesn't work as expected.
- [50 Gorgeous Color Schemes From Award-Winning Websites](https://visme.co/blog/website-color-schemes/) - This article is great to get some inspirations in color matching. To create simple CSS styling I used nr 30 Close to Nature.

## Author

- Github - [Axseinga](https://github.com/axseinga)
- Frontend Mentor - [@Axseinga](https://www.frontendmentor.io/profile/axseinga)
- LinkedIn - [@Agnieszka Urbanowicz](https://www.linkedin.com/in/agnieszka-urbanowicz-051147151/)

## Acknowledgments

Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) - for providing me with this task and for code review.
