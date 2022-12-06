const fs = require('fs');

const vals = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var buf = fs.readFileSync('packagesinput.txt');

var total = 0;

var groupSize = 3;
var group = [];
buf.toString().split(/\n/).forEach(function (line) {
    group.push(line);
    if (group.length == groupSize) {
        var intersection = group[0];
        for (let package of group) {
            var intersection = [...intersection].filter(element => package.includes(element));
        }

        group = [];

        var letter = intersection[0];
        value = vals.indexOf(letter) + 1;
        total += value;
    }

});

console.log(total);

