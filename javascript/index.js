
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
var selectedStoneY = -1;
var selectedStoneX = -1;




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


function createPossibleButton(i, j) {
	var btn = document.createElement('BUTTON');
	btn.className = 'possible_button';
	btn.id = ((8 * i) + j).toString(); 
	btn.addEventListener('click', handlePossibleButtonClick, 'false');

	var table = window.document.getElementById('game_board_table');
	table.rows[i].cells[j].appendChild(btn);
}


//TODO - main handle button click function
function handleButtonClick(e){
	deselectAll();
	markAsSelected(e);
	setPosibleMoves();
}

function refreshBoard() {

	var btn;
	var table = document.getElementById("game_board_table");

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			btn = document.getElementById((8 * i) + j);

			if(gameBoard[i][j] == 0 && btn != null){
				table.rows[i].cells[j].removeChild(btn);
			}else if(gameBoard[i][j] != 0 && btn == null){
				createButton(gameBoard[i][j], i, j);
			}
		}
	}
}

function changeArrowPos() {
	var img = document.getElementById("arrow");

	playerTurn == 2 ? img.style.marginTop = "5%" : img.style.marginTop = "35%";
}

function eatStone(i, j) {
	var btnId = Number((8 * i) + j);
	var btn = document.getElementById(btnId);

	document.getElementById("game_board_table").rows[i].cells[j].removeChild(btn);
}

function TryToEatStone(i, j) {

	console.log("Selected stone at x: " + selectedStoneX + " y: " + selectedStoneY);
	console.log("Possible move to x: " + i + " y: " + j );

	if(playerTurn == 1) {
		if(i + 2 <= 7 && j - 2 >= 0 && j - 2 <= 7){
			if(i + 2 == selectedStoneX && j - 2 == selectedStoneY){
				console.log("Possible eat stone at x: " + (i + 1) + " y: " + (j - 1));
				eatStone(i + 1, j - 1);
				gameBoard[i + 1][j - 1] = 0;
				return 1;
			}else if(i + 2 == selectedStoneX && j + 2 == selectedStoneY){
				console.log("Possible eat stone at x: " + (i + 1) + " y: " + (j + 1));
				eatStone(i + 1, j + 1);
				gameBoard[i + 1][j + 1] = 0;
				return 1;
			}
		}
	}else{
		if(i - 2 >= 0  && j - 2 >= 0 && j - 2 <= 7){
			if(i - 2 == selectedStoneX && j - 2 == selectedStoneY){
				console.log("Possible eat stone at x: " + (i - 1) + " y: " + (j - 1));
				eatStone(i - 1, j - 1);
				gameBoard[i - 1][j - 1] = 0;
				return 1;
			}else if(i - 2 == selectedStoneX && j + 2 == selectedStoneY){
				console.log("Possible eat stone at x: " + (i - 1) + " y: " + (j + 1));
				eatStone(i - 1, j + 1);
				gameBoard[i - 1][j + 1] = 0;
				return 1;
			}
		}
	}

	return 0;
}

//in this function i have to prevent indexing at out of bounds of game board, just adding simple boolean operators and checkers
function canEatStone(x, y) {
	if(playerTurn === 1) {
		if(!isOutOfBounds(x - 1, y - 1) && !isOutOfBounds(x - 1, y + 1) && gameBoard[x - 1][y - 1] === 2 && gameBoard[x - 1][y + 1] === 2 ) {
			if(!isOutOfBounds(x - 2, y - 2) && !isOutOfBounds(x - 2, y + 2) && (gameBoard[x - 2][y - 2] === 0 || gameBoard[x - 2][y + 2] == 0)) {
				return 1;
			}else {
				return 0;
			}
		}else if(!isOutOfBounds(x - 1, y - 1) && !isOutOfBounds(x - 2, y - 2) && gameBoard[x - 1][y - 1] === 2 && gameBoard[x - 2][y - 2] === 0){
			return 1;
		}else if(!isOutOfBounds(x - 1, y + 1) && !isOutOfBounds(x - 2, y + 2) && gameBoard[x - 1][y + 1] === 2 && gameBoard[x - 2][y + 2] === 0){
			return 1;
		}else{
			return 0;
		}
	}else {
        if(!isOutOfBounds(x + 1, y - 1) && !isOutOfBounds(x + 1, y + 1) && gameBoard[x + 1][y - 1] === 1 && gameBoard[x + 1][y + 1] === 1 ) {
            if(!isOutOfBounds(x + 2, y - 2) && !isOutOfBounds(x + 2, y + 2) && (gameBoard[x + 2][y - 2] === 0 || gameBoard[x + 2][y + 2] == 0)) {
                return 1;
            }else {
                return 0;
            }
        }else if(!isOutOfBounds(x + 1, y - 1) && !isOutOfBounds(x + 2, y - 2) && gameBoard[x + 1][y - 1] === 1 && gameBoard[x + 2][y - 2] === 0){
            return 1;
        }else if(!isOutOfBounds(x + 1, y + 1) && !isOutOfBounds(x + 2, y + 2) && gameBoard[x + 1][y + 1] === 1 && gameBoard[x + 2][y + 2] === 0){
            return 1;
        }else{
            return 0;
        }
	}

	return 0;
}

