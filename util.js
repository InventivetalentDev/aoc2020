module.exports = {
    getLines: function (input) {
        return input.split("\n");
    },
    getEmptyLineSeparatedEntries: function (input) {
        let lines = this.getLines(input);
        let entries = [];
        let curr = "";
        for (let line of lines) {
            if (line.length <= 1) {
                entries.push(curr);
                curr = "";
            } else {
                curr += " " + line;
            }
        }
        entries.push(curr); // make sure to include the very last one
        return entries;
    },
    multiplyArray: function (arr) {
        let m = 1;
        for (let a of arr) {
            m *= a;
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
    }
}
