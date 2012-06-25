var Prefix = require('./prefix');


function BaseUnit(quantity, prefix, symbol) {
    this.quantity = arguments[0];

    if (arguments.length == 2) {
        this.prefix = Prefix.ONE;
        this.symbol = arguments[1];
    } else if (arguments.length == 3) {
        this.prefix = arguments[1];
        this.symbol = arguments[2];
    } else {
        throw new Error("Quantity or symbol is null");
    }
}

BaseUnit.prototype.applyPrefix = function(prefix) {
    if (!this.prefix.equals(Prefix.ONE)) {
        // For now, lets keep it safe.
        // Later on, this should do prefix * prefix.
        throw new Error("Cannot apply prefix to prefixed BaseUnit");
    }

    return new BaseUnit(this.getQuantity(), prefix, this.getBaseSymbol());
}

BaseUnit.prototype.getQuantity = function() {
    return this.quantity;
}

BaseUnit.prototype.getPrefix = function() {
    return this.prefix;
}

BaseUnit.prototype.getSymbol = function() {
    return this.prefix.getSymbol() + this.symbol;
}

BaseUnit.prototype.getBaseSymbol = function() {
    return this.symbol;
}

BaseUnit.prototype.toString = function() {
    return '[' + this.prefix.getSymbol() + this.getBaseSymbol() + ']';
}

BaseUnit.prototype.equals = function(other) {
    if (this === other) {
        return true;
    }

    if (!(other instanceof BaseUnit)) {
        return false;
    }

    if (this.quantity !== other.quantity) {
        return false;
    }

    if (!this.prefix.equals(other.getPrefix())) {
        return false;
    }

    if (this.symbol !== other.symbol) {
        return false;
    }

    return true;
}

BaseUnit.prototype.getSimplified = function() {
    return new BaseUnit(this.getQuantity(), this.getPrefix(), this.getSymbol());
}

module.exports = BaseUnit;
