var eyes = require('eyes');


function UnitValue(value, unit) {
    if (value == null || unit == null) {
        throw new Error("value or unit is null");
    }
    this.value = value;
    this.unit = unit;
}

UnitValue.autoSimplify = true;

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
    var unit1 = unitValue1.getUnit();
    var unit2 = unitValue2.getUnit();
    if (!unit1.equals(unit2)) {
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

    var unit1 = this.getUnit();
    var unit2 = other.getUnit();
    var unit = unit1.multiply(unit2);

    if (UnitValue.autoSimplify) {
        return new UnitValue(value, unit.getSimplified());
    }

    return new UnitValue(value, unit);
}

UnitValue.prototype.divide = function(other) {
    var value1 = this.getValue();
    var value2 = other.getValue();
    var value = value1 / value2;

    var unit1 = this.getUnit();
    var unit2 = other.getUnit();
    var unit = unit1.divide(unit2);

    if (UnitValue.autoSimplify) {
        return new UnitValue(value, unit.getSimplified());
    }

    return new UnitValue(value, unit);
}

UnitValue.prototype.equals = function(other) {
    if (!this.getUnit().equals(other.getUnit())) {
        return false;
    }

    if (this.getValue() !== other.getValue()) {
        return false;
    }

    return true;
}

UnitValue.prototype.toString = function() {
    return this.getValue() + ' ' + this.getUnit().toString();
}

UnitValue.prototype.getSimplified = function() {
    return new UnitValue(this.getValue(), this.getUnit().getSimplified());
}


module.exports = UnitValue;
