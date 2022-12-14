const fs = require('fs');
const Monkey = require('./Monkey');

var buf = fs.readFileSync('monkeysinput.txt');

var monkeys = [];

var currentMonkey;
buf.toString().split(/\n/).forEach(function(line) {
    line = line.trim();
    if (line == '') {
        return;
    }
    if (line.startsWith('Monkey')) {
        var id = parseInt(line.split(' ')[1].slice(0, -1));
        currentMonkey = new Monkey(id, 3);
        monkeys.push(currentMonkey);

    } else if (line.startsWith('Starting items')) {
        line = line.replace('Starting items:', '');
        currentMonkey.items = line.split(',').map(i => parseInt(i.trim()));

    } else if (line.startsWith('Operation')) {
        line = line.replace('Operation: new = ', '');
        currentMonkey.operation = line;

    } else if (line.startsWith('Test:')) {
        currentMonkey.divisible = parseInt(line.split(' ')[3]);

    } else if (line.startsWith('If true:')) {
        currentMonkey.whenT = parseInt(line.split(' ')[5]);

    } else if (line.startsWith('If false:')) {
        currentMonkey.whenF = parseInt(line.split(' ')[5]);
    }
});


monkeys.forEach(monkey => {
    monkey.whenT = findMonkeyById(monkey.whenT);
    monkey.whenF = findMonkeyById(monkey.whenF);
});

var rounds = 20;

for (let i = 0; i < rounds; i++) {
    round();
    //console.log(`== ROUND ${i+1} ==`);
    //displayMonkeys();
}

var scores = monkeys.map(m => m.totalInspected).sort((a, b) => b - a);
console.log(scores[0] * scores[1]);


function findMonkeyById(id) {
    return monkeys.filter(m => m.id == id)[0];
}

function round() {
    monkeys.forEach(m => m.takeTurn());
}

function displayMonkeys() {
    monkeys.forEach(m => m.display());
}