const fs = require('fs');

var input = fs.readFileSync('commsinput.txt', 'utf-8');

var window = []
for (var i = 0; i < input.length; i++) {
    window.push(input[i]);

    if (window.length == 4) {
        if (allDifferent(window)) {
            console.log(i + 1);
            break;
        }

        window.shift();
    }
}


function allDifferent(arr) {
    return arr.length == [...new Set(arr)].length;
}

