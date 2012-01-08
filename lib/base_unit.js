function BaseUnit(symbol) {
    this.symbol = symbol;
}

BaseUnit.prototype.getSymbol = function() {
    return this.symbol;
}

BaseUnit.prototype.toString = function() {
    return '[' + this.symbol + ']';
}

module.exports = BaseUnit;
