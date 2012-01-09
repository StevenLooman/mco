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

UnitValue.prototype._ensureSameUnit = function(other) {
    if (!(other instanceof UnitValue)) {
        throw "Other not of type UnitValue";
    }

    var thisUnit = this.unit;
    var otherUnit = other.unit;
    if (thisUnit !== otherUnit) {
        throw "This unit is not equal to other unit";
    }
}

UnitValue.prototype.add = function(other) {
    this._ensureSameUnit(other);

    var newValue = this.getValue() + other.getValue();
    return new UnitValue(newValue, this.getUnit());
}

UnitValue.prototype.subtract = function(other) {
    this._ensureSameUnit(other);

    var newValue = this.getValue() - other.getValue();
    return new UnitValue(newValue, this.getUnit());
}

UnitValue.prototype.toString = function() {
    return this.value + ' ' + this.unit.toString();
}


module.exports = UnitValue;
