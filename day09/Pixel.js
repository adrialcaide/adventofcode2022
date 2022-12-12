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
        }
        process.stdout.write(val);
    }

    isH() {
        return this.values.includes('H');
    }

    isT() {
        return this.values.includes('T');
    }

    addH() {
        this.values.push('H');
    }

    addT() {
        this.values.push('T');
    }

    removeH() {
        this.values.splice(this.values.indexOf('H'), 1);
        this.historic.push('H');
    }

    removeT() {
        this.values.splice(this.values.indexOf('T'), 1);
        this.historic.push('T');
    }
}

module.exports = Pixel;