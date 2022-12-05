'use strict'

var gBoard
var gBoardSize
var gNextNum
var gGameInterval
var gTimer

function onInit() {
    gTimer = document.querySelector('.timer')
    gBoardSize = 16
    gBoard = createBoard()
    renderBoard(gBoard)
    play()
}


function play() {
    // Restart timer text
    gTimer.innerText = '00.00'
    // Restart next number
    gNextNum = 1
    var elNextNum = document.querySelector('.next-number span')
    elNextNum.innerText = 1
    // Create new board
    gBoard = createBoard()
    renderBoard(gBoard)
}

function createBoard() {
    //MODEL 
    // Create array of numbers in random order
    var nums = []
    for (var i = 0; i < gBoardSize; i++) {
        nums[i] = i + 1
    }
    shuffle(nums)
    // Use the created array to fill the board
    const board = []
    var idx = 0
    for (var i = 0; i < Math.sqrt(gBoardSize); i++) {
        board.push([])
        for (var j = 0; j < Math.sqrt(gBoardSize); j++) {
            board[i][j] = nums[idx++]
        }
    }
    return board
}

function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length)
        keep = items[i]
        items[i] = items[randIdx]
        items[randIdx] = keep
    }
    return items
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function renderBoard(board) {
    // DOM - edit HTML to show user the board
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>'

    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, cellI, cellJ) {
    // If the correct cell was clicked do as follows:
    if (gBoard[cellI][cellJ] === gNextNum) {
        // If it is the first cell start timer
        if (gBoard[cellI][cellJ] === 1) startTimer()
        // If this is the last cell restart game after 3 seconds
        if (gNextNum === gBoardSize) {
            elCell.style.backgroundColor = 'red'
            clearInterval(gGameInterval)
            return setTimeout(play, 3000)
        }
        // If this is any other cell change DOM and MODEL
        // DOM 
        elCell.style.backgroundColor = 'red'
        // Model
        gNextNum++
        var elNextNum = document.querySelector('.next-number span')
        elNextNum.innerText = gNextNum
    }
}

function startTimer() {
    var startTime = Date.now()
    gGameInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        gTimer.innerText = (elapsedTime / 1000).toFixed(3)
    }, 100)
}

function onToggleGame() {
    // Restart game if button pressed
    clearInterval(gGameInterval)
    gGameInterval = null
    play()
}

function easyLevel() {
    gBoardSize = 16
    clearInterval(gGameInterval)
    play()
}

function mediumLevel() {
    gBoardSize = 25
    clearInterval(gGameInterval)
    play()
}

function challengingLevel() {
    gBoardSize = 36
    clearInterval(gGameInterval)
    play()

}