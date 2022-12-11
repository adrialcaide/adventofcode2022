const fs = require('fs');

var buf = fs.readFileSync('treesinput.txt');

var forest = [];
buf.toString().split(/\n/).forEach(function (line) {
    var treeLine = line.split('');
    forest.push(treeLine);
});

var visibles = 0;

for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
        if (isVisible(y, x)) {
            visibles++;
            continue;
        }
    }
}

console.log(visibles);

function isEdge(y, x) {
    if (y == 0 || x == 0) return true;
    if (y == forest.length - 1 || x == forest[y].length - 1) {
        return true;
    }
    return false;
}

function isVisible(y, x) {
    if (isEdge(y, x)) {
        return true;
    }

    var value = forest[y][x];

    //TOP
    var topVisible = true;
    for (let ypos = 0; ypos < y; ypos++) {
        if (forest[ypos][x] >= value) {
            topVisible = false;
            break;
        }
    }

    //BOTTOM
    var btmVisible = true;
    for (let ypos = y + 1; ypos < forest.length; ypos++) {
        if (forest[ypos][x] >= value) {
            btmVisible = false;
            break;
        }
    }

    //LEFT
    var lftVisible = true;
    for (let xpos = 0; xpos < x; xpos++) {
        if (forest[y][xpos] >= value) {
            lftVisible = false;
            break;
        }
    }

    //RIGHT
    var rgtVisible = true;
    for (let xpos = x + 1; xpos < forest[y].length; xpos++) {
        if (forest[y][xpos] >= value) {
            rgtVisible = false;
            break;
        }
    }

    return topVisible || btmVisible || lftVisible || rgtVisible;
}