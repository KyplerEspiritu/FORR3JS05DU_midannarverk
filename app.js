"use strict";


var game = document.getElementById("game");   
var canvas = document.getElementById("canvas");

var div_message = document.createElement("div");
div_message.setAttribute("class", "message");
var game_over_message = document.createTextNode("GAME OVER");
div_message.appendChild(game_over_message);

var div_restart = document.createElement("span");
var restart_message = document.createTextNode("restart");
div_restart.setAttribute("class", "restartDiv");
div_restart.setAttribute("onClick", "window.location.reload()");
div_restart.appendChild(restart_message);

var context = canvas.getContext("2d");
var canvasWidth = context.canvas.width;
var canvasHeight = context.canvas.height;

var playerXpostion = 240;
var playerYpostion = 820;

window.addEventListener("mousemove", function(e){
	var mouseX = e.clientX - context.canvas.offsetLeft;
	if (mouseX <= canvasWidth - 10 && mouseX >= 10){ // Ef hringurinn er ekki kominn alveg til hægri eða vinstri
		playerXpostion = mouseX; // Hringurinn 'eltir' músina
	}

}); // EventListener 'hlustar' á eða fylgist með hreyfingu músins

var score = 0;
var obstacleHeight = 10;
var obstacles = []; 

var obstacleSpace = -50;
for (var i = 0; i < 100; i++){ 
	var obstacleWidthLeft = getRandomInt(60, canvasWidth - 250); 
	var obstacleWidthSpace = obstacleWidthLeft + 75;
	var leftObstacle = new create_obstacle(0, obstacleSpace, obstacleWidthLeft, obstacleHeight); // Nýtt obstacle
	var rightObstacle = new create_obstacle(obstacleWidthSpace, obstacleSpace, canvasWidth, obstacleHeight); // Nýtt obstacle
	obstacleSpace -= 250; // Hvert nýtt obstacle verður 250px fyrir ofan fyrri obstacle
	obstacles.push(leftObstacle); // Nýtt obstacle settur í Array
	obstacles.push(rightObstacle); 
}


function create_obstacle(x_postion, y_position, width, height){ // Fall sem býr til obstacle
	this.x_postion = x_postion,
	this.y_position = y_position,
	this.width = width,
	this.height = height;
}
 
function getRandomInt(min, max) { // Fall sem tekur inn lægstu oh hæstu tölu og finnur heila tölu á milli þeirra eða hæsta eða lægsta talan sjálf
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render_obstacles(){
	for (var i = 0; i < obstacles.length; i++){
		if (playerXpostion + 15 >= obstacles[i].x_postion && playerXpostion <= obstacles[i].x_postion + obstacles[i].width && playerYpostion >= obstacles[i].y_position && playerYpostion <= obstacles[i].y_position + obstacles[i].height){
			game.appendChild(div_message);
			game.appendChild(div_restart);
			canvas.setAttribute("class", "game");
			clearInterval(animationInterval);
		}

		if (playerXpostion <= obstacles[i].x_postion){
			score++;
		}

		context.fillStyle = "#035c70"; // Litur fyrir context
		context.fillRect(obstacles[i].x_postion, obstacles[i].y_position += 3.5, obstacles[i].width, obstacles[i].height); // Obstacles að færast
		context.fillStyle = "#989e00"; // Nýr litur
		context.beginPath();
		context.fillRect(playerXpostion, playerYpostion, 15, 15); // Hringurinn að færast
		context.stroke();
		context.fillStyle = "#ffffff";
		context.font = "50px Arial";
		context.fillText("Score: " + score, 20, 50);
	}
}

function animation(){ // Fall fyrir hreyfingar
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	render_obstacles();
}
var animationInterval = setInterval(animation, 10);

