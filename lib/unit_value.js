var Prefix = require('./prefix');
var BaseUnit = require('./base_unit');


function UnitValue(value, prefix, unit) {
    this.value = value;

    if (unit === undefined) {
        this.unit = prefix;
    } else {
        this.unit = unit.applyPrefix(prefix);
    }
}

UnitValue.autoSimplify = true;

UnitValue.prototype.getValue = function(prefix) {
    if (prefix === undefined) {
        return this.value;
    }

    if (!this.getUnit() instanceof BaseUnit) {
        throw new Error("Cannot convert to ");
    }

    var prefix1 = this.getUnit().getPrefix();

    var factor1 = prefix1.getFactor();
    var factor2 = prefix.getFactor();
    var factor = factor1 / factor2;

    return this.value * factor;
};

UnitValue.prototype.getPrefix = function() {
    return this.getUnit().getPrefix();
};

UnitValue.prototype.getUnit = function() {
    return this.unit;
};

UnitValue._ensureIsUnitValue = function(unitValue) {
    if (!(unitValue instanceof UnitValue)) {
        throw new Error("Instance not of type UnitValue");
    }
};

UnitValue._ensureIsSameUnit = function(unitValue1, unitValue2) {
    var unit1 = unitValue1.getUnit();
    var unit2 = unitValue2.getUnit();
    if (!unit1.equals(unit2)) {
        throw new Error("This unit is not equal to other unit");
    }
};

UnitValue._ensureIsSameUnitWithoutPrefix = function(unitValue1, unitValue2) {
    var unit1 = unitValue1.getUnit();
    var unit2 = unitValue2.getUnit();
    if (!unit1.equalsWithoutPrefix(unit2)) {
        throw new Error("This unit is not equal to other unit");
    }
};

UnitValue.prototype.add = function(other) {
    UnitValue._ensureIsUnitValue(other);

    if (this.getUnit() instanceof BaseUnit && other.getUnit() instanceof BaseUnit) {
        return UnitValue._addBaseUnit(this, other);
    }

    return UnitValue._add(this, other);
};

UnitValue._add = function(a, b) {
    UnitValue._ensureIsSameUnit(a, b);

    var newValue = a.getValue() + b.getValue();
    return new UnitValue(newValue, a.getUnit());
};

UnitValue._addBaseUnit = function(a, b) {
    UnitValue._ensureIsSameUnitWithoutPrefix(a, b);

    var factor1 = a.getUnit().getPrefix().getFactor();
    var factor2 = b.getUnit().getPrefix().getFactor();

    var value1 = a.getValue() * factor1;
    var value2 = b.getValue() * factor2;

    var value = value1 + value2;
    var factor = factor1 / factor2;

    return new UnitValue(value / factor, a.getUnit());
};

UnitValue.prototype.subtract = function(other) {
    UnitValue._ensureIsUnitValue(other);

    if (this.getUnit() instanceof BaseUnit && other.getUnit() instanceof BaseUnit) {
        return UnitValue._subtractBaseUnit(this, other);
    }

    return UnitValue._subtract(this, other);
};

UnitValue._subtract = function(a, b) {
    UnitValue._ensureIsSameUnit(a, b);

    var newValue = a.getValue() - b.getValue();
    return new UnitValue(newValue, a.getUnit());
};

UnitValue._subtractBaseUnit = function(a, b) {
    UnitValue._ensureIsSameUnit(a, b);

    var factor1 = a.getUnit().getPrefix().getFactor();
    var factor2 = b.getUnit().getPrefix().getFactor();

    var value1 = a.getValue() * factor1;
    var value2 = b.getValue() * factor2;

    var value = value1 - value2;
    var factor =  factor1 / factor2;

    return new UnitValue(value / factor, a.getUnit());
};

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
};

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
};

UnitValue.prototype.equals = function(other) {
    return  this.getUnit().equals(other.getUnit()) &&
            this.getPrefix().equals(other.getPrefix()) &&
            this.getValue() === other.getValue();
};

UnitValue.prototype.toString = function() {
    return this.getValue() + ' ' + this.getUnit().toString();
};

UnitValue.prototype.getSimplified = function() {
    return new UnitValue(this.getValue(), this.getUnit().getSimplified());
};

module.exports = UnitValue;
