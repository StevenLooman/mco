var eyes = require('eyes');
var BaseUnit = require('./base_unit');


function ProductUnit(elements) {
    this.elements = elements;
}

ProductUnit.NOP = '';
ProductUnit.MULTIPLY = '*';
ProductUnit.DIVIDE = '/';


ProductUnit.prototype.getSymbol = function() {
    var result = '';

    function appendSymbol(element) {
        var op = element[0];
        var unit = element[1];

        if (op === ProductUnit.MULTIPLY) {
            result += '*';
        } else if (op === ProductUnit.DIVIDE) {
            result += '/';
        }
        result += unit.getSymbol();
    }

    this.elements.forEach(appendSymbol);

    return result;
}

ProductUnit.prototype.multiply = function(unit) {
    if (unit instanceof BaseUnit) {
        var elements1 = this.elements;
        var elements2 = [ [ ProductUnit.MULTIPLY, unit ] ];
        var elements = elements1.concat(elements2);
        return new ProductUnit(elements);
    } else {
        throw "ProductUnit.multiply(ProductUnit) is not supported";
    }
}

ProductUnit.prototype.divide = function(unit) {
    if (unit instanceof BaseUnit) {
        var elements1 = this.elements;
        var elements2 = [ [ ProductUnit.DIVIDE, unit ] ];
        var elements = elements1.concat(elements2);
        return new ProductUnit(elements);
    } else {
        throw "ProductUnit.divide(ProductUnit) is not supported";
    }
}

ProductUnit.prototype.toString = function() {
    return '[' + this.getSymbol() + ']';
}

ProductUnit.prototype.equals = function(other) {
    if (this === other) {
        return true;
    }

    if (!(other instanceof ProductUnit)) {
        return false;
    }

    if (this.elements.length != other.elements.length) {
        return false;
    }

    // compare elements
    for (var i = 0; i < this.elements.length; ++i) {
        var e1 = this.elements[i];
        var e2 = other.elements[i];

        // operation
        if (e1[0] != e2[0]) {
            return false;
        }

        // unit
        if (!e1[1].equals(e2[1])) {
            return false;
        }
    }

    return true;
}

ProductUnit.prototype.getSimplified = function() {
    var elements = this.elements.slice(0);

    for (var i = 0; i < elements.length - 1; ++i) {
        var element1 = elements[i];

        for (var j = i + 1; j < elements.length; ++j) {
            var element2 = elements[j];

            if (ProductUnit.canSimplify(element1, element2)) {
                // remove element1, element2 form elements
                elements.splice(j, 1);
                elements.splice(i, 1);
                break;
            }
        }
    }

    if (elements.length == 1) {
        return new BaseUnit(elements[0][1].getQuantity(), elements[0][1].getSymbol());
    }

    return new ProductUnit(elements);
}

ProductUnit.canSimplify = function(element1, element2) {
    if (!element1[1].equals(element2[1])) {
        return false;
    }

    // NOP, DIVIDE
    if (element1[0] === ProductUnit.NOP && element2[0] === ProductUnit.DIVIDE) {
        return true;
    }

    // DIVIDE, MULTIPLY
    if (element1[0] === ProductUnit.DIVIDE && element2[0] === ProductUnit.MULTIPLY) {
        return true;
    }

    // MULTIPLY, DIVIDE
    if (element1[0] === ProductUnit.MULTIPLY && element2[0] === ProductUnit.DIVIDE) {
        return true;
    }

    return false;
}


// Extras for BaseUnit
BaseUnit.prototype.multiply = function(unit) {
    return new ProductUnit([ [ProductUnit.NOP, this], [ ProductUnit.MULTIPLY, unit ] ]);
}

BaseUnit.prototype.divide = function(unit) {
    return new ProductUnit([ [ProductUnit.NOP, this], [ ProductUnit.DIVIDE, unit ] ]);
}


module.exports = ProductUnit;
