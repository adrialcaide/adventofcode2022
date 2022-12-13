const fs = require('fs');

var buf = fs.readFileSync('signalsinput.txt');
var lines = buf.toString().split(/\n/);

const cycles = 220;

var x = 1;

var strengths = [];

var lineIdx = 0;
var subCycles = 0;
for (let c = 1; c <= cycles; c++) {

    if (c == 20 || (c - 20) % 40 == 0) {
        //console.log(`cycle ${c} / x: ${x}`);
        strengths.push(c * x);
    }

    var currentLine = lines[lineIdx];
    if (isAddx(currentLine)) {
        subCycles++;

        if (subCycles == 2) {
            subCycles = 0;
            lineIdx++;
            x += parseInt(currentLine.split(' ')[1]);
        }
    } else {
        lineIdx++;
    }

}

console.log(strengths.reduce((acc, v) => acc + v, 0));

function isAddx(line) {
    return line.startsWith('addx');
}