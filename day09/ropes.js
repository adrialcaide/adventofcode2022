const fs = require('fs');
const Pixel = require('./Pixel');

var board = [];

board.push([new Pixel('H', 'T')]);

var moves = [];

var buf = fs.readFileSync('ropesinput.txt');
buf.toString().split(/\n/).forEach(function(line) {
    var linesplit = line.split(' ');

    var dir = linesplit[0];
    var quantity = parseInt(linesplit[1]);

    for (let i = 0; i < quantity; i++) {
        moves.push(dir);
    }
});

moves.forEach(movement => {
    //printBoard();

    move(movement);
    followT();

});
//printBoard();
//printLast();

console.log(countVisitedT());

function printBoard() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            board[y][x].print();
        }
        console.log('');
    }

    console.log('==========')
}

function printLast() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].historic.includes('T') || board[y][x].isT()) {
                process.stdout.write('#');
            } else {
                process.stdout.write('.');
            }
        }
    }

    console.log('==========');
    return count;
}

function countVisitedT() {
    var count = 0;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].historic.includes('T') || board[y][x].isT()) {
                count++;
            }
        }
    }
    return count;
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

    if (!areValidPositions(hpos, tpos)) {
        for (let y = tpos.y - 1; y <= tpos.y + 1; y++) {
            for (let x = tpos.x - 1; x <= tpos.x + 1; x++) {
                let newTPos = { y: y, x: x };
                if (isValidMove(hpos, newTPos)) {
                    board[tpos.y][tpos.x].removeT();
                    board[newTPos.y][newTPos.x].addT();
                }
            }
        }
    }
}

function isValidMove(hpos, tpos) {
    let xGap = Math.abs(hpos.x - tpos.x);
    let yGap = Math.abs(hpos.y - tpos.y);
    return (xGap == 0 && yGap <= 1) || (xGap <= 1 && yGap == 0);
}

function areValidPositions(hpos, tpos) {
    return Math.abs(hpos.x - tpos.x) <= 1 && Math.abs(hpos.y - tpos.y) <= 1;
}