var mco = require('..');


module.exports = {
    test_UnitTransformer_apply: function(beforeExit, assert) {
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
};
