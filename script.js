
var win = false;
var vboard = ["","","","","","","","",""];
var bestof = 3;
var gamenum = 1;
var gamewin = false;
var winBox = document.getElementById("winnerbox");
var boardcells = document.getElementsByClassName("cell");

function Player(chip,name) {
   this.chip = chip;
   this.name = name;
   this.wins = 0;
   this.games = [];
}

function Game() {
   this.allRounds = [];
}

var gameSet = new Game();

var playerone = new Player("X","Home");
var playertwo = new Player("O","Away");

function Board() {

   this.center = document.getElementById("center");
   this.sideLeft = document.getElementById("sidel");
   this.sideRight = document.getElementById("sider");
   this.midtop = document.getElementById("midtop");
   this.botmid = document.getElementById("botmid");
   this.centl = document.getElementById("centl");
   this.centr = document.getElementById("centr");
   this.main = document.getElementsByClassName("main")[0];
   this.boardcells = document.getElementsByClassName("cell");
   this.open = false;
   

}

var ticBoard = new Board();

function Rounds() {

   this.start = false;
   this.first = false;
   this.counter = 0;
   this.board = [[,,],[,,],[,,]];
   this.winner = "";
   this.tie = false;
   this.players = [];

}

var round = new Rounds();
gameSet.allRounds.push(round);
playerone.games.push(round);
playertwo.games.push(round);
round.players.push(playerone);
round.players.push(playertwo);

// This function starts the game. meaning it goes into game mode and out of intro mode. 
function startGame() {

         round.start = true;
      	ticBoard.sideLeft.style.display = 'block';
      	ticBoard.sideRight.style.display = 'block';
         ticBoard.sideLeft.style.opacity = '1';
         ticBoard.sideRight.style.opacity = '1';
         cleanBoard();
         update();
}

//this function runs when user chooses to play again. it advances the game num.
function gamePlayagain() {

         cleanBoard();
         lightboard();
         gamenum++;
         update();
}

// Returns "X" or "0"
function checkTurn() {

      if (round.first) {
         if(round.counter % 2 == 0) {
            return playertwo.chip;
         }
         else {
            return playerone.chip;
         }
      }
      else {
         if(round.counter % 2 == 0) {
            return playerone.chip;
         }
         else {
            return playertwo.chip;
         }
      }
}

//Performs actions to be taken when win button clicked
function winButtonClick() {

         document.getElementById("winb").onclick = function() {  
            console.log("im here");
            document.getElementById("minWin").className = "";
            document.getElementById("winnerbox").className = "";
            document.getElementById("bestofbox").style.width = "308px";
            document.getElementById("winnerbox").getElementsByTagName("h2").innerHTML = "Game Over";
            document.getElementById("minWin").innerHTML = "Game<br />Over";
            console.log("now here");
            reset();
            startGame();
         };
}

//flashes winners name
function winFlash(winclass) {
         document.getElementById(winclass).parentNode.getElementsByTagName('h3')[0].style.color = "orange";
         console.log("winner " + winclass);   
}

// Displays board to console
function dis_board() {
         console.log(" 00:" + round.board[0][0] + " 01:" + round.board[0][1] + " 02:" + round.board[0][2]);
         console.log(" 10:" + round.board[1][0] + " 11:" + round.board[1][1] + " 12:" + round.board[1][2]);
         console.log(" 20:" + round.board[2][0] + " 21:" + round.board[2][1] + " 22:" + round.board[2][2]);
}

//Converts array of play values into a 2d array that i use to test win conditions
function convert_table() {

         for(var i in vboard){
            round.board[Math.floor(i/3)][i%3] = vboard[i];
         }
         dis_board();

}

//Updates all important values to the screen. Scores and game # and turn
function update() {

         document.getElementById("home_score").innerHTML = "0" + playerone.wins;
         document.getElementById("away_score").innerHTML = "0" + playertwo.wins;
         document.getElementById("bestofbox").getElementsByTagName('div')[0].innerHTML = checkTurn();
         document.getElementById("bestofbox").getElementsByTagName('div')[1].innerHTML = gamenum + "/" + bestof;
         whole();
}

//resets the entire board in the event of a quit
function reset() {

      	round.start = false;
      	ticBoard.sideLeft.style.display = 'none';
      	ticBoard.sideRight.style.display = 'none';
         ticBoard.sideLeft.style.opacity = '0';
         ticBoard.sideRight.style.opacity = '0';
         winBox.className = "";
         playertwo.wins = 0;
         playerone.wins = 0;
         gamenum = 1;
      	close();
         cleanBoard();
         lightboard();
         update();
         document.getElementById("bestofbox").getElementsByTagName('div')[0].innerHTML = "";
         document.getElementById("bestofbox").getElementsByTagName('div')[1].innerHTML = "";
}

