var mco = require('..');


module.exports = {
    test_UnitValue_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var unitValue = new mco.UnitValue(10, metre);

        assert.eql('10 [m]', unitValue.toString());
    },

    test_UnitValue_add: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(5, metre);

        var result = unitValue1.add(unitValue2);

        assert.equal(15, result.getValue(metre));
        assert.equal(result.getUnit(), metre);
    },

    test_UnitValue_subtract: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(5, metre);

        var result = unitValue1.subtract(unitValue2);

        assert.equal(5, result.getValue(metre));
        assert.equal(result.getUnit(), metre);
    },

    test_UnitValue_multiply: function(beforeExit, assert) {
        var newton = new mco.BaseUnit(mco.Quantity.FORCE, 'N');
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var unitValue1 = new mco.UnitValue(10, newton);
        var unitValue2 = new mco.UnitValue(5, metre);

        var newtonMetre = newton.multiply(metre);
        var result = unitValue1.multiply(unitValue2);

        assert.equal(50, result.getValue());
        assert.eql(newtonMetre, result.getUnit());
    },

    test_UnitValue_divide: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(5, second);

        var metrePerSecond = metre.divide(second);
        var result = unitValue1.divide(unitValue2);

        assert.equal(2, result.getValue());
        assert.eql(metrePerSecond, result.getUnit());
    },

    test_UnitValue_equals: function(beforeExit, assert) {
        var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var unitValue1 = new mco.UnitValue(10, metre1);
        var unitValue2 = new mco.UnitValue(10, metre2);

        assert.equal(true, unitValue1.equals(unitValue2));
    },

    test_UnitValue_not_equals: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(10, second);

        assert.equal(false, unitValue1.equals(unitValue2));
    },

    test_UnitValue_ensureSameUnit: function(beforeExit, assert) {
        var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var unitValue1 = new mco.UnitValue(10, metre1);
        var unitValue2 = new mco.UnitValue(5, metre2);

        var result = unitValue1.add(unitValue2);
    },

    test_UnitValue_getSimplified: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(10, second);

        var result = unitValue1.divide(unitValue2).multiply(unitValue2);

        assert.equal(true, result.equals(result.getSimplified()));
    },

    test_UnitValue_getSimplified_no_autoSimplify: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var unitValue1 = new mco.UnitValue(10, metre);
        var unitValue2 = new mco.UnitValue(10, second);

        mco.UnitValue.autoSimplify = false;
        var result = unitValue1.divide(unitValue2).multiply(unitValue2);

        assert.equal(false, result.equals(result.getSimplified()));
        mco.UnitValue.autoSimplify = true;
    },
};
