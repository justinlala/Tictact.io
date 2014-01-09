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

function startGame() {
	document.getElementById("sidel").style.display = 'block';
	document.getElementById("sider").style.display = 'block';
   document.getElementById("sidel").style.opacity = '1';
   document.getElementById("sider").style.opacity = '1';
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
function convert_table(){
   board[0][0] = vboard[0];
   console.log("board: " + board[0][0]);
   board[0][1] = vboard[1];
   board[0][2] = vboard[2];
   board[1][0] = vboard[3];
   board[1][1] = vboard[4];
   board[1][2] = vboard[5];
   board[2][0] = vboard[6];
   board[2][1] = vboard[7];
   board[2][2] = vboard[8];
   dis_board();

}
function update() {
   document.getElementById("home_score").innerHTML = "0" + player_1[3];
   document.getElementById("away_score").innerHTML = "0" + player_2[3];
}
function reset() {
	start = false;
	document.getElementById("sidel").style.display = 'none';
	document.getElementById("sider").style.display = 'none';
   document.getElementById("sidel").style.opacity = '0';
   document.getElementById("sider").style.opacity = '0';
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

   	 x=0;
}
function close() {
	 document.getElementById("center").style.height="77px";
   	 document.getElementById("center").style.width="100px";
   	 document.getElementById("center").style.backgroundColor="white";

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
            document.getElementsByClassName("cell")[i].style.backgroundColor = "#aaa";
         
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
         
      }
      // document.getElementsByTagName('body')[0].style.backgroundColor = "white";
      document.getElementById("home_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
      document.getElementById("away_score").parentNode.getElementsByTagName('h3')[0].style.color = "#aaa";
      document.getElementById("home_score").style.color = "#aaa";
      document.getElementById("away_score").style.color = "#aaa";

}
function checkWin() {

   for(i = 0; i < 3; i++ ){
      var y = 0; z = 0; c = 0; p = 0; t =0; q = 0;
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
   // var y = 0; x = 0; c = 0; p = 0;
   // for(i = 0; i < 3; i++ ){
      
   //    for(f = 2; f >= 0; f--){
   //       if(board[i][f] == player_1[0]){
   //          y += 1;
   //       }
   //       if(board[f][i] == player_1[0]){
   //          c += 1;
   //       }
   //       if(board[i][f] == player_2[0]){
   //          x += 1;
   //       }
   //       if(board[f][i] == player_2[0]){
   //          p += 1;
   //       }
   //    }
   //    if(y == 3 || c == 3) {
   //       return wins(1);
   //    }
   //    if(x == 3 || p == 3) {
   //       return wins(2);
   //    }
   // }



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
      winFlash("home_score")
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
      winFlash("away_score")
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

       x=0;

}
window.onclick = function() 
{
    
   if(start == false) {
     	document.getElementById("center").onclick = function() {

      	if(x==1 && start == false){
      	  open();
      	}
      	else if (x==0 && start == false){
      	  close();
      	}   	 
      }
      document.getElementById("startb").onclick = function() {
      	close();
      	startGame();
      }
      document.getElementById("pop").onclick = function() {
      	close();
      }
      document.getElementById("headr").onclick = function() {
      	reset();
      }
   }
   else 
   {
      for(i=0;i<=8;i++)
      {
            document.getElementsByClassName("cell")[i].onclick = function() 
            {

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
         }
         document.getElementById("awaywin").onclick = function() {
            cleanBoard();
            lightboard();
         }
         document.getElementById("homewin").onclick = function() {
            cleanBoard();
            lightboard();
         }
         document.getElementById("awaywin").onclick = function() {
            cleanBoard();
            lightboard();
         }
         for(i=0;i<=8;i++)
         {
               document.getElementsByClassName("cell")[i].onclick = function() 
               {
                  cleanBoard();
                  lightboard();

               }
         }
      }

   }  
   
}


