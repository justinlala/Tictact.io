var player_1 = ["X", "Home", true, 0];
var player_2 = ["O", "Away", false, 0];
var x = 1;
var start = false;
var counter = 1;
var win = false;
var winner = "";
var vboard = ["","","","","","","","",""];
var board = [["","",""],["","",""],["","",""]];
var bestof = 3;
var gamewin = false;
var sideLeft = document.getElementById("sidel");
var sideRight = document.getElementById("sider");
var winBox = document.getElementById("winnerbox");


// This function starts the game. meaning it goes into game mode and out of intro mode. 
function startGame() {
	sideLeft.style.display = 'block';
	sideRight.style.display = 'block';
   sideLeft.style.opacity = '1';
   sideRight.style.opacity = '1';
   cleanBoard();
	start = true;
}
function checkTurn() {
   if(counter % 2 == 0) {
      return player_2[0];
   }
   else {
      return player_1[0];
   }
}
function winFlash(winclass) {
      document.getElementById(winclass).parentNode.getElementsByTagName('h3')[0].style.color = "black";
      console.log("winner " + winclass);
     
}

function dis_board() {
   console.log(" 00:" + board[0][0] + " 01:" + board[0][1] + " 02:" + board[0][2]);
   console.log(" 10:" + board[1][0] + " 11:" + board[1][1] + " 12:" + board[1][2]);
   console.log(" 20:" + board[2][0] + " 21:" + board[2][1] + " 22:" + board[2][2]);
}
function convert_table() {

   for(var i in vboard){
      board[Math.floor(i/3)][i%3] = vboard[i];
   }
   dis_board();

}
function update() {
   document.getElementById("home_score").innerHTML = "0" + player_1[3];
   document.getElementById("away_score").innerHTML = "0" + player_2[3];
   whole();
}
function reset() {
	start = false;
	sideLeft.style.display = 'none';
	sideRight.style.display = 'none';
   sideLeft.style.opacity = '0';
   sideRight.style.opacity = '0';
   winBox.className = "";
   player_2[3] = 0;
   player_1[3] = 0;
	close();
   cleanBoard();
   lightboard();
   update();
}
function cleanBoard(){
   counter = 1;
   vboard = ["","","","","","","","",""];
   board = [["","",""],["","",""],["","",""]];
   win = false;
   document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
   document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
   document.getElementById('homewin').style.display = "none";
   document.getElementById('awaywin').style.display = "none";
   document.getElementById('playagain').style.display = "none";
   document.getElementById('graybox').style.display = "none";
    for(i=0;i<9;i++)
    {
      document.getElementsByClassName("cell")[i].getElementsByTagName("p")[0].innerHTML = "&nbsp;";
   }
   
}
function open() {

      if(document.documentElement.clientWidth > 624){
	  document.getElementById("center").style.height="200px";
   	 document.getElementById("center").style.width="400px";
   	 document.getElementById("center").style.backgroundColor="orange";

   	 document.getElementById("midtop").style.width="400px";
   	 document.getElementById("botmid").style.width="400px";
   	 document.getElementById("centl").style.height="200px";
   	 document.getElementById("centr").style.height="200px";
   	 document.getElementsByClassName("main")[0].style.height="499px";
   	 document.getElementsByClassName("main")[0].style.width="608px";

   	 document.getElementById("pop").className = "open2";
      }
      else {
          document.getElementById("center").style.backgroundColor="orange";
          document.getElementById("minstart").className = "open2";
      }

   	 x=0;
}
function close() {
	 
      var center = document.getElementById("center");
      center.style.height="77px";
   	center.style.width="100px";
   	center.style.backgroundColor="white";

   	 document.getElementById("midtop").style.width="100px";
   	 document.getElementById("botmid").style.width="100px";
   	 document.getElementById("centl").style.height="77px";
   	 document.getElementById("centr").style.height="77px";
   	 document.getElementsByClassName("main")[0].style.height="375px";
   	 document.getElementsByClassName("main")[0].style.width="308px";

   	 // document.getElementById("pop").style.opacity="0";
   	 // document.getElementById("pop").style.display="none";
     //   document.getElementById("pop").style.zIndex="-1";
     document.getElementById("pop").className = "";
   	 x=1;
 
}
function darkboard() {
   console.log("hi");
   for(i=0;i<=8;i++)
      {
            document.getElementsByClassName("cell")[i].style.backgroundColor = "#ccc";
         
      }
      // document.getElementsByTagName('body')[0].style.backgroundColor = "#aaa";
      document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "white";
      document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "white";
      document.getElementById("home_score").style.color = "white";
      document.getElementById("away_score").style.color = "white";


}
function lightboard() {
   console.log("hi");
   for(i=0;i<=8;i++)
      {
            document.getElementsByClassName("cell")[i].style.backgroundColor = "white";
            document.getElementsByClassName("cell")[i].className = "cell";
         
      }
      // document.getElementsByTagName('body')[0].style.backgroundColor = "white";
      document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
      document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
      document.getElementById("home_score").style.color = "#aaa";
      document.getElementById("away_score").style.color = "#aaa";

}
function checkWin() {

   for(i = 0; i < 3; i++ ){
      var y = 0; z = 0; c = 0; p = 0; t = 0; q = 0;
      for(f = 0; f < 3; f++){
         if(board[i][f] == player_1[0]){
            y += 1;
         }
         if(board[i][f] == player_2[0]){
            z += 1;
         }
         if(board[f][i] == player_1[0]){
            c += 1;
         }
         if(board[f][i] == player_2[0]){
            p += 1;
         }
         if(board[f][f] == player_2[0]){
            t += 1;
         }
         if(board[f][f] == player_1[0]){
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

   if(board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X" ) {
      return wins(1);
   }
   
   else if(board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O" ) {
      return wins(2);
   }
   
   return false;

}
function wins(winnum) {
   if (winnum == 1) {
      player_1[3] += 1;
      winner = player_1[1];
      console.log("X wins: " + player_1[3] );
      // winFlash("home_score");
      document.getElementById('homewin').style.display = "block";
      if(player_1[3] == bestof)
      {
         gamewin = true;
      }

   }
   else {
      player_2[3] += 1;
      winner = player_2[1];
      console.log("O wins: " + player_2[3] );
      // winFlash("away_score");
      document.getElementById('awaywin').style.display = "block";
       if(player_2[3] == bestof)
      {
         gamewin = true;
      }
   }
   return true;
}
function gamewinner() {
      gamewin = false;

      if(document.documentElement.clientWidth > 624){
      document.getElementById("center").style.height="200px";
       document.getElementById("center").style.width="400px";
       document.getElementById("center").style.backgroundColor="orange";

       document.getElementById("midtop").style.width="400px";
       document.getElementById("botmid").style.width="400px";
       document.getElementById("centl").style.height="200px";
       document.getElementById("centr").style.height="200px";
       document.getElementsByClassName("main")[0].style.height="499px";
       document.getElementsByClassName("main")[0].style.width="608px";
       cleanBoard();
       lightboard();
       
       document.getElementById("winnerbox").className = "open2";
      }
      else {
         cleanBoard();
         lightboard();
         document.getElementById("minWin").className = "open2";
      }
       x=0;

}
function whole() 
{

   console.log("in the else"); 
   if(start == false) {

     	document.getElementById("center").onclick = function() {

      	if(x==1 && start == false){
      	  open();
           whole();
      	}
      	else if (x==0 && start == false){
      	  close();
           whole();
      	}   	 
      }
      document.getElementById("startb").onclick = function() {
      	close();
      	startGame();
         whole();
      }
      document.getElementById("pop").onclick = function() {
      	close();
         whole();
      }
      document.getElementById("headr").onclick = function() {
      	reset();
         document.getElementById("headr").className = "";
      }
      document.getElementById("minstart").onclick = function() {
         startGame();
         document.getElementById("minstart").className = "";
         lightboard();
         whole();
         
      }
      document.getElementById("minWin").onclick = function() {
         startGame();
         document.getElementById("minWin").className = "";
         lightboard();
         whole();
         
      }
   }

   else 
   {  
      document.getElementById("headr").className = "shine";
      console.log("in the else");
      for(i=0;i<=8;i++)
      {  
            document.getElementsByClassName("cell")[i].onclick = function() 
            {
                  console.log("in the for");
                  if(counter <=9 && win == false) 
                  {

                     if(this.getElementsByTagName("p")[0].innerHTML == "&nbsp;") 
                     {
                        now = this.getElementsByTagName("p")[0].id;
                        this.getElementsByTagName("p")[0].innerHTML = checkTurn();
                        vboard[now-1] = checkTurn();
                        convert_table();
                        win = checkWin();
                        counter+=1;
                        update();
                     }
                  }
                  if(win == true || counter == 10)
                  {
                     document.getElementById('playagain').style.display = "block";
                     document.getElementById('graybox').style.display = "block";
                     darkboard();
                     update();

                  }
            }
            
       }
      if(gamewin == true)
      {
         gamewinner();
         document.getElementById("winb").onclick = function() 
         {  
            console.log("im here");
            document.getElementById("winnerbox").className = "";
            console.log("now here");
            reset();
            startGame();
         }
      }
      if(win == true || counter == 10)
      {
         document.getElementById("playagain").onclick = function() {
            cleanBoard();
            lightboard();
            update();
         }
         document.getElementById("awaywin").onclick = function() {
            cleanBoard();
            lightboard();
            update();
         }
         document.getElementById("homewin").onclick = function() {
            cleanBoard();
            lightboard();
            update();
         }
         document.getElementById("awaywin").onclick = function() {
            cleanBoard();
            lightboard();
            update();
         }
         for(i=0;i<=8;i++)
         {
               document.getElementsByClassName("cell")[i].onclick = function() 
               {
                  cleanBoard();
                  lightboard();
                  update();

               }
         }
      }

   }  
    
}


