const fs = require('fs');

var buf = fs.readFileSync('treesinput.txt');

var forest = [];
buf.toString().split(/\n/).forEach(function (line) {
    var treeLine = line.split('');
    forest.push(treeLine);
});

var bestScore = 0;
for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
        var score = visibilityScore(y, x);
        if (score > bestScore) {
            bestScore = score;
        }
    }
}

console.log(bestScore);

function visibilityScore(y, x) {

    var value = forest[y][x];

    //TOP
    var topTrees = 0;
    for (let ypos = y - 1; ypos >= 0; ypos--) {
        topTrees++;
        if (forest[ypos][x] >= value) {
            break;
        }
    }

    //BOTTOM
    var btmTrees = 0;
    for (let ypos = y + 1; ypos < forest.length; ypos++) {
        btmTrees++;
        if (forest[ypos][x] >= value) {
            break;
        }
    }

    //LEFT
    var lftTrees = 0;
    for (let xpos = x - 1; xpos >= 0; xpos--) {
        lftTrees++;
        if (forest[y][xpos] >= value) {
            break;
        }
    }

    //RIGHT
    var rgtTrees = 0;
    for (let xpos = x + 1; xpos < forest[y].length; xpos++) {
        rgtTrees++;
        if (forest[y][xpos] >= value) {
            break;
        }
    }

    return topTrees * btmTrees * lftTrees * rgtTrees;
}