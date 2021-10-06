const grid = document.querySelector(".grid");
const instruction = document.querySelector(".info");
const restartBtn = document.querySelector(".restart-btn");

let gameBoardArray = ['','','','','','','','',''];
let sign = "";
let playerFlag = true;
let won = false;

// DISPLAY CONTROLLER
const displayController = (()=>{
    const displayMark  = (id,mark)=>{
        if(gameBoardArray[id] == "X" || gameBoardArray[id]== "O") return;
        const gridItem = document.getElementById(id);
        gridItem.innerText = mark;
    }
    return {displayMark}

})();

// GAME CONTROLLER
const gameController = (()=>{
    let winnningCombinantions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8]
    ];
    const checkWinner = (sign)=>{
        let count = 0;
        winnningCombinantions.filter((item)=>{
            item.forEach((number)=>{
                if(gameBoardArray[number] == sign){
                    count++
                }
            })
            if(count == 3){
                grid.removeEventListener("click",play);
                sign == "X" ?  instruction.innerText = "play 1 won" : instruction.innerText = "player 2 won";
                return true;
            }
            count = 0; 
        })
    }

    const addInArray = (gridId,sign)=>{
        gameBoardArray.splice(gridId,1,sign);
    }

    const checkDraw = ()=>{
        return gameBoardArray.includes("");
    };

    const changeInstruction = (sign)=>{
        sign == "X"? instruction.innerText = "Player two's turn":instruction.innerText = "Player one's turn";
    }

    return{
        checkWinner,
        addInArray,
        checkDraw,
        changeInstruction
    }

})();

const identifySign = (flagValue)=>{
    if(flagValue){
        playerFlag = false;
        sign = "X";
    }else{
        playerFlag = true;
        sign = "O";
    }
    return sign;
};


function play(e){
    if(e.target.innerText == "X" || e.target.innerText == "O") return;
    let sign = identifySign(playerFlag);
    displayController.displayMark(e.target.id,sign);
    gameController.addInArray(e.target.id,sign);
    gameController.changeInstruction(sign);
    if(!gameController.checkDraw()){
        instruction.innerText = "Draw";
    }
    gameController.checkWinner(sign);
}

function reset(){
    for(let i = 0; i < gameBoardArray.length; i++ ){
        gameBoardArray[i] = "";
    }
    for(let x = 0; x < 9; x++){
        displayController.displayMark(x,"");
    }
}

grid.addEventListener("click",play);
restartBtn.addEventListener("click",reset);


// PLAYERS FACTORY FUNCTION
const Players = (sign)=>{
    this.sign = sign;

    const getSign = ()=>{
        return sign;
    }
    return {getSign}
}