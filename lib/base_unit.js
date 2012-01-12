function BaseUnit(quantity, symbol) {
    if (quantity == null || symbol == null) {
        throw new Error("Quantity or symbol is null");
    }
    this.quantity = quantity;
    this.symbol = symbol;
}

BaseUnit.prototype.getQuantity = function() {
    return this.quantity;
}

BaseUnit.prototype.getSymbol = function() {
    return this.symbol;
}

BaseUnit.prototype.toString = function() {
    return '[' + this.getSymbol() + ']';
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

    if (this.symbol !== other.symbol) {
        return false;
    }

    return true;
}

module.exports = BaseUnit;
