var mco = require('..');


module.exports = {
    test_BaseUnit_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        assert.equal('[m]', metre.toString());
    },

    test_BaseUnit_getQuantity: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        assert.equal(mco.Quantity.LENGTH, metre.getQuantity());
    },

    test_BaseUnit_getSymbol: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        assert.equal('m', metre.getSymbol());
    },

    test_BaseUnit_multiply: function(beforeExit, assert) {
        var newton = new mco.BaseUnit(mco.Quantity.FORCE, 'N');
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        var newtonMetre = newton.multiply(metre);

        assert.equal('N*m', newtonMetre.getSymbol());
    },

    test_BaseUnit_divide: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

        var metrePerSecond = metre.divide(second);

        assert.equal('m/s', metrePerSecond.getSymbol());
    },

    test_BaseUnit_equals: function(beforeExit, assert) {
        var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        assert.equal(metre1.equals(metre2), true);
    },

    test_BaseUnit_not_equals: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

        assert.equal(metre.equals(second), false);
    },

    test_BaseUnit_getSimplified: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        assert.equal(true, metre.equals(metre.getSimplified()));
    },

};
