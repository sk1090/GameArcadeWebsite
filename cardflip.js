/* Adapted from Open Source Code,  Sharma, Nawin and Thapa, Parth, Flipping Card Memory Game, 2024,
https://github.com/NawinKumarSharma/FlippingCards/tree/main . Licensed under the MIT License,
 https://github.com/NawinKumarSharma/FlippingCards/blob/main/LICENSE. --*/

const cards = document.querySelectorAll(".card"); //gets the cards by finding elements of the card class

var firstCard; //will store the first card that's flipped
var secondCard; //will store the second card that's flipped
var isFlipped = false; // stores whether anything has been flipped
let lockBoard = false; // Prevents clicking during card flipping and comparison
let nummatches = 0; //stores the total number of matches that the player has made
let count = 0; //used to check if the link to the main page has been selected

window.addEventListener("load", init);

//adds event listener for arrow keys
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
  //adds an event listener for clicks for each card
  for(let i = 0;i<16;i++)
  {
    cards[i].addEventListener("click", flipCards);
  }

  //adds an event listener for clicks for the replay game button
  let replaybutton = document.getElementById("replay");
  replaybutton.addEventListener("click", ResetBoard);

  shuffleCards();
}

function checkCanFlip() {
  //checks if a card comparison is being made or if the card was just already flipped, in which cases the card can't be flipped
  if (lockBoard || (this === firstCard))
  {
    return false;
  }else{
    return true;
  }
}

//function to flip the cards once clicked on
function flipCards() {
  if(!checkCanFlip())
  {
    return;
  }
  this.classList.add("flip");

  //if no cards have been flipped set firstCard to equal the current card
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
  } else {   //if one card has been flipped set this card to the secondCard and check if it matches the firstcard
    secondCard = this;
    checkIfMatched();
  }
}


function checkIfMatched() {
  lockBoard = true; //locks the board so card flips aren't allowed
  if (firstCard.dataset.image === secondCard.dataset.image) { //checks if the images for both cards match
    nummatches++;
    Matched();

    //if 8 matches total have been mmade, lets the user know they've won
    if(nummatches == 8)
    {
      document.getElementById("win_message").textContent = "YOU WON!";
    }
  } else {
    NotAMatch();
  }
}


function ResetBoard() {
  //resets number of matches to be zero
  nummatches = 0;

  //removes the flip class and adds an event listener for each card
  for(let i = 0;i<cards.length;i++)
  {
      cards[i].classList.remove("flip");
      cards[i].addEventListener("click", flipCards);
  }
  ResetGlobalVars();

  //shuffles the cards after a slight delay
  setTimeout(shuffleCards, 500);
}


function Matched() {
  //removes the click event listener for both cards so they won't respond to clicks1
  firstCard.removeEventListener("click", flipCards)
  secondCard.removeEventListener("click", flipCards)
  ResetGlobalVars(); //resets global vars pertaining to a card flip
}



function NotAMatch() {
  //uses setTimeout method to wait 450 ms
  setTimeout(() => {
    //removes the flip class from both cards so they can be flipped again
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    ResetGlobalVars();
  }, 450);
}


//resets global vars pertaining to a card flip
function ResetGlobalVars() {
  isFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffleCards()
{
  //shuffles the cards by reordering them
  for(let i = 0;i<cards.length;i++)
  {
      cards[i].style.order = Math.floor(Math.random() * cards.length);
  }
}
