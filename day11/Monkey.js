class Monkey {

    constructor(id, divisorbored = false) {
        this.id = id;
        this.totalInspected = 0;
        this.divisorbored = divisorbored;
    }

    display() {
        console.log(`Monkey ${this.id}: ${this.items}`);
    }

    takeTurn() {
        while (this.items.length != 0) {
            var item = this.items.shift();

            var oper = this.operation.replaceAll('old', item);
            item = eval(oper);
            if (this.divisorbored) {
                item = item / this.divisorbored;
            }

            item = parseInt(item);

            if (item % this.divisible == 0) {

                this.whenT.items.push(item);
            } else {
                this.whenF.items.push(item);
            }

            this.totalInspected++;
        }
    }

    moduleItems(module) {
        this.items = this.items.map(i => i % module);
    }

}

module.exports = Monkey;