var mco = require('..');


module.exports = {
    test_AlternateUnit_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

        assert.equal('[c]', alt.toString());
    },

    test_AlternateUnit_getQuantity: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

        assert.equal(mco.Quantity.LENGTH, alt.getQuantity());
    },

    test_AlternateUnit_getSymbol: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

        assert.equal('c', alt.getSymbol());
    },

    test_AlternateUnit_equals_AlternateUnit: function(beforeExit, assert) {
        var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var alt1 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre1);
        var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var alt2 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre2);

        assert.equal(true, alt1.equals(alt2));
    },

    test_AlternateUnit_getSimplified: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

        assert.equal(true, alt.equals(alt.getSimplified()));
    },

};