function handlePossibleButtonClick(e){

	var btnId = Number(e.target.id);
	var posY = btnId % 8;
	var posX = (btnId - posY) / 8;

	playerTurn == 1 ? gameBoard[posX][posY] = 1 : gameBoard[posX][posY] = 2;
	e.target.className = playerTurn == 1 ? "white_button" : "red_button";
	e.target.removeEventListener('click', handlePossibleButtonClick, 'false');
	e.target.addEventListener('click', handleButtonClick, 'false');
	gameBoard[selectedStoneX][selectedStoneY] = 0;

	var stoneEated = TryToEatStone(posX, posY);

	if(stoneEated) {
	    if(canEatStone(posX, posY)) {
            setClicableOnlySecondJumpStone(posX, posY);
            refreshBoard();
        }else {
            playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;

            changeArrowPos();
            refreshBoard();
            setClicable(0);
        }
    }else {
        playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;

        changeArrowPos();
        refreshBoard();
        setClicable(0);
    }

}

function markAsSelected(e) {
	if(e.target.className === 'white_button'){
		e.target.className = 'active_white';
		var btnId = Number(e.target.id);
		selectedStoneY = btnId % 8;
		selectedStoneX = (btnId - selectedStoneY) / 8;
	}else if(e.target.className === 'red_button'){
		e.target.className = 'active_red';
		var btnId = Number(e.target.id);
		selectedStoneY = btnId % 8;
		selectedStoneX = (btnId - selectedStoneY) / 8;
	}
}

