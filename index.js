"use strict";

//global var currentfocus represents which game icon is selected/will be selected next
let currentfocus = 0;
(function() {

  //adds an event listener for the arrow and tab keys
  window.addEventListener("keydown", pressArrow);


  function pressArrow(event) {

    //move current focus to the next element for right arrow, up arrows and tabs,
    if ((event.keyCode == 9 || event.code === "ArrowRight"||event.code === "ArrowUp")) {
        currentfocus++;
        currentfocus = (currentfocus)%3;
    }
    //move current focus to the previous element for down and left arrows
    else if ((event.code === "ArrowLeft"||event.code === "ArrowDown")) {
          currentfocus--;
          if(currentfocus<0)
          {
            currentfocus = currentfocus+3;
          }
          currentfocus = (currentfocus)%3;
    }
      //doesn't actually move the focus for tab's because that's already implemented
    if(event.keyCode == 9)
    {
      return;
    }
    
    if(currentfocus<0)
    {
      currentfocus = currentfocus+3;
    }

    //focuses onto whichever element is the new currentfocus
    if(currentfocus == 1)
    {
      document.querySelector("[tabindex='1']").focus();
    }else if(currentfocus == 2)
    {
      document.querySelector("[tabindex='2']").focus();
    }else{
      document.querySelector("[tabindex='3']").focus();
    }

  }



})();
