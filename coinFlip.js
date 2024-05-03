"use strict";

let coinside = -1;  //result of toss
let which_img = 0; //which side/image the coin is currently on
let currentid = 0;
let timeoutid = 0;
let count = 0;

(function() {

  window.addEventListener("load", init);
  //adds event listener for arrow keys for keyboard accessibility
  window.addEventListener("keydown", pressArrow);

//selects or unselects the link to the main game arcade page when the arrows are pressed
function pressArrow(event) {
  if ((event.code === "ArrowLeft" || event.code === "ArrowRight"||event.code === "ArrowUp"||event.code === "ArrowDown") && count%2 == 0) {
        document.querySelector("[tabindex='1']").focus();
        count = count + 1;
  }
  else if ((event.code === "ArrowLeft" || event.code === "ArrowRight"||event.code === "ArrowUp"||event.code === "ArrowDown") && count%2 == 1) {
        document.querySelector("[tabindex='1']").blur();
        count = count+1;
 }

}


  function init() {
    //adds event listener for the coin flip button
    let flipbutton = document.querySelector("button");
    flipbutton.addEventListener("click", clickedFlipButton);
  }

  //event listener for the coin flip button
  function clickedFlipButton(event) {
    document.getElementById("ANSWER").textContent = " RESULT: ";
    //randomly generates result of flip
    coinside = Math.floor((Math.random() * 2));


     if(currentid!=0)
     {
       setTimeout(StopImageToggling, 0);
     }
     //calls toggleimage every 100 ms to give the illusion of a coin constantly changing while its flipped
     currentid = setInterval(ToggleImage, 100);

     //sets timeout to stop image toggling in 2000 ms
     timeoutid = setTimeout(StopImageToggling, 2000);
  }

    //switches the coin image from current image to other image
    function ToggleImage(event)
    {
      if(which_img == 0) //heads
      {
        document.getElementById("coin-image").src = "https://upload.wikimedia.org/wikipedia/commons/1/1f/Black_open_book.png";
        which_img = 1;
      }else{
        document.getElementById("coin-image").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Quill_pen_transparency.tif/lossy-page1-640px-Quill_pen_transparency.tif.jpg";
        which_img = 0;
      }
    }

    //stops the image toggling and displays result side of coin
    function StopImageToggling(event)
    {
      //uses clearInterval function  to stop the image toggling
      clearInterval(currentid);
      currentid = 0;
      //changes the coin image to be the result image if not already
      if(coinside != which_img)
      {
        if(which_img == 0) //heads
        {
          /*
  						Image source citation: Black_open_book.png, 2017, Wikimedia Commons, Uploaded by User: Wiki test 001,
  								 [CC BY-SA 4.0 DEED (https://creativecommons.org/licenses/by-sa/4.0/], https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Black_open_book.png/640px-Black_open_book.png
  				*/
          document.getElementById("coin-image").src = "https://upload.wikimedia.org/wikipedia/commons/1/1f/Black_open_book.png";
          which_img = 1;
        }else{
          document.getElementById("coin-image").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Quill_pen_transparency.tif/lossy-page1-640px-Quill_pen_transparency.tif.jpg";
          which_img = 0;
        }
      }

      //textually displays result of toss
      if(coinside == 1)
      {
        document.getElementById("ANSWER").textContent = document.getElementById("ANSWER").textContent + "HEADS";
      }else{
        document.getElementById("ANSWER").textContent = document.getElementById("ANSWER").textContent + "TAILS";
      }
    }


})();
