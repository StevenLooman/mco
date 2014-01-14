var mco = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('AlternateUnit', function() {
    describe('#toString()',  function() {
        it('should return a string, encapsulated with brackets', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

            assert.equal('[c]', alt.toString());
        });
    });

    describe('#getQuantity()', function() {
        it('should return the proper quantity', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

            assert.equal(mco.Quantity.LENGTH, alt.getQuantity());
        });
    });

    describe('#getSymbol()', function() {
        it ('should return the symbol given to the constructor', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

            assert.equal('c', alt.getSymbol());
        });
    });

    describe('#equals()', function() {
        it ('should return true for equal units', function() {
            var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt1 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre1);
            var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt2 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre2);

            assert.equal(true, alt1.equals(alt2));
        });

        it ('should return false for un-equal units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt1 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'am', metre);
            var foot = new mco.BaseUnit(mco.Quantity.LENGTH, 'ft');
            var alt2 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'aft', foot);

            assert.equal(false, alt1.equals(alt2));
        });

//        it ('should return true when testing an AlternativeUnit against the same BaseUnit', function() {
//            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
//            var alt1 = new mco.AlternateUnit(mco.Quantity.LENGTH, 'm', metre);
//
//            assert.equal(true, metre.equals(alt1));
//        });
    });

    describe('#getSimplified()', function() {
        it ('should return the same unit when called on a AlternateUnit', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var alt = new mco.AlternateUnit(mco.Quantity.LENGTH, 'c', metre);

            assert.equal(true, alt.equals(alt.getSimplified()));
        });
    });
});
