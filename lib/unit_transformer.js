var eyes = require('eyes');
var UnitValue = require('./unit_value');


function UnitTransformer(fromUnit, toUnit, operations) {
    this.fromUnit = fromUnit;
    this.toUnit = toUnit;
    this.operations = operations;
}

UnitValue._ensureUnitValue = function(unitValue) {
    if (!(unitValue instanceof UnitValue)) {
        throw "Instance not of type UnitValue";
    }
}

UnitTransformer._ensureSameUnit = function(unit1, unit2) {
    if (unit1 !== unit2) {
        throw "This unit is not equal to other unit";
    }
}

UnitTransformer.prototype.apply = function(unitValue) {
    var sourceUnit = unitValue.getUnit();
    UnitTransformer._ensureSameUnit(this.fromUnit, sourceUnit);

    var value = unitValue.getValue();
    this.operations.forEach(function(operation) {
        value = operation.apply(value);
    });

    return new UnitValue(value, this.toUnit);
}

UnitTransformer.prototype.toString = function() {
    return this.fromUnit + ' --> ' + this.toUnit + ': ' + this.operations;
}



module.exports = UnitTransformer;
