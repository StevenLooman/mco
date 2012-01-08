var eyes = require('eyes');


function UnitValue(value, unit) {
    this.value = value;
    this.unit = unit;
}

UnitValue.prototype.toString = function() {
    return this.value + ' ' + this.unit.toString();
}


module.exports = UnitValue;
