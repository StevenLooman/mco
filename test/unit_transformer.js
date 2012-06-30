var mco = require('..');
var assert = require('assert');

describe('UnitTransformer', function() {
    describe('#apply()',  function() {
        it('should be able to apply a MultiplyOperation', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var feet = new mco.BaseUnit(mco.Quantity.LENGTH, 'ft');
            var metreToFeet = new mco.UnitTransformer(
                metre, feet, [ new mco.MultiplyOperation(3.2808399) ]
            );
            var lengthMetre = new mco.UnitValue(10, metre);

            var lengthFeet = metreToFeet.apply(lengthMetre);
            assert.equal(32.808399, lengthFeet.getValue());
            assert.equal('ft', lengthFeet.getUnit().getSymbol());
        });

        it('should be able to apply a AddOperation', function() {
            var kelvin = new mco.BaseUnit(mco.Quantity.TEMPERATURE, 'K');
            var celcius = new mco.BaseUnit(mco.Quantity.TEMPERATURE, '°C');
            var kelvinToCelcius = new mco.UnitTransformer(
                kelvin, celcius, [ new mco.AddOperation(-273.15) ]
            );
            var temperatureKelvin = new mco.UnitValue(273.15, kelvin);

            var temperatureCelcius = kelvinToCelcius.apply(temperatureKelvin);
            assert.equal(0, temperatureCelcius.getValue());
            assert.equal('°C', temperatureCelcius.getUnit().getSymbol());
        });
    });

    describe('#inverse()', function() {
        it('should give a UnitTransformer which transforms the other way', function() {
            var fahrenheit = new mco.BaseUnit(mco.Quantity.TEMPERATURE, '°F');
            var celcius = new mco.BaseUnit(mco.Quantity.TEMPERATURE, '°C');
            var fahrenheitToCelcius = new mco.UnitTransformer(
                fahrenheit, celcius, [ new mco.AddOperation(-32), new mco.MultiplyOperation(5/9) ]
            );
            var temperatureFahrenheit = new mco.UnitValue(5, fahrenheit);
            var temperatureCelcius = fahrenheitToCelcius.apply(temperatureFahrenheit);
            assert.equal(-15, temperatureCelcius.getValue()); // ensure -15 °C
            assert.deepEqual(celcius, temperatureCelcius.getUnit());

            var celciusToFahrenheit = fahrenheitToCelcius.inverse();
            var result = celciusToFahrenheit.apply(temperatureCelcius);
            var valueDifference = Math.abs(temperatureFahrenheit.getValue() - result.getValue()); // account for rounding errors
            assert.equal(temperatureFahrenheit.getUnit(), result.getUnit());
            assert.equal(valueDifference < 1e-10, true);
        });
    });
});
