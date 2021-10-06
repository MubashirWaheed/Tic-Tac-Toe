const cells = document.querySelectorAll(".cell");
const userInstruction = document.getElementsByClassName("instruction");
const grid = document.querySelector(".grid");

let flag = true;
let count = 0;
let gameBoard = ["","","","","","","","",""];
let testArray = [];

// Adding EventListner on each cell
for(let i = 0; i < cells.length; i++){
    cells[i].addEventListener("click",(e)=>{
    let cellId = e.currentTarget.id;

    gameController.populateArray(cellId);
    displayController.displayMark(cellId);
    testArray = gameController.winner();
    console.log(testArray[0]);
    remove(testArray);
    },{once: true})
}

// Adding eventlistner to buttons using event delegation
grid.addEventListener("click",(e)=>{
    console.log(e.target);
})


// IIFE used because Factory function needs instanciating 
const  displayController = (()=>{
    const displayMark = (id)=>{
        if(flag){
            cells[id].innerText = "X";
            flag = false;
        }else{
            cells[id].innerText = "O";
            flag = true;
        }
    }
    return {displayMark}
})();

const gameController = (()=>{
    let winnningCombinantions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ] 
    const populateArray = (cellid)=>{
        flag ? gameBoard[cellid] = "X" : gameBoard[cellid] = "O";
    }   

    const getWinnerArray = ()=>{
        return winnningCombinantions.filter(item=>{
            if(gameBoard[item[0]] === "X" && gameBoard[item[1]] === "X" && gameBoard[item[2]] === "X"){
                return "X";
            }
            if(gameBoard[item[0]] === "O" && gameBoard[item[1]] === "O" && gameBoard[item[2]] === "O"){
                return "0";
            }    
        })
    }
    const winner = ()=>{
        let array = getWinnerArray();
        if(array.length ==1){
            return array[0];
        }else{
            return [];
        }

    }
    return {
        populateArray,
        winner
    }
})();

const remove = (arr)=>{
    if (arr == []){
        return
    }else{ 
        for(let i =0; i< cells.length; i++){
            // Throwing error: TypeError: cells[i].removeEventListner is not a function
            cells[i].removeEventListener("click", externalfunction)
        }
    }
}

function externalfunction(){
    console.log("removed");
}