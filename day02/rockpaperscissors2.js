const fs = require('fs');

// A for Rock, B for Paper, and C for Scissors.
// X for lose, Y for draw, and Z for win

var total = 0;

var buf = fs.readFileSync('rpsinput.txt');
buf.toString().split(/\n/).forEach(function (line) {
    var linearr = line.split(' ');
    var pl1 = translate(linearr[0]);
    var pl2 = translateWinStatus(pl1, linearr[1]);

    total += winScore(pl1, pl2) + useScore(pl2);
});

console.log(total);

function translateWinStatus(pl1, status) {
    if (status == 'X') return getLose(pl1);
    if (status == 'Y') return getDraw(pl1);
    if (status == 'Z') return getWin(pl1);
}

function getLose(pl) {
    if (pl == 'R') return 'S';
    if (pl == 'P') return 'R';
    if (pl == 'S') return 'P';
}

function getDraw(pl) {
    return pl;
}

function getWin(pl) {
    if (pl == 'R') return 'P';
    if (pl == 'P') return 'S';
    if (pl == 'S') return 'R';
}

function translate(pl) {
    if (pl == 'A') return 'R';
    if (pl == 'B') return 'P';
    if (pl == 'C') return 'S';
}

function winScore(pl1, pl2) {
    if ((pl1 == 'R' && pl2 == 'P') ||
        (pl1 == 'P' && pl2 == 'S') ||
        (pl1 == 'S' && pl2 == 'R')) {
        return 6;
    }

    if ((pl1 == 'P' && pl2 == 'R') ||
        (pl1 == 'S' && pl2 == 'P') ||
        (pl1 == 'R' && pl2 == 'S')) {
        return 0;
    }

    return 3;
}

function useScore(pl) {
    if (pl == 'R') return 1;
    if (pl == 'P') return 2;
    if (pl == 'S') return 3;
}