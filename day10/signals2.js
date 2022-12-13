const fs = require('fs');

var buf = fs.readFileSync('signalsinput.txt');
var lines = buf.toString().split(/\n/);

const cycles = 240;

var x = 1;

var lineIdx = 0;
var subCycles = 0;

drawingPixel = 0;
for (let c = 1; c <= cycles; c++) {

    var sprite = generateSprite(x);
    //console.log(sprite, x);
    process.stdout.write(sprite.charAt(drawingPixel));

    drawingPixel++;
    if (c % 40 == 0) {
        console.log('');
        drawingPixel = 0;
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

function isAddx(line) {
    return line.startsWith('addx');
}

function generateSprite(x) {

    var sprite = ''
    for (let i = 0; i < 40; i++) {
        if (i >= x - 1 && i <= x + 1) {
            sprite = sprite + '#';
        } else {
            sprite = sprite + '.';
        }
    }
    return sprite;
}