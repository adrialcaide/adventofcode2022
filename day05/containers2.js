const fs = require('fs');

var containers = new Map();

var containersComplete = false;

const allFileContents = fs.readFileSync('containersinput.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line => {
    if (line == '') {
        return;
    }

    if (!containersComplete) {
        var arrPos = 1;
        for (var i = 0; i < line.length; i++) {

            if ((i - 1) % 4 == 0) {
                if (line[1] == '1') {
                    containersComplete = true;
                    break;
                }
                var stack = containers.get(arrPos) || [];
                if (line[i] != ' ') {
                    stack.push(line[i]);
                }
                containers.set(arrPos, stack);
                arrPos++;
            }
        }
    } else {

        var linespl = line.split(' ');

        var q = parseInt(linespl[1]);
        var from = parseInt(linespl[3]);
        var to = parseInt(linespl[5]);

        var tomove = [];
        for (let i = 0; i < q; i++) {
            let container = containers.get(from).shift();
            tomove.push(container);

        }
        containers.get(to);
        containers.set(to, tomove.concat(containers.get(to)));
    }
});

var result = '';
for (let stack of containers.values()) {
    result = result + stack.shift();
}

console.log(result);