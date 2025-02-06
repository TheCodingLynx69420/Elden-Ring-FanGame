//some important points (if you have no idea about elden ring characters): Radahn is the villain in this game (the character on the right side of the screen). malenia is the main character which you control. (you guys can use your own character png of different games also, but for the sake of my preference i am using these two);

//lets go!!;

//lets set up variable for score logic (we are gonna work on its function later below);

let score = 0;

let dodge = true;

//adding background music (i do not own any of it, visit github for music link/reference!);

let audio = new Audio('assets/Radahn.mp3');
audio.load();  //this will load the music file as soon as someone visits the web game;

// Plays the audio when the user clicks on the game; 
document.addEventListener('click', function () {
    audio.play();
    audio.loop = true;  //loops the background music;
});

// Stops the music when the user double clicks in the game;

document.addEventListener('dblclick', function (){
    audio.pause();
    audio.loop = false; // un-loops the background music;
})


//making a function for controlling the main character;

document.onkeydown = function (e) {
    //we will be controlling the main character using arrow keys!;
    /*controls:
        Arrow Up  = Jump;
        Arrow Left = go left ;
        Arrow Right = go right;*/

    if (e.key === 'ArrowUp') {
        malenia = document.querySelector('.malenia');
        //adding the jumping animation class (which is gonna replace the ".malenia one in the HTML file");
        malenia.classList.add('animateMalenia');
        //now we dont want malenia to keep jumping so we are gonna add a "setTimeout" method to remove the class after exactly 700 mili seconds (it is also like a cooldown of when you can jump again);
        setTimeout(() => {
            malenia.classList.remove('animateMalenia');
        }, 700); //warning: do not spam/mash the up button as it can cause a temporary glitch in the game where your character would not be able to jump for a while. so just wait for half a second atleast before pressing the up key again;

    }

    if (e.key === 'ArrowRight') {
        malenia = document.querySelector('.malenia');
        mx = parseInt(window.getComputedStyle(malenia, null).getPropertyValue('left'));
        malenia.style.left = mx + 110 + "px";

    }

    if (e.key === 'ArrowLeft') {
        malenia = document.querySelector('.malenia');
        mx = parseInt(window.getComputedStyle(malenia, null).getPropertyValue('left'));
        malenia.style.left = (mx - 110) + "px";

    }
}

//now adding collisions (how game would be over if you were not able to dodge radahn);

setInterval(() => {
    //setting up variables of characters;
    malenia = document.querySelector('.malenia');
    radahn = document.querySelector('.radahn');

    //variable for game over;
    gameOver = document.querySelector('.gameOver');
    //variable for making end message visible;
    endmess = document.querySelector('.endmess');

    //now we are gonna take out the character's value (positions in x-y) so we can detect when malenia's div and radahn's div are coming too close (so if you couldnt dodge, your game would be over);

    //we are gonna use "parseInt" in the below variables because the values would be in "px" and we need to convert it into "Numbers" to perform "Math" methods on it

    // mx = malenia's x position;
    //my = malenia's y position;


    mx = parseInt(window.getComputedStyle(malenia, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(malenia, null).getPropertyValue('top'));

    //rx = radahn's x position;
    //ry - radahn's y position;

    rx = parseInt(window.getComputedStyle(radahn, null).getPropertyValue('left'));
    ry = parseInt(window.getComputedStyle(radahn, null).getPropertyValue('top'));

    //now we are gonna find out if both of them are getting too close;

    //setting up variables for distance calculations;
    offsetX = Math.abs(mx - rx);
    offsetY = Math.abs(my - ry);

    //offsetX 141 and offsetY 61 is the most close they both get before crossing each other so this is the number i choosed, be sure to test out on your own pngs (because pngs can differ from sizes), you can use "console.log (offsetX , offsetY)" before the if-else statement below and check in the dev console for finding out the distance for your pngs;

    if (offsetX < 141 && offsetY < 61) {
        //this will make the "game over" visible and malenia will go poof*(because shes dead xd);
        gameOver.style.visibility = 'visible';
        //this will make the ending message visible
        endmess.style.visibility = 'visible';


        audio.pause(); //the music would be paused after you lose;
        audio.loop = false;
        radahn.classList.remove('animateRadahn');
        malenia.classList.remove('malenia');
    }
    //this piece of code below might look confusing but it is actually really useful: by default your score will keep going up because according to the code when you are not dying it will keep adding scores infinitly regardless of you dodging or not (because we set "dodge = true;" above), so this piece below adds the score logic, so you only get a score when you dodge (jumps across radahn); 
    else if (offsetX < 145 && dodge) {
        score += 1;
        updateScore(score);
        dodge = false; //setting the dodge to false to prevent further score increment;
        setTimeout(() => {
            dodge = true;
        }, 1000) //after 1 second it will set dodge to true again (so you would be able to continue getting scores later when you dodge again) **big brain stuff**;
    }

}, 100)

//making function for adding up score as you dodge radahn (the function is called above in the "else" section);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}


//------------------END----------------
