var mco = require('..');


module.exports = {
    test_UnitTransformer_apply_MultiplyOperation: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');
        var feet = new mco.BaseUnit('ft');
        var metreToFeet = new mco.UnitTransformer(
            metre, feet, [ new mco.MultiplyOperation(3.2808399) ]
        );
        var lengthMetre = new mco.UnitValue(10, metre);

        var lengthFeet = metreToFeet.apply(lengthMetre);
        assert.eql(32.808399, lengthFeet.getValue());
        assert.eql('ft', lengthFeet.getUnit().getSymbol());
    },

    test_UnitTransformer_apply_AddOperation: function(beforeExit, assert) {
        var kelvin = new mco.BaseUnit('K');
        var celcius = new mco.BaseUnit('°C');
        var kelvinToCelcius = new mco.UnitTransformer(
            kelvin, celcius, [ new mco.AddOperation(-273.15) ]
        );
        var temperatureKelvin = new mco.UnitValue(273.15, kelvin);

        var temperatureCelcius = kelvinToCelcius.apply(temperatureKelvin);
        assert.eql(0, temperatureCelcius.getValue());
        assert.eql('°C', temperatureCelcius.getUnit().getSymbol());
    },
};