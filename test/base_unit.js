var mco = require('..');


module.exports = {
    test_BaseUnit_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');

        assert.equal('[m]', metre.toString());
    },

    test_BaseUnit_getSymbol: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');

        assert.equal('m', metre.getSymbol());
    },

    test_BaseUnit_multiply: function(beforeExit, assert) {
        var newton = new mco.BaseUnit('N');
        var metre = new mco.BaseUnit('m');

        var newtonMetre = newton.multiply(metre);

        assert.equal('N*m', newtonMetre.getSymbol());
    },

    test_BaseUnit_divide: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');
        var second = new mco.BaseUnit('s');

        var metrePerSecond = metre.divide(second);

        assert.equal('m/s', metrePerSecond.getSymbol());
    },

};
