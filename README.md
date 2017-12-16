# scrollcontrol.js
## Animate css properties, set properties, and call functions based on page scroll location
### Include in your project
```html
<script src="scrollcontrol.js"></script>
```
### To animate properties, use the following function:
```javascript
function AnimateOnScroll(startingPos, endingPos, element, cssProp, startingVal, endingVal, units = "")
```
startingPos and endingPos are the scroll location you want the animation to start and end.  All positions are base on a 0 - 1 scale.  So if you want an animation to start 20% down the page, and end 50% down the page, startingPos and endingPos are 0.2 and 0.5.

element is the css selector (string) of the element to be controlled.  You can use a class or element name to change multiple elements at once. (e.g. ".myClass", "h1")

cssProp is the CSS property you wish to animate.  Any numerical properties can be animated, as well as colors (in hex format).

startingVal and endingVal are the starting and ending values of the property you wish to animate.  Don't include units (px or %), and colors can be input as hex code, with or without the '#'.

units (**optional**) are the units of the property value as a string (e.g. "px" "%")

### To set properties, use the following:
```javascript
function SetOnScroll(startingPos, endingPos, element, cssProp, originalVal, newVal, units = "")
```
This acts the same as AnimateOnScroll, except when you cross the threshold (anywhere between startingPos and endingPos), it will set the property to newVal, and when you are outside of that range, it sets the property to originalVal.  units is still an optional parameter.

### To call a function on scroll, use:
```javascript
function TriggerOnScroll(startingPos, endingPos, fn, triggerOnce, reverseFn = function() {})
```
startingPos and endingPos set the range, just like previously.

fn is a function you wish to call when the user enters that range.

reverseFn (**optional**) is a function you wish to call whenever the user exits that range.

triggerOnce is a boolean.  If true, fn will only be called the first time the range is entered, and not each subsequent time.

fn and reverseFn are only called when a user enters or leaves the set threshold.  They are not called continuously.

## Example:
```javascript
AnimateOnScroll(0.1, 0.3, "#testMover", "left", 110, -25, "%");
//Between 10% and 30% scroll, this will move element "#testMover"
//from the right of the screen (left: 110%;) to the left (left: -25%;)
AnimateOnScroll(0.7, 1.0, ".container", "background-color", "#88bc00", "#00bfff");
//Between 70% and 100% scroll, this will change the background color of
//all elements with class ".container" from green to a cool light blue
SetOnScroll(0.7, 1.0, "#bgColor", "display", "none", "block");
//At 70% scroll, "#bgColor" becomes visible, scrolling back to below 70% makes it invisible again
TriggerOnScroll(0.5, 0.7, TestFunction, false, TestFunctionReverse);
//Once the range of 50-70% scroll is entered, TestFunction will run.
//Once the range is left, TestFunctionReverse will run.
//Since triggerOnce is set to false, this will happen every time.
```

## Demo
[View a Demo On Codepen](https://codepen.io/wesborland1234/pen/goaMbZ)
