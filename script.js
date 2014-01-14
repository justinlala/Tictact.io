
var win = false;
var vboard = ["","","","","","","","",""];
var bestof = 3;
var gamewin = false;
var winBox = document.getElementById("winnerbox");
var boardcells = document.getElementsByClassName("cell");
var gameSet;
var wholeGame;


function FullGames() {
   this.allGames = [];
   this.start = false;

   this.newGame = function(){
      var ngame = new Game();
      this.allGames.push(ngame);
   };

   this.current = function(){
      return this.allGames[this.allGames.length-1];
   }
}

function ScoreBoard(player1,player2) {

         this.homeScore = document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0];
         this.awayScore = document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0];
         this.homeWin = document.getElementById('homewin');
         this.awayWin = document.getElementById('awaywin');
         this.home = player1.wins
         this.away = player2.wins;
         this.winning;

         this.homeScore.style.color = "#aaa";
         this.awayScore.style.color = "#aaa";
         this.homeWin.style.display = "none";
         this.awayWin.style.display = "none";

         this.clearScore = function() {
         
            this.homeScore.style.color = "#aaa";
            this.awayScore.style.color = "#aaa";
            this.home = 0;
            this.away = 0;

         }

         this.update = function() {
            this.home = player1.wins
            this.away = player2.wins;

            if (this.home > this.away){
               this.winning = player1.name;
            }
            else if (this.away > this.home){
               this.winning = player2.name;
            }
            else {
               this.winning = "Tie";
            }
         }



}

function Player(chip,name) {
   this.chip = chip;
   this.name = name;
   this.wins = 0;
   this.rounds = [];

   this.newRound = function(player) {
      var round = new Rounds(this,player)
      this.rounds.push(round);
   }
}

function Rounds(player1,player2) {

   this.playerone = player1;
   this.playertwo = player2;
   this.counter = 0;
   this.board = [[,,],[,,],[,,]];
   this.winner = "";
   this.cats = false;


}

function Game() {

   
   this.first = false;
   this.allRounds = [];
   this.tie = false;
   this.playerone = new Player("X","Home");
   this.playertwo = new Player("O","Away");
   this.roundScore = new ScoreBoard(this.playerone,this.playertwo);
   this.gamenum = 0;

   this.newRound = function() {
      console.log("round created");
      var round = new Rounds(this.playerone,this.playertwo);
      this.allRounds.push(round);
      // this.playerone.newRound(this.playertwo);
      // this.playertwo.newRound(this.playerone);
      // this.allRounds.push(this.playerone.rounds[0]);
      this.gamenum++;
   };
   this.getCurrentRound = function() {
      if(this.gamenum != -1){
      return this.allRounds[this.allRounds.length-1];
      }
      else
      {
         return false;
      }

   }
}



function init() {
   
  wholeGame = new FullGames();
}







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

   this.clean = function() {

      for(i=0;i<this.boardcells.length;i++)
         {
            document.getElementsByClassName("cell")[i].getElementsByTagName("p")[0].innerHTML = "&nbsp;";
         }

   };

   this.openUp = function() {

         if(document.documentElement.clientWidth > 624){
            
            center.className = "cell centeropen";
            this.midtop.className = "midcolopen";
            this.botmid.className = "midcolopen";
            this.centl.className = "midrowopen";
            this.centr.className = "midrowopen";
            this.main.style.height="499px";
            this.main.style.width="608px";
            document.getElementById("pop").className = "open2";
         }
         else {
            center.className = "cell centersmallopen";
            document.getElementById("minstart").className = "open2";
         }
         this.open = true;
   };
   this.closeIt = function() {

      if(document.documentElement.clientWidth > 624){ // checks for the size of the screen
            // center.className = (start == true ? "cell":"cell centerclosed");
            if (wholeGame.start == true){ // if game has begun then the center cell should act as a regular cell

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
         center.className = (wholeGame.start == true ? "cell centerplay":"cell centerclosed");
         document.getElementById("minstart").className = "";
      }
      ticBoard.open = false;
   };
   this.dark = function() {

      for(i in this.boardcells)
      {
            this.boardcells[i].className = "cell dark";
         
      }
   };

   this.light = function() {

      for(i in this.boardcells)
      {
            this.boardcells[i].className = "cell";
         
      }
   }
   

}

var ticBoard = new Board();



// playerone.games.push(round);
// playertwo.games.push(round);


// This function starts the game. meaning it goes into game mode and out of intro mode. 
function startGame() {

         wholeGame.current().newRound();
         wholeGame.start = true;
      	ticBoard.sideLeft.style.display = 'block';
      	ticBoard.sideRight.style.display = 'block';
         ticBoard.sideLeft.style.opacity = '1';
         ticBoard.sideRight.style.opacity = '1';
         cleanBoard();
         update();
}

