var Prefix = require('./prefix');


function BaseUnit(quantity, prefix, symbol) {
    this.quantity = quantity;

    if (symbol === undefined) {
        symbol = prefix;
        prefix = Prefix.ONE;
    }

    this.prefix = prefix;
    this.symbol = symbol;
}

BaseUnit.prototype.applyPrefix = function(prefix) {
    if (!this.prefix.equals(Prefix.ONE)) {
        // For now, lets keep it safe.
        // Later on, this should do prefix * prefix.
        throw new Error("Cannot apply prefix to prefixed BaseUnit");
    }

    return new BaseUnit(this.getQuantity(), prefix, this.getBaseSymbol());
};

BaseUnit.prototype.getQuantity = function() {
    return this.quantity;
};

BaseUnit.prototype.getPrefix = function() {
    return this.prefix;
};

BaseUnit.prototype.getSymbol = function() {
    return this.prefix.getSymbol() + this.symbol;
};

BaseUnit.prototype.getBaseSymbol = function() {
    return this.symbol;
};

BaseUnit.prototype.toString = function() {
    return '[' + this.prefix.getSymbol() + this.getBaseSymbol() + ']';
};

BaseUnit.prototype.equals = function(other) {
    return this.equalsWithoutPrefix(other) && this.prefix.equals(other.getPrefix());
};

BaseUnit.prototype.equalsWithoutPrefix = function(other) {
    return this === other ||
        (other instanceof BaseUnit &&
         this.quantity === other.quantity &&
         this.symbol === other.symbol);
};

BaseUnit.prototype.getSimplified = function() {
    return new BaseUnit(this.getQuantity(), this.getPrefix(), this.getSymbol());
};

module.exports = BaseUnit;
