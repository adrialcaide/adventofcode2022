const fs = require('fs');
const path = require('path')

const MAX_DISK_SIZE = 70000000;
const NEEDED_UNUSED = 30000000;

var buf = fs.readFileSync('directoriesinput.txt');

var dirSizesMap = new Map();

var pwd = '';
buf.toString().split(/\n/).forEach(function (line) {
    var lineSplit = line.split(' ');

    if (lineSplit[0] == '$') {
        if (lineSplit[1] == 'cd') {
            pwd = path.normalize(path.join(pwd, lineSplit[2]));
        }
        return;
    }

    var dirarr = dirSizesMap.get(pwd) || [];

    if (lineSplit[0] == 'dir') {
        dirarr.push(path.join(pwd, lineSplit[1]));
    } else {
        dirarr.push(parseInt(lineSplit[0]));
    }

    dirSizesMap.set(pwd, dirarr);

});

for (let dirName of dirSizesMap.keys()) {
    var dir = dirSizesMap.get(dirName);
    for (let val of dirSizesMap.values()) {
        for (let item of val) {
            if (item == dirName) {
                val.push(dir);
                val.splice(val.indexOf(dirName), 1);
            }
        }
    }
}

var totalDirSizes = new Map();

for (let dir of dirSizesMap.keys()) {
    totalDirSizes.set(dir, sumEverything(dirSizesMap.get(dir)));
}

var availableSpace = MAX_DISK_SIZE - totalDirSizes.get('/');

var orderedDirSizes = [...totalDirSizes.values()].sort((a, b) => a - b);

for (let toDelete of orderedDirSizes) {
    if ((availableSpace + toDelete) >= NEEDED_UNUSED) {
        console.log(toDelete);
        break;
    }
}

function sumEverything(item) {
    var sum = 0;
    if (Array.isArray(item)) {
        for (let i of item) {
            sum += sumEverything(i);
        }
    } else {
        sum = item;
    }
    return sum;

}