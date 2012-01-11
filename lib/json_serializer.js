var BaseUnit = require('./base_unit');
var ProductUnit = require('./product_unit');
var UnitValue = require('./unit_value');


function JsonSerializer() {
}

JsonSerializer.serialize = function(o) {
    return JSON.stringify(o);
}

JsonSerializer.deserialize = function(str) {
    var json = JSON.parse(str);
    if (JsonSerializer.isUnitValue(json)) {
        return JsonSerializer.readUnitValue(json);
    } else if (JsonSerializer.isBaseUnit(json)) {
        return JsonSerializer.readBaseUnit(json);
    } else if (JsonSerializer.isProductUnit(json)) {
        return JsonSerializer.readProductUnit(json);
    }
}

JsonSerializer.isUnitValue = function(o) {
    return 'value' in o && 'unit' in o;
}

JsonSerializer.readUnitValue = function(o) {
    var value = o.value;
    var unit = o.unit;

    if (JsonSerializer.isBaseUnit(unit)) {
        unit = JsonSerializer.readBaseUnit(unit);
    } else if (JsonSerializer.isProductUnit(unit)) {
        unit = JsonSerializer.readProductUnit(unit);
    }

    return new UnitValue(value, unit);
}

JsonSerializer.isBaseUnit = function(o) {
    return 'symbol' in o && 'quantity' in o;
}

JsonSerializer.readBaseUnit = function(o) {
    return new BaseUnit(o.quantity, o.symbol);
}

JsonSerializer.isProductUnit = function(o) {
    return 'elements' in o;
}

JsonSerializer.readProductUnit = function(o) {
    var elements = [];

    function readChild(child) {
        var op = child[0];
        var baseUnit = JsonSerializer.readBaseUnit(child[1]);
        elements.push( [ op, baseUnit ] );
    }
    o.elements.forEach(readChild);

    return new ProductUnit(elements);
}

module.exports = JsonSerializer;
