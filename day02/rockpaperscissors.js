const fs = require('fs');

// A for Rock, B for Paper, and C for Scissors.
// X for Rock, Y for Paper, and Z for Scissors

var total = 0;

var buf = fs.readFileSync('rpsinput.txt');
buf.toString().split(/\n/).forEach(function (line) {
    var linearr = line.split(' ');
    var pl1 = translate(linearr[0]);
    var pl2 = translate(linearr[1]);

    total += winScore(pl1, pl2) + useScore(pl2);
});

console.log(total);

function translate(pl) {
    if (pl == 'A' || pl == 'X') {
        return 'R';
    }
    if (pl == 'B' || pl == 'Y') {
        return 'P';
    }
    if (pl == 'C' || pl == 'Z') {
        return 'S';
    }
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