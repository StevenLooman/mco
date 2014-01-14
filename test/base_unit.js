var mco = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('BaseUnit', function() {
    describe('#toString()',  function() {
        it('should return a string, encapsulated with brackets', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            assert.equal('[m]', metre.toString());
        });
    });

    describe('#getQuantity()', function() {
        it('should return the proper quantity', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            assert.equal(mco.Quantity.LENGTH, metre.getQuantity());
        });
    });

    describe('#getSymbol()', function() {
        it ('should return the symbol given to the constructor', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            assert.equal('m', metre.getSymbol());
        });
    });

    describe('#multiply()', function() {
        it ('should be able to multiply units', function() {
            var newton = new mco.BaseUnit(mco.Quantity.FORCE, 'N');
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            var newtonMetre = newton.multiply(metre);

            it ('should return the multiplied-symbol for multiplied units', function() {
                assert.equal('N*m', newtonMetre.getSymbol());
            });
        });
    });

    describe('#divide()', function() {
        it ('should be able to divide units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

            var metrePerSecond = metre.divide(second);

            it ('should return the divided-symbol for multiplied units', function() {
                assert.equal('m/s', metrePerSecond.getSymbol());
            });
        });
    });

    describe('#equals()', function() {
        it ('should return true for equal units', function() {
            var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            assert.equal(true, metre1.equals(metre2));
        });

        it ('should return false for un-equal units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

            assert.equal(false, metre.equals(second));
        });
    });

    describe('#getSimplified()', function() {
        it ('should return the same unit when called on a BaseUnit', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            assert.equal(true, metre.equals(metre.getSimplified()));
        });
    });
});