//Cleans board to begin new game.
function cleanBoard(){

         round.counter = 0;
         vboard = ["","","","","","","","",""];
         round.board = [["","",""],["","",""],["","",""]];
         win = false;
         document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
         document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
         document.getElementById('homewin').style.display = "none";
         document.getElementById('awaywin').style.display = "none";
         document.getElementById('playagain').style.display = "none";
         document.getElementById('graybox').style.display = "none";

         for(i=0;i<ticBoard.boardcells.length;i++)
         {
            document.getElementsByClassName("cell")[i].getElementsByTagName("p")[0].innerHTML = "&nbsp;";
         }
   
}
//opens the center box and displays the welcome screen
function open() {

         if(document.documentElement.clientWidth > 624){
   	      
            center.className = "cell centeropen";
            ticBoard.midtop.className = "midcolopen";
            ticBoard.botmid.className = "midcolopen";
            ticBoard.centl.className = "midrowopen";
            ticBoard.centr.className = "midrowopen";
            ticBoard.main.style.height="499px";
            ticBoard.main.style.width="608px";
            document.getElementById("pop").className = "open2";
         }
         else {
            center.className = "cell centersmallopen";
            document.getElementById("minstart").className = "open2";
         }
         ticBoard.open = true;// lets the program know that the center box has been opened
}
//Closes the center box
function close() {
	 
      if(document.documentElement.clientWidth > 624){ // checks for the size of the screen
            // center.className = (start == true ? "cell":"cell centerclosed");
            if (round.start == true){ // if game has begun then the center cell should act as a regular cell

               center.className = "cell";
            }
            else {

               center.className = "cell centerclosed";
            }
         	ticBoard.midtop.className = "cell";
            ticBoard.botmid.className = "cell";
            ticBoard.centl.className = "cell";
            ticBoard.centr.className = "cell";
         	ticBoard.main.style.height="375px";
         	ticBoard.main.style.width="308px";
            document.getElementById("pop").className = "";
      }
      else {
         console.log("testtestest");
         center.className = (round.start == true ? "cell centerplay":"cell centerclosed");
         document.getElementById("minstart").className = "";
      }
      ticBoard.open = false;
}

//Colors the board dark to highlight play moves and changes the color of score boards
function darkboard() {

      console.log("helo in the dark")
      for(i in ticBoard.boardcells)
      {
            ticBoard.boardcells[i].className = "cell dark";
         
      }
      document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "white";
      document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "white";
      document.getElementById("home_score").style.color = "white";
      document.getElementById("away_score").style.color = "white";
}

//Colors the board for the game to begin
function lightboard() {

      for(i in ticBoard.boardcells)
      {
            ticBoard.boardcells[i].className = "cell";
         
      }
      document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
      document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
      document.getElementById("home_score").style.color = "#aaa";
      document.getElementById("away_score").style.color = "#aaa";
}

// Checks to see if there is a win condition. if so it returns the function win() with the winners number inside.
// This counts the number of wins of each player and returns true.

function checkWin() {

      for(i = 0; i < 3; i++ ){
         var y = 0; z = 0; c = 0; p = 0; t = 0; q = 0;
         for(f = 0; f < 3; f++){
            if(round.board[i][f] == playerone.chip){
               y += 1;
            }
            if(round.board[i][f] == playertwo.chip){
               z += 1;
            }
            if(round.board[f][i] == playerone.chip){
               c += 1;
            }
            if(round.board[f][i] == playertwo.chip){
               p += 1;
            }
            if(round.board[f][f] == playertwo.chip){
               t += 1;
            }
            if(round.board[f][f] == playerone.chip){
               q += 1;
            }
         }
         if(y == 3 || c == 3 || q == 3) {
            return wins(1);
         }
         if(z == 3 || p == 3 || t == 3) {
            return wins(2);
         }
      }

      if(round.board[0][2] == playerone.chip && round.board[1][1] == playerone.chip && round.board[2][0] == playerone.chip ) {
         return wins(1);
      }
      
      else if(round.board[0][2] == playertwo.chip && round.board[1][1] == playertwo.chip && round.board[2][0] == playertwo.chip ) {
         return wins(2);
      }
      
      return false;
}

