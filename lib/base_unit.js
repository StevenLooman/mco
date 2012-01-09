function BaseUnit(symbol) {
    this.symbol = symbol;
}

BaseUnit.prototype.getSymbol = function() {
    return this.symbol;
}

BaseUnit.prototype.toString = function() {
    return '[' + this.symbol + ']';
}

BaseUnit.prototype.equals = function(other) {
    if (this === other) {
        return true;
    }

    if (!(other instanceof BaseUnit)) {
        return false;
    }

    if (this.symbol == other.symbol) {
        return true;
    }

    return false;
}

module.exports = BaseUnit;
