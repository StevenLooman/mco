var mco = require('..');


module.exports = {
    test_ProductUnit_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

        var metrePerSecond = metre.divide(second);
        assert.equal('[m/s]', metrePerSecond.toString());
    },

    test_ProductUnit_getSymbol: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

        var metrePerSecond = metre.divide(second);
        assert.equal('m/s', metrePerSecond.getSymbol());
    },

    test_ProductUnit_divide: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var metrePerSecond = metre.divide(second);

        var metrePerSquareSecond = metrePerSecond.divide(second);
        assert.equal('m/s/s', metrePerSquareSecond.getSymbol());
        assert.equal('[m/s/s]', metrePerSquareSecond.toString());
    },

    test_ProductUnit_divide: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var quadraticMetre = metre.multiply(metre);
        var cubicMetre = quadraticMetre.multiply(metre);

        assert.equal('m*m*m', cubicMetre.getSymbol());
        assert.equal('[m*m*m]', cubicMetre.toString());
    },

    test_ProductUnit_equals: function(beforeExit, assert) {
        var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second1 = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var metrePerSecond1 = metre1.divide(second1);

        var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second2 = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var metrePerSecond2 = metre2.divide(second2);

        assert.equal(metrePerSecond1.equals(metrePerSecond2), true);
    },

    test_ProductUnit_not_equals: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var metrePerSecond = metre.divide(second);

        var newton = new mco.BaseUnit(mco.Quantity.FORCE, 'N');
        var newtonMetre = newton.multiply(metre);

        assert.equal(metrePerSecond.equals(newtonMetre), false);
    },

};