//this function runs when user chooses to play again. it advances the game num.
function gamePlayagain() {

         wholeGame.current().newRound();
         cleanBoard();
         lightboard();
         update();
}

// Returns "X" or "0"
function checkTurn() {

      if (wholeGame.current().first) {
         if(wholeGame.current().getCurrentRound().counter % 2 == 0) {
            return wholeGame.current().playertwo.chip;
         }
         else {
            return wholeGame.current().playerone.chip;
         }
      }
      else {
         if(wholeGame.current().getCurrentRound().counter % 2 == 0) {
            return wholeGame.current().playerone.chip;
         }
         else {
            return wholeGame.current().playertwo.chip;
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
         console.log(" 00:" + wholeGame.current().getCurrentRound().board[0][0] + " 01:" + wholeGame.current().getCurrentRound().board[0][1] + " 02:" + wholeGame.current().getCurrentRound().board[0][2]);
         console.log(" 10:" + wholeGame.current().getCurrentRound().board[1][0] + " 11:" + wholeGame.current().getCurrentRound().board[1][1] + " 12:" + wholeGame.current().getCurrentRound().board[1][2]);
         console.log(" 20:" + wholeGame.current().getCurrentRound().board[2][0] + " 21:" + wholeGame.current().getCurrentRound().board[2][1] + " 22:" + wholeGame.current().getCurrentRound().board[2][2]);
}

//Converts array of play values into a 2d array that i use to test win conditions
function convert_table() {

         for(var i in vboard){
            wholeGame.current().getCurrentRound().board[Math.floor(i/3)][i%3] = vboard[i];
         }
         dis_board();

}

//Updates all important values to the screen. Scores and game # and turn
function update() {

         document.getElementById("home_score").innerHTML = "0" + wholeGame.current().playerone.wins;
         document.getElementById("away_score").innerHTML = "0" + wholeGame.current().playertwo.wins;
         document.getElementById("bestofbox").getElementsByTagName('div')[0].innerHTML = checkTurn();
         document.getElementById("bestofbox").getElementsByTagName('div')[1].innerHTML = wholeGame.current().gamenum + "/" + bestof;
         wholeGame.current().roundScore.update();
         whole();
}

//resets the entire board in the event of a quit
function reset() {

      	wholeGame.newGame();
         // wholeGame.current().newRound();
      	ticBoard.sideLeft.style.display = 'none';
      	ticBoard.sideRight.style.display = 'none';
         ticBoard.sideLeft.style.opacity = '0';
         ticBoard.sideRight.style.opacity = '0';
         winBox.className = "";
      	ticBoard.closeIt();
       
         lightboard();
        
         document.getElementById("bestofbox").getElementsByTagName('div')[0].innerHTML = "";
         document.getElementById("bestofbox").getElementsByTagName('div')[1].innerHTML = "";
}

function quit() {

         init();
         ticBoard.clean();
         ticBoard.closeIt();
         ticBoard.sideLeft.style.display = 'none';
         ticBoard.sideRight.style.display = 'none';
         ticBoard.sideLeft.style.opacity = '0';
         ticBoard.sideRight.style.opacity = '0';
         winBox.className = "";
         ticBoard.center.className = "centerclosed";
         ticBoard.light();

         document.getElementById("bestofbox").getElementsByTagName('div')[0].innerHTML = "";
         document.getElementById("bestofbox").getElementsByTagName('div')[1].innerHTML = "";


}

//Cleans board to begin new game.
function cleanBoard(){

         vboard = ["","","","","","","","",""];
         win = false;
         document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
         document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
         document.getElementById('homewin').style.display = "none";
         document.getElementById('awaywin').style.display = "none";
         document.getElementById('playagain').style.display = "none";
         document.getElementById('graybox').style.display = "none";

         ticBoard.clean();

         // for(i=0;i<ticBoard.boardcells.length;i++)
         // {
         //    document.getElementsByClassName("cell")[i].getElementsByTagName("p")[0].innerHTML = "&nbsp;";
         // }
   
}

//Colors the board dark to highlight play moves and changes the color of score boards
function darkboard() {

      console.log("helo in the dark")
      ticBoard.dark();
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
            if(wholeGame.current().getCurrentRound().board[i][f] == wholeGame.current().playerone.chip){
               y += 1;
            }
            if(wholeGame.current().getCurrentRound().board[i][f] == wholeGame.current().playertwo.chip){
               z += 1;
            }
            if(wholeGame.current().getCurrentRound().board[f][i] == wholeGame.current().playerone.chip){
               c += 1;
            }
            if(wholeGame.current().getCurrentRound().board[f][i] == wholeGame.current().playertwo.chip){
               p += 1;
            }
            if(wholeGame.current().getCurrentRound().board[f][f] == wholeGame.current().playertwo.chip){
               t += 1;
            }
            if(wholeGame.current().getCurrentRound().board[f][f] == wholeGame.current().playerone.chip){
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

      if(wholeGame.current().getCurrentRound().board[0][2] == wholeGame.current().playerone.chip && wholeGame.current().getCurrentRound().board[1][1] == wholeGame.current().playerone.chip && wholeGame.current().getCurrentRound().board[2][0] == wholeGame.current().playerone.chip ) {
         return wins(1);
      }
      
      else if(wholeGame.current().getCurrentRound().board[0][2] == wholeGame.current().playertwo.chip && wholeGame.current().getCurrentRound().board[1][1] == wholeGame.current().playertwo.chip && wholeGame.current().getCurrentRound().board[2][0] == wholeGame.current().playertwo.chip ) {
         return wins(2);
      }
      
      return false;
}

// Adds a point to the player who won and checks for a gamewin and adjusts a variable. 
function wins(winnum) {
      if (winnum == 1) {

         wholeGame.current().playerone.wins += 1;
         wholeGame.current().getCurrentRound().winner = wholeGame.current().playerone.name;
         console.log("X wins: " + wholeGame.current().playerone.wins );
         // winFlash("home_score");
         document.getElementById('homewin').style.display = "block";
         if(wholeGame.current().playerone.wins == bestof - Math.floor(bestof/2))
         {
            gamewin = true;
         }
      }
      else {

         wholeGame.current().playertwo.wins += 1;
         wholeGame.current().getCurrentRound().winner = wholeGame.current().playertwo.name;
         console.log("O wins: " + wholeGame.current().playertwo.wins );
         // winFlash("away_score");
         document.getElementById('awaywin').style.display = "block";
          if(wholeGame.current().playertwo.wins == bestof - Math.floor(bestof/2))
         {
            gamewin = true;
         }
      }
      wholeGame.current().first = !wholeGame.current().first;
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
      wholeGame.current().first = !wholeGame.current().first;
      ticBoard.open = true;

}

function whole() 
{
      
      if(wholeGame.start == false) {

        	ticBoard.center.onclick = function() {
            console.log("in the else"); 
         	if(ticBoard.open==false && wholeGame.start == false){
         	  ticBoard.openUp();
              whole();
         	}
         	else if (ticBoard.open==true && wholeGame.start == false) {
         	  ticBoard.closeIt();
              whole();
         	}   	 
         }
         document.getElementById("pop").onclick = function() {
            ticBoard.closeIt();
            whole();
         }
         document.getElementById("startb").onclick = function() {
         	ticBoard.closeIt();
            wholeGame.newGame();
            startGame();
            whole();
         }
         document.getElementById("headr").onclick = function() {
            if(wholeGame.start == true){


               quit();

          //   console.log("you clicked quit");
         	// reset();
          //   center.className = "centerclosed";
          //   document.getElementById("headr").className = "";

            whole();
         }
         else {
            whole();
         }
         }
         document.getElementById("minstart").onclick = function() {
            startGame();
            ticBoard.closeIt();
            lightboard();
            whole();
            
         }
         document.getElementById("minWin").onclick = function() {

            startGame();
            document.getElementById("minWin").className = "";
            playertwo.wins = 0;
            playerone.wins = 0;
            wholeGame.current().gamenum = 0;
            wholeGame.current().first = !wholeGame.current().first;
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
                     if(wholeGame.current().getCurrentRound().counter <=9 && win == false && wholeGame.start == true) 
                     {

                        if(this.getElementsByTagName("p")[0].innerHTML == "&nbsp;") 
                        {
                           now = this.getElementsByTagName("p")[0].id;
                           this.getElementsByTagName("p")[0].innerHTML = checkTurn();
                           vboard[now-1] = checkTurn();
                           convert_table();
                           win = checkWin();
                           wholeGame.current().getCurrentRound().counter+=1;
                           update();
                        }
                     }
                     if(wholeGame.current().getCurrentRound().counter == 9 && win == false )
                     {
                        wholeGame.current().getCurrentRound().cats = true;
                     }
                     if(win == true || wholeGame.current().getCurrentRound().counter == 9)
                     {
                        if(wholeGame.current().gamenum != bestof){
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
                           wholeGame.current().tie = true;
                           winButtonClick();
                        }

                     }
               }
               
         }

         if(gamewin == true)
         {
            if(!wholeGame.current().tie){ 
               gamewinner();
            }
            winButtonClick();
         }
         if(win == true || wholeGame.current().getCurrentRound().counter == 9)
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


