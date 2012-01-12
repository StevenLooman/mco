var BaseUnit = require('./base_unit');
var ProductUnit = require('./product_unit');

function AlternateUnit(quantity, symbol, unit) {
    if (quantity == null || symbol == null || unit == null) {
        throw new Error("Quantity, symbol or unit is null");
    }
    this.quantity = quantity;
    this.symbol = symbol;
    this.unit = unit;
}

AlternateUnit.prototype.getQuantity = function() {
    return this.quantity;
}

AlternateUnit.prototype.getSymbol = function() {
    return this.symbol;
}

AlternateUnit.prototype.toString = function() {
    return '[' + this.getSymbol() + ']';
}

AlternateUnit.prototype.multiply = function(unit) {
        return new ProductUnit([ [ProductUnit.NOP, this], [ ProductUnit.MULTIPLY, unit ] ]);
}

AlternateUnit.prototype.divide = function(unit) {
        return new ProductUnit([ [ProductUnit.NOP, this], [ ProductUnit.DIVIDE, unit ] ]);
}

AlternateUnit.prototype.getParentUnit = function() {
    return this.unit;
}

AlternateUnit.prototype.equals = function(other) {
    if (this === other) {
        return true;
    }

    if (!(other instanceof AlternateUnit)) {
        return false;
    }

    if (this.quantity !== other.quantity) {
        return false;
    }

    if (this.symbol !== other.symbol) {
        return false;
    }

    if (!this.unit.equals(other.unit)) {
        return false;
    }

    return true;
}

module.exports = AlternateUnit;
