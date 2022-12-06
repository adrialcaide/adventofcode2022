const fs = require('fs');

var buf = fs.readFileSync('cleaninginput.txt');

var total = 0;
buf.toString().split(/\n/).forEach(function (line) {
    var elf1 = line.split(',')[0];
    var elf2 = line.split(',')[1];

    var sections1 = fillElfArray(elf1);
    var sections2 = fillElfArray(elf2);

    if (containsAll(sections1, sections2) || containsAll(sections2, sections1)) {
        total++;
    }
});

console.log(total);

function containsAll(arr1, arr2) {
    return arr1.every(v => arr2.includes(v));
}

function fillElfArray(elf) {
    var start = parseInt(elf.split('-')[0]);
    var end = parseInt(elf.split('-')[1]);

    return Array.from({ length: end - start + 1 }, (v, k) => k + start);
}

