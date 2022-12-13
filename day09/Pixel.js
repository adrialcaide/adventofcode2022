class Pixel {

    constructor(...values) {
        this.values = values;
        this.historic = [];
    }

    print() {
        var val = '.';
        if (this.isH()) {
            val = 'H';
        } else if (this.isT()) {
            val = 'T';
        } else {
            val = this.values.sort((a, b) => a - b)[0];
        }

        if (!val) {
            val = '.';
        }

        process.stdout.write(val + '');
    }

    isH() {
        return this.is('H');
    }

    isT() {
        return this.is('T');
    }

    is(item) {
        return this.values.includes(item);
    }

    addH() {
        this.add('H');
    }

    addT() {
        this.add('T');
    }

    add(item) {
        this.values.push(item);
    }

    removeH() {
        this.remove('H');
    }

    removeT() {
        this.remove('T');
    }

    remove(item) {
        this.values.splice(this.values.indexOf(item), 1);
        this.historic.push(item);
    }
}

module.exports = Pixel;