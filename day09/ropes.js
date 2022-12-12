const Pixel = require('./Pixel');

var board = [];

board.push([new Pixel('H', 'T')]);

var moves = ['U', 'R', 'U', 'L', 'D', 'R', 'R', 'R'];

moves.forEach(movement => {
    printBoard();
    followT();

    move(movement);

})

function printBoard() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            board[y][x].print();
        }
        console.log('');
    }

    console.log('==========')
}

function findT() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isT()) {
                return { y: y, x: x };
            }
        }
    }
}

function findH() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].isH()) {
                return { y: y, x: x };
            }
        }
    }
}

function isOnEdge(dir) {

    switch (dir) {
        case 'U':
            return findH().y == 0;
        case 'D':
            return findH().y == board.length - 1;
        case 'L':
            return findH().x == 0;
        case 'R':
            return findH().x == board[findH().y].length - 1;
    }


}

function expand(dir) {

    let newLine = [];
    board[0].forEach(() => {
        newLine.push(new Pixel());
    });

    switch (dir) {
        case 'U':
            board.unshift(newLine);
            break;
        case 'D':
            board.push(newLine);
            break;
        case 'L':
            board.forEach(e => e.unshift(new Pixel()));
            break;
        case 'R':
            board.forEach(e => e.push(new Pixel()));
            break;
    }
}

function move(dir) {
    if (isOnEdge(dir)) {
        expand(dir);
    }

    var current = findH();

    switch (dir) {
        case 'U':
            board[current.y][current.x].removeH();
            board[current.y - 1][current.x].addH();
            break;
        case 'D':
            board[current.y][current.x].removeH();
            board[current.y + 1][current.x].addH();
            break;
        case 'L':
            board[current.y][current.x].removeH();
            board[current.y][current.x - 1].addH();
            break;
        case 'R':
            board[current.y][current.x].removeH();
            board[current.y][current.x + 1].addH();
            break;
    }

}

function followT() {
    var hpos = findH();
    var tpos = findT();

    if (Math.abs(hpos.x - tpos.x) <= 1 && Math.abs(hpos.y - tpos.y) <= 1) {
        //console.log('correct');
    } else {

    }
}