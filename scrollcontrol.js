function HexToInt(hex) {
  var newInt;
  if (hex[0] == 'a' || hex[0] == 'A') {
    newInt = 16 * 10;
  } else if (hex[0] == 'b' || hex[0] == 'B') {
    newInt = 16 * 11;
  } else if (hex[0] == 'c' || hex[0] == 'C') {
    newInt = 16 * 12;
  } else if (hex[0] == 'd' || hex[0] == 'D') {
    newInt = 16 * 13;
  } else if (hex[0] == 'e' || hex[0] == 'E') {
    newInt = 16 * 14;
  } else if (hex[0] == 'f' || hex[0] == 'F') {
    newInt = 16 * 15;
  } else {
    newInt = 16 * parseInt(hex[0]);
  }
  if (hex[1] == 'a' || hex[1] == 'A') {
    newInt += 10;
  } else if (hex[1] == 'b' || hex[1] == 'B') {
    newInt += 11;
  } else if (hex[1] == 'c' || hex[1] == 'C') {
    newInt += 12;
  } else if (hex[1] == 'd' || hex[1] == 'D') {
    newInt += 13;
  } else if (hex[1] == 'e' || hex[1] == 'E') {
    newInt += 14;
  } else if (hex[1] == 'f' || hex[1] == 'F') {
    newInt += 15;
  } else {
    newInt += parseInt(hex[1]);
  }
  return newInt;
}
function IntToHex(num) {
  var firstDigit;
  var secondDigit;
  var fullString;
  firstDigit = "" + Math.floor(num / 16);
  secondDigit = "" + (num % 16);
  if (firstDigit == "10") {
	firstDigit = "A";
  } else if (firstDigit == "11") {
    firstDigit = "B";
  } else if (firstDigit == "12") {
    firstDigit = "C";
  } else if (firstDigit == "13") {
    firstDigit = "D";
  } else if (firstDigit == "14") {
    firstDigit = "E";
  } else if (firstDigit == "15") {
    firstDigit = "F";
  }
  if (secondDigit == "10") {
	secondDigit = "A";
  } else if (secondDigit == "11") {
    secondDigit = "B";
  } else if (secondDigit == "12") {
    secondDigit = "C";
  } else if (secondDigit == "13") {
    secondDigit = "D";
  } else if (secondDigit == "14") {
    secondDigit = "E";
  } else if (secondDigit == "15") {
    secondDigit = "F";
  }
  fullString = "" + firstDigit + secondDigit;
  return fullString;
}
function HexToRGB(hexColor) {
  var startIndex = 1;
  if (hexColor[0] != "#") {
    startIndex = 0;
  }
  var rString = hexColor.substr(startIndex, 2);
  var gString = hexColor.substr(startIndex + 2, 2);
  var bString = hexColor.substr(startIndex + 4,2);
  var red = HexToInt(rString);
  var green = HexToInt(gString);
  var blue = HexToInt(bString);
  return {
    r: red,
	g: green,
	b: blue
  };
}
function RGBToHex(col) {
  var red = IntToHex(col.r);
  var green = IntToHex(col.g);
  var blue = IntToHex(col.b);
  var fullString = "#" + red + green + blue;
  return fullString;
}
function GetNewColor(color1, color2, val) {
  //val should be between 0 and 1
  //Color1 is original color, closer val is to 0, closer to original color
  var rgbCol1 = HexToRGB(color1);
  var rgbCol2 = HexToRGB(color2);
  var diffRed = rgbCol2.r - rgbCol1.r;
  var diffGreen = rgbCol2.g - rgbCol1.g;
  var diffBlue = rgbCol2.b - rgbCol1.b;
  var newRed = Math.floor( (val * diffRed) + rgbCol1.r);
  var newGreen = Math.floor( (val * diffGreen) + rgbCol1.g);
  var newBlue = Math.floor( (val * diffBlue) + rgbCol1.b);
  var newColorRGB = {
    r: newRed,
	g: newGreen,
	b: newBlue
  };
  var newColor = RGBToHex(newColorRGB);
  return newColor;
}

$(document).ready(function(){
  
  var animations = [];
  var values = [];
  var triggers = [];
  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }
  function AnimateOnScroll(startingPos, endingPos, element, cssProp, startingVal, endingVal, units = "") {
    var newAnimation = {sPos: startingPos, ePos: endingPos, elem: element, cProp: cssProp, sVal: startingVal, eVal: endingVal, uts: units};
    animations.push(newAnimation);
  }
  function SetOnScroll(startingPos, endingPos, element, cssProp, originalVal, newVal, units = "") {
    var newValue = {sPos: startingPos, ePos: endingPos, elem: element, cProp: cssProp, oVal: originalVal, nVal: newVal, uts: units};
    values.push(newValue);
  }
  function TriggerOnScroll(startingPos, endingPos, fn, triggerOnce, reverseFn = function(){}) {
    var newTrigger = {sPos: startingPos, ePos: endingPos, callback: fn, callback2: reverseFn, tOne: triggerOnce, triggered: false, triggeredReverse: false};
    triggers.push(newTrigger);
  }
  function PerformTriggers(pos) {
    for (var i = triggers.length - 1; i >= 0; i--) {
      if (pos >= triggers[i].sPos && pos <= triggers[i].ePos) {
        if (triggers[i].triggered == false) {
          triggers[i].triggered = true;
          triggers[i].callback();
          triggers[i].triggeredReverse = false;
          if (triggers[i].tOne) {
            triggers.splice(i,1);
          }
        }
      } else {
        if (triggers[i].triggeredReverse == false) {
          triggers[i].triggeredReverse = true;
          triggers[i].callback2();
          triggers[i].triggered = false;
        }
      }
    }
  }
  function SetValues(pos) {
    for (var i = 0; i < values.length; i++) {
      if (pos >= values[i].sPos && pos <= values[i].ePos) {
        $(values[i].elem).css(values[i].cProp, values[i].nVal + values[i].uts);
      } else {
        $(values[i].elem).css(values[i].cProp, values[i].oVal + values[i].uts);
      }
	  }
  }
  function PerformAnimations(pos) {
    for (var i =0; i < animations.length; i++) {
      if (pos >= animations[i].sPos && pos <= animations[i].ePos) {
        if (animations[i].cProp == "color" || animations[i].cProp == "background-color") {
          var newVal = GetNewColor(animations[i].sVal, animations[i].eVal, (pos - animations[i].sPos) / (animations[i].ePos - animations[i].sPos));
        } else {
        var newVal = ((pos - animations[i].sPos) * (animations[i].eVal - animations[i].sVal) / (animations[i].ePos - animations[i].sPos)) + animations[i].sVal;
        }
        $(animations[i].elem).css(animations[i].cProp, newVal + animations[i].uts);
      } else if (pos > animations[i].ePos) {
        //Set to max value
        $(animations[i].elem).css(animations[i].cProp, animations[i].eVal + animations[i].uts);
      } else if (pos < animations[i].sPos) {
        //Set to min value
        $(animations[i].elem).css(animations[i].cProp, animations[i].sVal + animations[i].uts);
      }
    }
  }
  $(document).scroll(function(){
    var body = $("html");
    var t = body.scrollTop();
    var max = $(document).height() - $(window).height();
    var pos = t / max;
    PerformAnimations(pos);
    SetValues(pos);
    PerformTriggers(pos);
  });
});