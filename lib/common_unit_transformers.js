var UnitTransformer = require('./unit_transformer');
var AddOperation = require('./add_operation');
var MultiplyOperation = require('./multiply_operation');
var Quantity = require('./quantity');
var BaseUnit = require('./base_unit');

UnitTransformer.getTransformer = function(fromUnit, toUnit) {
    for (var i = 0; i < UnitTransformer.CommonTransformers.length; ++i) {
        var transformer = UnitTransformer.CommonTransformers[i];
        if (transformer.fromUnit.equals(fromUnit) && transformer.toUnit.equals(toUnit)) {
            return transformer;
        }

        transformer = transformer.inverse();
        if (transformer.fromUnit.equals(fromUnit) && transformer.toUnit.equals(toUnit)) {
            return transformer;
        }
    }
};

UnitTransformer.transform = function(unitValue, toUnit) {
    var unitTransformer = UnitTransformer.getTransformer(unitValue.getUnit(), toUnit);
    if (unitTransformer) {
        return unitTransformer.apply(unitValue);
    }

    return null;
};

UnitTransformer.CommonTransformers = [
    // Length
    new UnitTransformer(
        new BaseUnit(Quantity.LENGTH, 'ft'),
        new BaseUnit(Quantity.LENGTH, 'm'),
        [ new MultiplyOperation(0.3048) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.LENGTH, 'ft'),
        new BaseUnit(Quantity.LENGTH, 'mile'), // land mile
        [ new MultiplyOperation(5280) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.LENGTH, 'm'),
        new BaseUnit(Quantity.LENGTH, 'yd'),
        [ new MultiplyOperation(0.9144) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.LENGTH, 'ft'),
        new BaseUnit(Quantity.LENGTH, 'in'),
        [ new MultiplyOperation(12) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.LENGTH, 'yd'),
        new BaseUnit(Quantity.LENGTH, 'in'),
        [ new MultiplyOperation(36) ]
    ),

    // Temperature
    new UnitTransformer(
        new BaseUnit(Quantity.TEMPERATURE, 'K'),
        new BaseUnit(Quantity.TEMPERATURE, '°C'),
        [ new AddOperation(-273.15) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.TEMPERATURE, 'K'),
        new BaseUnit(Quantity.TEMPERATURE, '°F'),
        [ new MultiplyOperation(9/5), new AddOperation(-459.67) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.TEMPERATURE, '°F'),
        new BaseUnit(Quantity.TEMPERATURE, '°C'),
        [ new AddOperation(-32), new MultiplyOperation(5/9) ]
    ),

    // Time
    new UnitTransformer(
        new BaseUnit(Quantity.TIME, 'min'),
        new BaseUnit(Quantity.TIME, 's'),
        [ new MultiplyOperation(60) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.TIME, 'h'),
        new BaseUnit(Quantity.TIME, 's'),
        [ new MultiplyOperation(60 * 60) ]
    ),
    new UnitTransformer(
        new BaseUnit(Quantity.TIME, 'h'),
        new BaseUnit(Quantity.TIME, 'min'),
        [ new MultiplyOperation(60) ]
    )
];
