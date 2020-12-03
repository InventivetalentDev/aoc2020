module.exports = {
    getLines: function (input) {
        return input.split("\n");
    },
    multiplyArray: function (arr) {
        let m = 1;
        for (let a of arr) {
            m *= a;
        }
        return m;
    }
}
