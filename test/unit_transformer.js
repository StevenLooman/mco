var mco = require('..');


module.exports = {
    test_UnitTransformer_apply_MultiplyOperation: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.Length, 'm');
        var feet = new mco.BaseUnit(mco.Quantity.Length, 'ft');
        var metreToFeet = new mco.UnitTransformer(
            metre, feet, [ new mco.MultiplyOperation(3.2808399) ]
        );
        var lengthMetre = new mco.UnitValue(10, metre);

        var lengthFeet = metreToFeet.apply(lengthMetre);
        assert.eql(32.808399, lengthFeet.getValue());
        assert.eql('ft', lengthFeet.getUnit().getSymbol());
    },

    test_UnitTransformer_apply_AddOperation: function(beforeExit, assert) {
        var kelvin = new mco.BaseUnit(mco.Quantity.Temperature, 'K');
        var celcius = new mco.BaseUnit(mco.Quantity.Temperature, '°C');
        var kelvinToCelcius = new mco.UnitTransformer(
            kelvin, celcius, [ new mco.AddOperation(-273.15) ]
        );
        var temperatureKelvin = new mco.UnitValue(273.15, kelvin);

        var temperatureCelcius = kelvinToCelcius.apply(temperatureKelvin);
        assert.eql(0, temperatureCelcius.getValue());
        assert.eql('°C', temperatureCelcius.getUnit().getSymbol());
    },

    test_UnitTransformer_inverse: function(beforeExit, assert) {
        var fahrenheit = new mco.BaseUnit(mco.Quantity.Temperature, '°F');
        var celcius = new mco.BaseUnit(mco.Quantity.Temperature, '°C');
        var fahrenheitToCelcius = new mco.UnitTransformer(
            fahrenheit, celcius, [ new mco.AddOperation(-32), new mco.MultiplyOperation(5/9) ]
        );
        var temperatureFahrenheit = new mco.UnitValue(5, fahrenheit);
        var temperatureCelcius = fahrenheitToCelcius.apply(temperatureFahrenheit);
        assert.equal(-15, temperatureCelcius.getValue()); // ensure -15 °C
        assert.eql(celcius, temperatureCelcius.getUnit());

        var celciusToFahrenheit = fahrenheitToCelcius.inverse();
        var result = celciusToFahrenheit.apply(temperatureCelcius);
        assert.eql(temperatureFahrenheit.getUnit(), result.getUnit());
        var valueDifference = Math.abs(temperatureFahrenheit.getValue() - result.getValue()); // account for rounding errors
        assert.equal(valueDifference < 1e-10, true);
    },

};
