const fs = require('fs');

var buf = fs.readFileSync('elvesinput.txt');

var topElf = 0;
var currentElf = 0;
buf.toString().split(/\n/).forEach(function (line) {
    var num = parseInt(line);
    if (isNaN(num)) {

        if (topElf < currentElf) {
            topElf = currentElf;
        }
        currentElf = 0
    } else {
        currentElf += num;
    }
});

console.log(topElf);