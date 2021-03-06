var R = require('ramda');
var C = require('js-combinatorics');
var wu = require('wu');

var neighbors = R.without([[0, 0]], C.baseN([-1, 0, 1], 2).toArray());
var add = (a, b) => R.map(R.sum, R.zip(a, b));
var getPos = n => {
    var sqr = Math.floor(Math.sqrt(n));
    var diff = n - Math.pow(sqr, 2);
    var x = Math.floor((sqr - 1) / 2) + Math.min(1, diff) - Math.max(diff - (sqr + 1), 0);
    var y = Math.floor(sqr / 2) - Math.min(Math.max(diff - 1, 0), sqr);
    return sqr % 2 === 1 ? [x, y] : [-x, -y];
}

var spiral = function*() {
    var i = 0;
    var grid = {};
    var sumNeighbors = pos => R.sum(R.map(n => grid[add(pos, n)] || 0, neighbors));

    while (true) {
        var pos = getPos(i++);
        yield grid[pos] = sumNeighbors(pos) || 1;
    }
}

var solution = R.pipe(parseInt, R.lt, R.find(R.__, wu(spiral())));

module.exports = solution;