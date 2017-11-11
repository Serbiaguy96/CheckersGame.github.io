
var gameBoard = [
	[0,2,0,2,0,2,0,2],
	[2,0,2,0,2,0,2,0],
	[0,2,0,2,0,2,0,2],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,1,0]
];


var playerTurn = 1;


function createButton(type, i, j) {
	var btn = document.createElement("BUTTON");

	if(type == 1){
		btn.className = "white_button";
	}else{
		btn.className = "red_button";
	}

	btn.addEventListener("click", handleButtonClick, 'false');
	btn.id = ((8 * i) + j).toString(); 

	return btn;
}


//TODO - main handle button click function
function handleButtonClick(e){
	deselectAll();
	markAsSelected(e);
}

function markAsSelected(e) {
	if(e.target.className === 'white_button'){
		e.target.className = 'active_white';
	}else if(e.target.className === 'red_button'){
		e.target.className = 'active_red';
	}
}

function setClicable() {
	var table = window.document.getElementById("game_board_table");

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var btn = document.getElementById((8*i) + j);
			
			if(btn != null){
				if(gameBoard[i][j] % 2 != playerTurn ){
					btn.removeEventListener("click", handleButtonClick, 'false');
				}
		  	}
		}
	}
}

function deselectAll() {

	var table = window.document.getElementById("game_board_table");

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var btn = document.getElementById((8*i) + j);
			
			if(btn != null){
				if(btn.className == 'active_white'){
					btn.className = 'white_button';
				}else if(btn.className == 'active_red'){
					btn.className = 'red_button';
				}
		  }
		}
	}
}

function setGameBoard() {
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if(gameBoard[i][j] != 0) {
				window.document.getElementById("game_board_table")
				.rows[i].cells[j]
				.appendChild(createButton(gameBoard[i][j], i, j));  
			}
		}
	}
}

function startGame() {
	setGameBoard();
	setClicable();
}

window.onload = startGame();

