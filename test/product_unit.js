var mco = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('ProductUnit', function() {
    describe('#toString()',  function() {
        it('should return a string, encapsulated with brackets', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

            var metrePerSecond = metre.divide(second);
            assert.equal('[m/s]', metrePerSecond.toString());
        });
    });

    describe('#getSymbol()', function() {
        it ('should return the symbol resulting from the product', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');

            var metrePerSecond = metre.divide(second);
            assert.equal('m/s', metrePerSecond.getSymbol());
        });
    });

    describe('#divide()', function() {
        it ('should be able to divide units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);

            var metrePerSquareSecond = metrePerSecond.divide(second);
            assert.equal('m/s/s', metrePerSquareSecond.getSymbol());
            assert.equal('[m/s/s]', metrePerSquareSecond.toString());
        });
    });

    describe('#divide()', function() {
        it ('should be able to multiply units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var quadraticMetre = metre.multiply(metre);
            var cubicMetre = quadraticMetre.multiply(metre);

            assert.equal('m*m*m', cubicMetre.getSymbol());
            assert.equal('[m*m*m]', cubicMetre.toString());
        });
    });

    describe('#equals()', function() {
        it ('should return true for equal units', function() {
            var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second1 = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond1 = metre1.divide(second1);

            var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second2 = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond2 = metre2.divide(second2);

            assert.equal(metrePerSecond1.equals(metrePerSecond2), true);
        });

        it ('should return false for un-equal units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);

            var newton = new mco.BaseUnit(mco.Quantity.FORCE, 'N');
            var newtonMetre = newton.multiply(metre);

            assert.equal(metrePerSecond.equals(newtonMetre), false);
        });
    });

    describe('#getSimplified()', function() {
        it ('should return the same unit when it is not further simplifiable', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);

            var result = metrePerSecond.getSimplified();
            assert.equal(true, result.equals(metrePerSecond));
        });

        it ('should return the furthest simplifiable unit', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);
            var input = metre.divide(second).multiply(second);

            var result = input.getSimplified();
            assert.equal(true, result.equals(metre));
        });

        it ('should return the furthest simplifiable unit', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);
            var input = metre.divide(second).multiply(second).divide(second);

            var result = input.getSimplified();
            assert.equal(true, result.equals(metrePerSecond));
        });
    });
});
