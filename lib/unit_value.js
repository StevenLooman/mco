var eyes = require('eyes');


function UnitValue(value, unit) {
    this.value = value;
    this.unit = unit;
}

UnitValue.prototype.getValue = function() {
    return this.value;
}

UnitValue.prototype.getUnit = function() {
    return this.unit;
}

UnitValue._ensureUnitValue = function(unitValue) {
    if (!(unitValue instanceof UnitValue)) {
        throw "Instance not of type UnitValue";
    }
}

UnitValue._ensureSameUnit = function(unitValue1, unitValue2) {
    var unit1 = unitValue1.unit;
    var unit2 = unitValue2.unit;
    if (unit1 !== unit2) {
        throw "This unit is not equal to other unit";
    }
}

UnitValue.prototype.add = function(other) {
    UnitValue._ensureUnitValue(other);
    UnitValue._ensureSameUnit(this, other);

    var newValue = this.getValue() + other.getValue();
    return new UnitValue(newValue, this.getUnit());
}

UnitValue.prototype.subtract = function(other) {
    UnitValue._ensureUnitValue(other);
    UnitValue._ensureSameUnit(this, other);

    var newValue = this.getValue() - other.getValue();
    return new UnitValue(newValue, this.getUnit());
}

UnitValue.prototype.multiply = function(other) {
    var value1 = this.getValue();
    var value2 = other.getValue();
    var value = value1 * value2;

    var unit1 = this.unit;
    var unit2 = other.unit;
    var unit = unit1.multiply(unit2);

    return new UnitValue(value, unit);
}

UnitValue.prototype.divide = function(other) {
    var value1 = this.getValue();
    var value2 = other.getValue();
    var value = value1 / value2;

    var unit1 = this.unit;
    var unit2 = other.unit;
    var unit = unit1.divide(unit2);

    return new UnitValue(value, unit);
}

UnitValue.prototype.toString = function() {
    return this.value + ' ' + this.unit.toString();
}


module.exports = UnitValue;
