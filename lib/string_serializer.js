var UnitValue = require('./unit_value');


function StringSerializer() {
    this.registeredUnits = {};
}


StringSerializer.prototype.serialize = function(unitValue) {
    return unitValue.toString();
};

StringSerializer.prototype.deserialize = function(str) {
    this._ensureParsable(str);
    var elements = str.split(' ');
    var value = this._parseValue(elements[0]);
    var unit = this.parseUnit(elements[1]);

    return new UnitValue(value, unit);
};

StringSerializer.prototype._ensureParsable = function(str) {
    var elements = str.split(' ');
    if (elements.length !== 2) {
        throw new Error("Unparsable unit value");
    }
};

StringSerializer.prototype._parseValue = function(str) {
    return parseFloat(str, 10);
};

StringSerializer.prototype.parseUnit = function(str) {
    if (str[0] !== '[') {
        str = '[' + str + ']';
    }

    var unit = this.registeredUnits[str];
    if (!unit) {
        throw new Error("Unknown unit: " + str);
    }

    return unit;
};


StringSerializer.prototype.registerUnit = function(unit) {
    var str = unit.toString();
    this.registeredUnits[str] = unit;
};

StringSerializer.prototype.registerSystem = function(system) {
    var key;
    for (key in system) {
        if (system.hasOwnProperty(key)) {
            var unit = system[key];
            this.registerUnit(unit);
        }
    }
};


module.exports = StringSerializer;
