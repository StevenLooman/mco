function Prefix(symbol, name, factor) {
    this.symbol = symbol;
    this.name = name;
    this.factor = factor;
}

Prefix.prototype.getSymbol = function() {
    return this.symbol;
}

Prefix.prototype.getName = function() {
    return this.name;
}

Prefix.prototype.getFactor = function() {
    return this.factor;
}

Prefix.prototype.transformFactor = function(other) {
    return this.factor / other.factor;
}

Prefix.prototype.toString = function() {
    return this.getSymbol();
}

Prefix.prototype.equals = function(other) {
    if (this === other) {
        return true;
    }

    if (this.symbol !== other.symbol) {
        return false;
    }

    if (this.name !== other.name) {
        return false;
    }

    if (this.factor !== other.factor) {
        return false;
    }

    return true;
}


Prefix.KILO = new Prefix('k', 'kilo', 1e3);
Prefix.ONE = new Prefix('', '', 1e0);


module.exports = Prefix;
