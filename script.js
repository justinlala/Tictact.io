var x = 1;
var start = 0;
function startGame() {
	document.getElementById("sidel").style.display = 'block';
	document.getElementById("sider").style.display = 'block';

}
function open() {
	 document.getElementById("center").style.height="200px";
   	 document.getElementById("center").style.width="400px";
   	 document.getElementById("midtop").style.width="400px";
   	 document.getElementById("botmid").style.width="400px";
   	 document.getElementById("centl").style.height="200px";
   	 document.getElementById("centr").style.height="200px";
   	 document.getElementsByClassName("main")[0].style.height="432px";
   	 document.getElementsByClassName("main")[0].style.width="608px";

   	 document.getElementsByClassName("pop")[0].style.opacity="1";
   	 document.getElementsByClassName("pop")[0].style.transition="2s";
   	 document.getElementsByClassName("pop")[0].style.display="block";
   	 x=0;
}
function close() {
	 document.getElementById("center").style.height="77px";
   	 document.getElementById("center").style.width="100px";
   	 document.getElementById("midtop").style.width="100px";
   	 document.getElementById("botmid").style.width="100px";
   	 document.getElementById("centl").style.height="77px";
   	 document.getElementById("centr").style.height="77px";
   	 document.getElementsByClassName("main")[0].style.height="310px";
   	 document.getElementsByClassName("main")[0].style.width="308px";

   	 document.getElementsByClassName("pop")[0].style.opacity="0";
   	 document.getElementsByClassName("pop")[0].style.transition="2s";
   	 document.getElementsByClassName("pop")[0].style.display="none";
   	 x=1;
 
}
$( document ).ready(function() {
    console.log( "ready!" );
    
   $( "#center").click(function() {

   	if(x==1 && start == 0){
   	 open();
   	}
   	else if (x==0 && start == 0){
   	 close();
   	}   	 
   	 });
   $( "button").click(function() {
   	 close();
   	 start = 1;
   	 startGame();
   	 });
   $( ".pop").click(function() {
   	if(x==1 && start == 0){
   	 close();
 	}
   	 
   	 });
});

