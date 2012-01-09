var Quantity = require('./quantity');
var UnitTransformer = require('./unit_transformer');
var BaseUnit = require('./base_unit');
var ProductUnit = require('./product_unit');
var AddOperation = require('./add_operation');
var MultiplyOperation = require('./multiply_operation');

UnitTransformer.getTransformer = function(fromUnit, toUnit) {
    for (var i = 0; i < UnitTransformer.CommonTransformers.length; ++i) {
        if (transformer.fromUnit.equals(fromUnit) && transformer.toUnit.equals(toUnit)) {
            return transformer;
        }
    }
}

UnitTransformer.CommonTransformers = [
    // Length
    new UnitTransformer(
        new BaseUnit(Quantity.Length, 'm'),
        new BaseUnit(Quantity.Length, 'ft'),
        [ new MultiplyOperation(3.2808399) ]
    ),

    // Temperature
    new UnitTransformer(
        new BaseUnit(Quantity.Length, 'K'),
        new BaseUnit(Quantity.Length, '°C'),
        [ new AddOperation(-273.15) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.Length, '°F'),
        new BaseUnit(Quantity.Length, '°C'),
        [ new AddOperation(-32), new MultiplyOperation(5/9) ]
    ),
];
