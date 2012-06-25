var Prefix = require('./prefix');


function UnitValue(value, prefix, unit) {
    if (arguments[0] == undefined || arguments[1] == undefined) {
        throw new Error("Invalid arguments");
    }

    if (arguments.length == 2) {
        this.value = arguments[0];
        this.unit = arguments[1];
    } else if (arguments.length == 3) {
        this.value = arguments[0];
        prefix = arguments[1];
        unit = arguments[2];
        this.unit = unit.applyPrefix(prefix);
    }
}

UnitValue.autoSimplify = true;

UnitValue.prototype.getValue = function() {
    return this.value;
}

UnitValue.prototype.getUnit = function() {
    return this.unit;
}

UnitValue._ensureIsUnitValue = function(unitValue) {
    if (!(unitValue instanceof UnitValue)) {
        throw new Error("Instance not of type UnitValue");
    }
}

UnitValue._ensureIsSameUnit = function(unitValue1, unitValue2) {
    var unit1 = unitValue1.getUnit();
    var unit2 = unitValue2.getUnit();
    if (!unit1.equals(unit2)) {
        throw new Error("This unit is not equal to other unit");
    }
}

UnitValue.prototype.add = function(other) {
    UnitValue._ensureIsUnitValue(other);
    UnitValue._ensureIsSameUnit(this, other);

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
