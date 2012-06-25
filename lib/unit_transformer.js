var UnitValue = require('./unit_value');


function UnitTransformer(fromUnit, toUnit, operations) {
    this.fromUnit = fromUnit;
    this.toUnit = toUnit;
    this.operations = operations;
}

UnitTransformer._ensureIsSameUnit = function(unit1, unit2) {
    if (!unit1.equalsWithoutPrefix(unit2)) {
        throw new Error("This unit is not equal to other unit");
    }
}

UnitTransformer.prototype.apply = function(unitValue) {
    var sourceUnit = unitValue.getUnit();
    UnitTransformer._ensureIsSameUnit(this.fromUnit, sourceUnit);

    var value = unitValue.getValue();
    this.operations.forEach(function(operation) {
        value = operation.apply(value);
    });

    return new UnitValue(value, this.toUnit);
}

UnitTransformer.prototype.inverse = function() {
    var toUnit = this.fromUnit;
    var fromUnit = this.toUnit;

    var operations = [];
    for (var i = this.operations.length - 1; i >= 0; --i) {
        var operation = this.operations[i];
        var inverseOperation = operation.inverse();
        operations.push(inverseOperation);
    }

    return new UnitTransformer(fromUnit, toUnit, operations);
}

UnitTransformer.prototype.toString = function() {
    return this.fromUnit + ' --> ' + this.toUnit + ': ' + this.operations;
}



module.exports = UnitTransformer;
