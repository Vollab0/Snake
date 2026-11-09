// Name:
// Date: 
// Version:
// Project: 

let emptyboard = [
	["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
	["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"]
];

let board;

let snake;

let direction;
let timer;
let apple;

function init(){
	direction = "right";
	board = emptyboard.map(row => row.slice());
	snake = [[5,10],[6,10],[7,10]];
}

function CreateApple(){

	let xRandomPos = Math.floor(Math.random()*20);
	let yRandomPos = Math.floor(Math.random()*20);

	while(board[yRandomPos][xRandomPos] != "."){
		xRandomPos = Math.floor(Math.random()*20);
		yRandomPos = Math.floor(Math.random()*20);
	}

	apple = [xRandomPos, yRandomPos];
}

function DrawBoard()
{
	ClearGrid();

	for (let i = 1; i < snake.length-1; i++) {
		let xPosOfSnake = snake[i][0];
		let yPosOfSnake = snake[i][1];
		board[yPosOfSnake][xPosOfSnake] = "S";
	}
	board[snake[0][1]][snake[0][0]] = "T";
	board[snake[snake.length-1][1]][snake[snake.length-1][0]] = "H";


	let xPosApple = apple[0];
	let yPosApple = apple[1];
	board[yPosApple][xPosApple] = "A";

	for (let y = 0; y < board.length; y++) {
		for (let x = 0; x < board[y].length; x++) {
			let isLightgreen1 = (x + y) % 2 == 0;
			if(board[y][x] == "W") AddBlock(x,y, "darkgreen");
			else if(board[y][x] == ".") {
                // alternate between lightgreen1 and lightgreen2
                let color = isLightgreen1 ? "lightgreen1" : "lightgreen2";
                AddBlock(x, y, color);
            }
			else if(board[y][x] == "S") AddBlock(x,y, "blue");
			else if(board[y][x] == "A") {
                let color = isLightgreen1 ? "appleLightgreen1" : "appleLightgreen2";
                AddBlock(x, y, color);
            }else if(board[y][x] == "H") {
                let color = isLightgreen1 ? "snakeHeadLightgreen1" : "snakeHeadLightgreen2";
                AddBlock(x, y, color);

				let head = document.getElementById("gx" + x + "y" + y);

				if(direction == "left") head.style.transform = "rotate(180deg)";
				if(direction == "up") head.style.transform = "rotate(-90deg)";
				if(direction == "down") head.style.transform = "rotate(90deg)";	
            }else if(board[y][x] == "T") {
                let color = isLightgreen1 ? "snakeTailLightgreen1" : "snakeTailLightgreen2";
                AddBlock(x, y, color);

				let head = document.getElementById("gx" + x + "y" + y);

				if(snake[1][0]>snake[0][0]) head.style.transform = "rotate(180deg)";
				if(snake[1][1]>snake[0][1]) head.style.transform = "rotate(-90deg)";
				if(snake[1][1]<snake[0][1]) head.style.transform = "rotate(90deg)";	
            }
		}
	}
	
}

function StartGame(){
	init();
	CreateApple();
	DrawBoard();
	timer = setInterval(Tick, 200);
	document.addEventListener("keydown", KeyPressed);

	let grid = document.getElementById("grid_id");
	grid.style.filter = "brightness(100%)";
	let btnGroup = document.getElementById("buttonGroup");
	btnGroup.style.display = "none";
}

function KeyPressed(event){
	if (event.keyCode == 38 && direction != "down") direction = "up";
	if (event.keyCode == 40 && direction != "up") direction = "down";
	if (event.keyCode == 37 && direction != "right") direction = "left";
	if (event.keyCode == 39 && direction != "left") direction = "right";
}

function MoveSnake()
{
	let isGrowing = false;

	let xPosHeadNext = snake[snake.length - 1][0];
	let yPosHeadNext = snake[snake.length - 1][1];

	let xPosSnakeHead = snake[snake.length - 1][0];
	let yPosSnakeHead = snake[snake.length - 1][1];

	if (direction == "right") xPosHeadNext++;
	if (direction == "left") xPosHeadNext--;	
	if (direction == "up") yPosHeadNext--;
	if (direction == "down") yPosHeadNext++;

	if (board[yPosHeadNext][xPosHeadNext] == "W" || board[yPosHeadNext][xPosHeadNext] == "S") {
		GameOver();
		//alert("Game Over!");
		return null;
	}

	if (board[yPosHeadNext][xPosHeadNext] == "A") {
		isGrowing = true;

		let appleXPos = apple[0];
		let appleYPos = apple[1];
		board[appleYPos][appleXPos] = ".";
		CreateApple();
	}

	if(direction == "right"){
		snake.push([xPosSnakeHead+1, yPosSnakeHead]);
	}else if(direction == "left"){
		snake.push([xPosSnakeHead-1, yPosSnakeHead]);
	}else if(direction == "up"){
		snake.push([xPosSnakeHead, yPosSnakeHead-1]);
	}else if(direction == "down"){
		snake.push([xPosSnakeHead, yPosSnakeHead+1]);
	}

	if(!isGrowing){
		removeSegment = snake.shift();
		board[removeSegment[1]][removeSegment[0]] = ".";
	}

	
	DrawBoard();
}

function GameOver()
{
	clearInterval(timer);
	let grid = document.getElementById("grid_id");
	grid.style.filter = "brightness(50%)";
	let btnGroup = document.getElementById("buttonGroup");
	btnGroup.style.display = "block";
}

function Tick()
{
	MoveSnake();
}


