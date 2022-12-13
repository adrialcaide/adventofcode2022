const fs = require('fs');
const Pixel = require('./Pixel');

var board = [];

board.push([new Pixel('H', '1', '2', '3', '4', '5', '6', '7', '8', '9')]);

var buf = fs.readFileSync('ropesinput.txt');
buf.toString().split(/\n/).forEach(function(line) {
    var linesplit = line.split(' ');

    var dir = linesplit[0];
    var quantity = parseInt(linesplit[1]);

    for (let i = 0; i < quantity; i++) {
        makeOneMove(dir);
    }
    //printBoard();
});

//printLast();

function makeOneMove(movement) {
    move(movement);

    let prevItem = 'H';
    for (let i = 1; i <= 9; i++) {
        follow(prevItem, i + '');
        prevItem = i + '';
    }
}

console.log(countVisited('9'));

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
            if (board[y][x].historic.includes('9') || board[y][x].is('9')) {
                process.stdout.write('#');
            } else {
                process.stdout.write('.');
            }

        }
        console.log('');
    }

    console.log('==========');
}

function countVisited(element) {
    var count = 0;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].historic.includes(element) || board[y][x].is(element)) {
                count++;
            }
        }
    }
    return count;
}


function find(item) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].is(item)) {
                return { y: y, x: x };
            }
        }
    }
}

function isOnEdge(dir) {

    switch (dir) {
        case 'U':
            return find('H').y == 0;
        case 'D':
            return find('H').y == board.length - 1;
        case 'L':
            return find('H').x == 0;
        case 'R':
            return find('H').x == board[find('H').y].length - 1;
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

    var current = find('H');

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

function follow(item1, item2) {

    //console.log('following', item1, item2);

    var pos1 = find(item1);
    var pos2 = find(item2);

    //console.log('coord', pos1, pos2);

    if (!areValidPositions(pos1, pos2)) {
        var bestMove;
        var bestMoveRate = 0;
        for (let y = pos2.y - 1; y <= pos2.y + 1; y++) {
            for (let x = pos2.x - 1; x <= pos2.x + 1; x++) {
                let newpos2 = { y: y, x: x };
                if (isValidCoordinates(newpos2)) {
                    var moveRate = rateMove(pos1, newpos2);

                    if (moveRate != 0 && moveRate > bestMoveRate) {
                        bestMove = newpos2;
                        bestMoveRate = moveRate;
                    }
                    // board[pos2.y][pos2.x].remove(item2);
                    // board[newpos2.y][newpos2.x].add(item2);
                    // return;
                }
            }
        }
        board[pos2.y][pos2.x].remove(item2);
        board[bestMove.y][bestMove.x].add(item2);

    }
}

function isValidMove(pos1, pos2) {
    let xGap = Math.abs(pos1.x - pos2.x);
    let yGap = Math.abs(pos1.y - pos2.y);
    return (xGap == 0 && yGap <= 1) || (xGap <= 1 && yGap == 0);
}

function rateMove(pos1, pos2) {
    let xGap = Math.abs(pos1.x - pos2.x);
    let yGap = Math.abs(pos1.y - pos2.y);
    if ((xGap == 0 && yGap <= 1) || (xGap <= 1 && yGap == 0)) {
        return 1;
    } else if (areValidPositions(pos1, pos2)) {
        return 0.5;
    }

    return 0;
}

function areValidPositions(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) <= 1 && Math.abs(pos1.y - pos2.y) <= 1;
}

function isValidCoordinates(pos) {
    return pos.y >= 0 && pos.x >= 0 && pos.y < board.length && pos.x < board[pos.y].length;
}