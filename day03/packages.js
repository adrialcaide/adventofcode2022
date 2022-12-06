const fs = require('fs');

const vals = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var buf = fs.readFileSync('packagesinput.txt');

var total = 0;
buf.toString().split(/\n/).forEach(function (line) {
    var compartment1 = line.substring(0, line.length / 2);
    var compartment2 = line.substring(line.length / 2, line.length);

    var intersection = [...compartment1].filter(element => compartment2.includes(element));

    var letter = intersection[0];

    value = vals.indexOf(letter) + 1;

    total += value;
});

console.log(total);
