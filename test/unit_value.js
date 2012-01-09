var mco = require('..');


module.exports = {
    test_UnitValue_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');
        var unitValue = new mco.UnitValue(10, metre);

        assert.eql('10 [m]', unitValue.toString());
    },

    test_UnitValue_add: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(5, metre);

        var result = unitValue1.add(unitValue2);

        assert.equal(15, result.getValue(metre));
        assert.equal(result.getUnit(), metre);
    },

    test_UnitValue_subtract: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(5, metre);

        var result = unitValue1.subtract(unitValue2);

        assert.equal(5, result.getValue(metre));
        assert.equal(result.getUnit(), metre);
    }
};
