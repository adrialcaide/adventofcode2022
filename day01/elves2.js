const fs = require('fs');

var buf = fs.readFileSync('elvesinput.txt');

var elves = []
var currentElf = 0;
buf.toString().split(/\n/).forEach(function (line) {
    var num = parseInt(line);
    if (isNaN(num)) {
        elves.push(currentElf);
        currentElf = 0
    } else {
        currentElf += num;
    }
});

elves.sort((a, b) => b - a);

var top = 3;

var topsum = 0;
for (let i = 0; i < top; i++) {
    topsum += elves[i];
}

console.log(topsum);