// Adds a point to the player who won and checks for a gamewin and adjusts a variable. 
function wins(winnum) {
      if (winnum == 1) {

         playerone.wins += 1;
         round.winner = playerone.name;
         console.log("X wins: " + playerone.wins );
         // winFlash("home_score");
         document.getElementById('homewin').style.display = "block";
         if(playerone.wins == bestof - Math.floor(bestof/2))
         {
            gamewin = true;
         }
      }
      else {

         playertwo.wins += 1;
         round.winner = playertwo.name;
         console.log("O wins: " + playertwo.wins );
         // winFlash("away_score");
         document.getElementById('awaywin').style.display = "block";
          if(playertwo.wins == bestof - Math.floor(bestof/2))
         {
            gamewin = true;
         }
      }
      round.first = !round.first;
      return true;
}

function gamewinner() {
      gamewin = false;
      cleanBoard();
      lightboard();
      if(document.documentElement.clientWidth > 624){
         center.className = "centeropenwin"
         ticBoard.midtop.className = "midcolopen";
         ticBoard.botmid.className = "midcolopen";
         ticBoard.centl.className = "midrowopen";
         ticBoard.centr.className = "midrowopen";
         ticBoard.main.style.height="499px";
         ticBoard.main.style.width="608px";
         document.getElementById("bestofbox").style.width = "608px";
       
         document.getElementById("winnerbox").className = "open2";
      }
      else {
         
         document.getElementById("minWin").className = "open2";

      }
      round.first = !round.first;
      ticBoard.open = true;

}

function whole() 
{
      console.log("in the else"); 
      if(round.start == false) {

        	ticBoard.center.onclick = function() {

         	if(ticBoard.open==false && round.start == false){
         	  open();
              whole();
         	}
         	else if (ticBoard.open==true && round.start == false) {
         	  close();
              whole();
         	}   	 
         }
         document.getElementById("pop").onclick = function() {
            close();
            whole();
         }
         document.getElementById("startb").onclick = function() {
         	close();
            startGame();
            whole();
         }
         document.getElementById("headr").onclick = function() {
            if(round.start == true){
         	reset();
            center.className = "centerclosed";
            console.log("start: " + round.start + " x: " + x )
            document.getElementById("headr").className = "";
            whole();
         }
         else {
            whole();
         }
         }
         document.getElementById("minstart").onclick = function() {
            startGame();
            close();
            lightboard();
            whole();
            
         }
         document.getElementById("minWin").onclick = function() {

            startGame();
            document.getElementById("minWin").className = "";
            playertwo.wins = 0;
            playerone.wins = 0;
            gamenum = 1;
            round.first = !round.first;
            update();
            lightboard();
            whole();

            
         }
      }

      else 
      {  
         document.getElementById("headr").className = "shine";
         console.log("in the else");
         for(i in ticBoard.boardcells)
         {  
               ticBoard.boardcells[i].onclick = function() 
               {
                     console.log("in the for");
                     if(round.counter <=9 && win == false && round.start == true) 
                     {

                        if(this.getElementsByTagName("p")[0].innerHTML == "&nbsp;") 
                        {
                           now = this.getElementsByTagName("p")[0].id;
                           this.getElementsByTagName("p")[0].innerHTML = checkTurn();
                           vboard[now-1] = checkTurn();
                           convert_table();
                           win = checkWin();
                           round.counter+=1;
                           update();
                        }
                     }
                     if(win == true || round.counter == 9)
                     {
                        if(gamenum != bestof){
                        document.getElementById('playagain').style.display = "block";
                        document.getElementById('graybox').style.display = "block";
                        darkboard();
                        update();
                        }
                        else {
                           gamewin = true;
                           document.getElementById("winnerbox").getElementsByTagName("h2")[0].innerHTML = "It's a tie!";
                           document.getElementById("minWin").innerHTML = "Tie<br />Game";
                           gamewinner();
                           round.tie = true;
                           winButtonClick();
                        }

                     }
               }
               
         }

         if(gamewin == true)
         {
            if(!round.tie){ 
               gamewinner();
            }
            winButtonClick();
         }
         if(win == true || round.counter == 9)
         {
            document.getElementById("playagain").onclick = function() {
               gamePlayagain();
               
            }
            document.getElementById("awaywin").onclick = function() {
               gamePlayagain();
            }
            document.getElementById("homewin").onclick = function() {
               gamePlayagain();
            }
            document.getElementById("awaywin").onclick = function() {
               gamePlayagain();
            }
            for(i in ticBoard.boardcells)
            {
                  document.getElementsByClassName("cell")[i].onclick = function() 
                  {
                     gamePlayagain();

                  }
            }
         }

      }  
       
}