function setPosibleMoves() {
	if(playerTurn == 1){
		if(checkSides(selectedStoneX, selectedStoneY) == 0){
			if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 0 && gameBoard[selectedStoneX - 1][selectedStoneY -1] == 0){
				createPossibleButton(selectedStoneX - 1, selectedStoneY + 1);
				createPossibleButton(selectedStoneX - 1, selectedStoneY - 1);
			}else if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 1 || gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 1){
				if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 1 && gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 0 ){
					createPossibleButton(selectedStoneX - 1, selectedStoneY - 1);
				}else if(gameBoard[selectedStoneX - 1][selectedStoneY - 1 ] == 1 && gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 0){
					createPossibleButton(selectedStoneX - 1, selectedStoneY + 1);
				}else if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 1 && gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 2){
					if(gameBoard[selectedStoneX - 2][selectedStoneY - 2] == 0){
						createPossibleButton(selectedStoneX - 2, selectedStoneY - 2);
					}
				}else if(gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 1 && gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 2){
					if(gameBoard[selectedStoneX - 2][selectedStoneY + 2] == 0){
						createPossibleButton(selectedStoneX - 2, selectedStoneY + 2);
					}
				}
			}else if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 2 || gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 2){
				if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 2 ){
					if(gameBoard[selectedStoneX - 2][selectedStoneY + 2] == 0){
						createPossibleButton(selectedStoneX - 2, selectedStoneY + 2);
					}
					if(gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 0){
						createPossibleButton(selectedStoneX - 1, selectedStoneY - 1);
					}
				}
				if(gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 2){
					if(gameBoard[selectedStoneX - 2][selectedStoneY - 2] == 0){
						createPossibleButton(selectedStoneX - 2, selectedStoneY - 2);
					}
					if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 0){
						createPossibleButton(selectedStoneX - 1, selectedStoneY + 1);
					}
				}
			}
		}else if(checkSides(selectedStoneX, selectedStoneY) == 1) {
			if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 0) {
				createPossibleButton(selectedStoneX - 1, selectedStoneY + 1);
			}else if(gameBoard[selectedStoneX - 1][selectedStoneY + 1] == 2){
				if(gameBoard[selectedStoneX - 2][selectedStoneY + 2] == 0){
					createPossibleButton(selectedStoneX - 2, selectedStoneY + 2);
				}
			}
		}else if(checkSides(selectedStoneX, selectedStoneY) == 2) {
			if(gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 0) {
				createPossibleButton(selectedStoneX - 1, selectedStoneY - 1);
			}else if(gameBoard[selectedStoneX - 1][selectedStoneY - 1] == 2){
				if(gameBoard[selectedStoneX - 2][selectedStoneY - 2] == 0){
					createPossibleButton(selectedStoneX - 2, selectedStoneY - 2);
				}
			}
		}
	}else{
		if(checkSides(selectedStoneX, selectedStoneY) == 0){
			if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 0 && gameBoard[selectedStoneX + 1][selectedStoneY -1] == 0){
				createPossibleButton(selectedStoneX + 1, selectedStoneY + 1);
				createPossibleButton(selectedStoneX + 1, selectedStoneY - 1);
			}else if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 2 || gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 2){
				if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 2 && gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 0 ){
					createPossibleButton(selectedStoneX + 1, selectedStoneY -1);
				}else if(gameBoard[selectedStoneX + 1][selectedStoneY - 1 ] == 2 && gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 0){
					createPossibleButton(selectedStoneX + 1, selectedStoneY + 1);
				}else if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 2 && gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 1){
					if(gameBoard[selectedStoneX + 2][selectedStoneY - 2] == 0){
						createPossibleButton(selectedStoneX + 2, selectedStoneY - 2);
					}
				}else if(gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 2 && gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 1){
					if(gameBoard[selectedStoneX + 2][selectedStoneY + 2] == 0){
						createPossibleButton(selectedStoneX + 2, selectedStoneY + 2);
					}
				}
			}else if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 1 || gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 1){
				if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 1 ){
					if(gameBoard[selectedStoneX + 2][selectedStoneY + 2] == 0){
						createPossibleButton(selectedStoneX + 2, selectedStoneY + 2);
					}
					if(gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 0){
						createPossibleButton(selectedStoneX + 1, selectedStoneY - 1);
					}
				}
				if(gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 1 ){
					if(gameBoard[selectedStoneX + 2][selectedStoneY - 2] == 0){
						createPossibleButton(selectedStoneX + 2, selectedStoneY - 2);
					}
					if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 0){
						createPossibleButton(selectedStoneX + 1, selectedStoneY + 1);
					}
				}
			}
		}else if(checkSides(selectedStoneX, selectedStoneY) == 1) {
			if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 0) {
				createPossibleButton(selectedStoneX + 1, selectedStoneY + 1);
			}else if(gameBoard[selectedStoneX + 1][selectedStoneY + 1] == 1){
				if(gameBoard[selectedStoneX + 2][selectedStoneY + 2] == 0){
					createPossibleButton(selectedStoneX + 2, selectedStoneY + 2);
				}
			}
		}else if(checkSides(selectedStoneX, selectedStoneY) == 2) {
			if(gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 0) {
				createPossibleButton(selectedStoneX + 1, selectedStoneY - 1);
			}else if(gameBoard[selectedStoneX + 1][selectedStoneY - 1] == 1){
				if(gameBoard[selectedStoneX + 2][selectedStoneY - 2] == 0){
					createPossibleButton(selectedStoneX + 2, selectedStoneY - 2);
				}
			}
		}
	}
}

function checkSides(x,y){
	if(y == 0 ){
		return 1;
	}else if(y == 7){
		return 2;
	}else{
		return 0;
	}
}

function isPossibleJump(){
	if(selectedStoneX >= 1 && selectedStoneX <= 5){
		if(playerTurn == 1){
			if(selectedStoneY >= 2)
				return 1;
			else
				return 0;
		}else{
			if(selectedStoneY <= 5)
				return 1;
			else
				return 0;
		}
	}

}


function isOutOfBounds(x, y) {
	return (x < 0 && x > 7) || (y < 0 && y > 7 );
}


function setClicableOnlySecondJumpStone(x, y) {

    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            var btn = document.getElementById((8 * i) + j);

            if (btn != null){
                if (i != x && j != y && gameBoard[i][j] === playerTurn) {
                    btn.removeEventListener("click", handleButtonClick, 'false');
                }
            }
        }
    }
}

function setClicable(gameStart) {
	var table = window.document.getElementById("game_board_table");

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var btn = document.getElementById((8*i) + j);
			
			if(btn != null){
				if(gameStart){
					if(gameBoard[i][j] != playerTurn){
						btn.removeEventListener("click", handleButtonClick, 'false');
					}
				}else {
					if(gameBoard[i][j] != playerTurn){
						btn.removeEventListener("click", handleButtonClick, 'false');
					}else{
						btn.addEventListener("click", handleButtonClick, 'false');
					}
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
				}else if(btn.className == 'possible_button'){
					table.rows[i].cells[j].removeChild(btn);
				}				
			}
		}
	}
}

function setGameBoard() {
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if(gameBoard[i][j] != 0) {
				document.getElementById("game_board_table")
				.rows[i].cells[j]
				.appendChild(createButton(gameBoard[i][j], i, j));  
			}
		}
	}

	changeArrowPos();
}

function startGame() {
	setGameBoard();
	setClicable(1);
}

window.onload = startGame();

