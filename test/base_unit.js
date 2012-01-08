var mco = require('..');


module.exports = {
    test_BaseUnit_toString: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');

        assert.equal('[m]', metre.toString());
    },

    test_BaseUnit_getSymbol: function(beforeExit, assert) {
        var metre = new mco.BaseUnit('m');

        assert.equal('m', metre.getSymbol());
    }
};
