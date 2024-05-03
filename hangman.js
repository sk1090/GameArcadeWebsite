"use strict";
let guesses = 6; //6 guesses per game
let pres = ""; //present case of the randomly chosen author

//list of authors
let authors = ["Ayn Rand",
"Emily Bronte",
"Franz Kafka",
"Edith Wharton",
"Aldous Huxley",
"Paulo Coelhos",
"Sylvia Plath",
"Jack London",
"Thomas Mann",
"Jules Verne",
"Jack Kerouac",
"Maya Angelou",
"John Keats",
"Plato",
"John Milton",
"Anne Frank",
"Stephen King",
"Beatrix Potter",
"Paulo Coelho",
"Anton Chekhov",
"Enid Blyton",
"George Orwell",
"Charles Dickens",
"Leo Tolstoy",
"Jane Austen",
"Homer",
"James Joyce",
"Mark Twain",
"Robert Frost",
"Virgil",
"Oscar Wilde",
"C S Lewis",
"Victor Hugo",
"J K Rowling",
"Walt Whitman",
"George Eliot",
"Marcel Proust",
"Albert Camus",
"Thomas Hardy",
"Joseph Heller",
"Aesop",
"Louisa May Alcott"];
let letters_right = 0;
let num_letters = 0;

//array to hold each name of the chosen author, separated by spaces
let splitAuthors = [];
let count=0;

