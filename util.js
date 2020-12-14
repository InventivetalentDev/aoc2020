module.exports = {
    getLines: function (input) {
        return input.split(/\r?\n/);
    },
    getEmptyLineSeparatedEntries: function (input, newlineSeparator = " ") {
        let lines = this.getLines(input);
        let entries = [];
        let curr = "";
        for (let line of lines) {
            if (line.length < 1) {
                entries.push(curr);
                curr = "";
            } else {
                curr += newlineSeparator + line;
            }
        }
        entries.push(curr); // make sure to include the very last one
        return entries;
    },
    sumArray: function (arr) {
        let s = 0;
        for (let a of arr) {
            let p = parseInt(a);
            if (isNaN(p)) continue;
            s += p;
        }
        return s;
    },
    multiplyArray: function (arr) {
        let m = 1;
        for (let a of arr) {
            m *= parseInt(a);
        }
        return m;
    },
    arrayContainsAll: function (toCheck, required) {
        for (let r of required) {
            if (!toCheck.includes(r)) {
                return false;
            }
        }
        return true;
    },
    stripNewLine: function (str) {
        // https://stackoverflow.com/a/10805198
        return str.replace(/(\r\n|\n|\r)/gm, "")
    },
    mapParseInt: function (a) {
        // https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21
        return parseInt(a);
    },
    mod: function (v, n) {
        // https://stackoverflow.com/a/4467559
        return ((v % n) + n) % n;
    },
    setChar: function (str, p, ch) {
        // https://stackoverflow.com/a/1431110
        return str.substring(0, p) + ch + str.substring(p + 1);
    }
}