(function() {

  window.addEventListener("load", init);
  //adds keyboard event listener for the arrow keys
  window.addEventListener("keydown", pressArrow);

  //selects or unselects the link to the main game arcade page when the arrows are pressed
  function pressArrow(event) {
    if ((event.code === "ArrowLeft" || event.code === "ArrowRight"||event.code === "ArrowUp"||event.code === "ArrowDown") && count%2 == 0) {
          document.querySelector("[tabindex='1']").focus();
          count = count + 1;
    }else if ((event.code === "ArrowLeft" || event.code === "ArrowRight"||event.code === "ArrowUp"||event.code === "ArrowDown") && count%2 == 1) {
              document.querySelector("[tabindex='1']").blur();
              count = count+1;
    }
  }


  function init() {
    let letters = document.querySelectorAll("#letter-button button");
    //adds an event listener for all the buttons if they're clicked on
    for(let i = 0; i < letters.length; i++) {
      letters[i].addEventListener("click", clickedLetters);
    }
    //adds an event listener for the repla ybutton
    document.getElementById("replay").addEventListener("click", restartGame);

    //chooses index of author name from array list
      let authorIndex = Math.floor(Math.random() * 42);

       pres = authors[authorIndex];
       splitAuthors = pres.split(' ');
       num_letters = pres.length - (splitAuthors.length - 1);

    //adds the transparent text of the author name to the page
    let count1 = 0; let count2 = 0; let flag = 0;
    for(let i=0;i<splitAuthors.length;i++)
    {
      for (let j = 0; j < splitAuthors[i].length; j++) {
        let newParagraph = document.createElement("p");
        newParagraph.textContent = splitAuthors[i][j];// + "\u00A0"
        document.getElementById("dashes").appendChild(newParagraph);
        document.getElementById("dashes").innerHTML+= "&nbsp;&nbsp;&nbsp;"
      }
      document.getElementById("dashes").innerHTML+= "&nbsp;&nbsp;&nbsp;&nbsp;"
      if(((i==1 || i==0) && i!=splitAuthors.length-1)&& (splitAuthors[i].length + splitAuthors[i+1].length ) > 7){
        document.getElementById("dashes").innerHTML+= "<br>"
      }
   }
  }

  //event handler for when the letter guess buttons are clicked
  function clickedLetters(event) {
    if(!event.currentTarget.classList.contains("clicked")&&guesses>0) { //
      event.currentTarget.classList.add("clicked");
    let nodeList = document.querySelectorAll("p");
    let flag2 = 0;

    //checks if the letter chosen matches any of the letters in the word and reveals it in the word if it does
    for(let i=0;i<splitAuthors.length;i++)
    {
      for (let j = 0; j < splitAuthors[i].length; j++) {
        if(event.currentTarget.textContent.toLowerCase() === splitAuthors[i][j] || event.currentTarget.textContent === splitAuthors[i][j])
        {
          letters_right++;
          flag2 = 1;
          (event.currentTarget.style).color = "green";
          for(let k = 0;k<nodeList.length;k++)
          {
             if (nodeList[k].textContent===splitAuthors[i][j])
             {

               nodeList[k].style.color = "black";
             }
          }
        }
      }
    }

  //checks if the entire author name was guessed currectly, if so displays the win message
  if(letters_right == num_letters)
  {
    document.getElementById("win-message").innerHTML = "<p>YOU WON!</p>";
  }

  //for the case where the letter didn't match at all, removes a guess and hangs part of the man
    if (flag2 == 0)
    {
      (event.currentTarget.style).color = "red";
        guesses = guesses - 1;
        let hangman = document.getElementById("hangman-image"); // 1. Get the box image
        if(guesses == 5)
        {
          /*
  						Image source citation: Hangman-1.png, 2005, Wikimedia Commons, Uploaded by User:Demi,
  								 [CC BY-SA 3.0 DEED (https://creativecommons.org/licenses/by-sa/3.0/deed.en], https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Hangman-1.png/640px-Hangman-1.png
  				*/
          hangman.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Hangman-1.png/640px-Hangman-1.png";
        }else if(guesses == 4){
          /*
  						Image source citation: Handman-2.png, 2005, Wikimedia Commons, Uploaded by User:Demi,
  								 [CC BY-SA 3.0 DEED (https://creativecommons.org/licenses/by-sa/3.0/deed.en], https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hangman-2.png/640px-Hangman-2.png
  				*/
            hangman.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hangman-2.png/640px-Hangman-2.png";
        }else if(guesses == 3){
          /*
              Image source citation: Handman-3.png, 2005, Wikimedia Commons, Uploaded by User:Demi,
                   [CC BY-SA 3.0 DEED (https://creativecommons.org/licenses/by-sa/3.0/deed.en], https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hangman-3.png/640px-Hangman-3.png
          */
            hangman.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hangman-3.png/640px-Hangman-3.png";
        }else if(guesses == 2){
          /*
              Image source citation: Hangman-4.png, 2005, Wikimedia Commons, Uploaded by User:Demi,
                   [CC BY-SA 3.0 DEED (https://creativecommons.org/licenses/by-sa/3.0/deed.en], https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Hangman-4.png/640px-Hangman-4.png
          */
            hangman.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Hangman-4.png/640px-Hangman-4.png";
        }else if(guesses == 1){
          /*
              Image source citation: Hangman-5.png, 2005, Wikimedia Commons, Uploaded by User:Demi,
                   [CC BY-SA 3.0 DEED (https://creativecommons.org/licenses/by-sa/3.0/deed.en], https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Hangman-5.svg/640px-Hangman-5.svg.png
          */
            hangman.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Hangman-5.svg/640px-Hangman-5.svg.png";
        }else if(guesses == 0){ //case where the game is lost
          /*
  						Image source citation: Hangman-6.png, 2005, Wikimedia Commons, Uploaded by User:Demi,
  								 [CC BY-SA 3.0 DEED (https://creativecommons.org/licenses/by-sa/3.0/deed.en], https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hangman-6.png/640px-Hangman-6.png
  				*/
            hangman.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hangman-6.png/640px-Hangman-6.png";

            //reveals the correct author name
            for(let k = 0;k<nodeList.length;k++)
             {
                letters_right++;
                 nodeList[k].style.color = 'black';
             }

             document.getElementById("win-message").innerHTML = "<p>YOU LOST!</p>";
        }
    }
    flag2 = 0;
    }
  }

  //resets the game for a new turn
  function restartGame(event) {
    letters_right = 0;
    num_letters = 0;
    guesses = 6;
    splitAuthors = [];
    //resets the text and images
    document.getElementById("win-message").innerHTML = "";
    document.getElementById("dashes").innerHTML = "";
    document.getElementById("hangman-image").src = "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png?20060625005217";
    let letters = document.querySelectorAll("#letter-button button");
    //resets the butttons
    for(let i = 0; i < letters.length; i++) {
      letters[i].addEventListener("click", clickedLetters);
      letters[i].style.color = 'black';
      letters[i].classList.remove("clicked");
    }
    //gets index for new guess in array
    let authorIndex = Math.floor(Math.random() * 42);
     pres = authors[authorIndex];
     splitAuthors = pres.split(' ');
     num_letters = pres.length - (splitAuthors.length - 1);

     //resets the new guess and dashes on page
    let count1 = 0; let count2 = 0; let flag = 0;
    for(let i=0;i<3;i++)
    {
      for (let j = 0; j < splitAuthors[i].length; j++) {
        let newParagraph = document.createElement("p");
        newParagraph.textContent = splitAuthors[i][j];// + "\u00A0"
        document.getElementById("dashes").appendChild(newParagraph);
        document.getElementById("dashes").innerHTML+= "&nbsp;&nbsp;&nbsp;"
      }
      document.getElementById("dashes").innerHTML+= "&nbsp;"
      if(((i==1 || i==0) && i!=splitAuthors.length-1)&& (splitAuthors[i].length + splitAuthors[i+1].length ) > 7){
        document.getElementById("dashes").innerHTML+= "<br>"
      }
    }
  }

})();
