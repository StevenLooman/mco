var mco = require('..');
var assert = require('assert');

describe('Prefix', function() {
    describe('#toString()',  function() {
        it('should return a string', function() {
            var kilo = mco.Prefix.KILO;

            assert.equal('k', kilo.toString());
        });
    });

    describe('#getSymbol()',  function() {
        it('should return a string', function() {
            var kilo = mco.Prefix.KILO;

            assert.equal('k', kilo.getSymbol());
        });
    });

    describe('#getName()',  function() {
        it('should return a string', function() {
            var kilo = mco.Prefix.KILO;

            assert.equal('kilo', kilo.getName());
        });
    });

    describe('#getFactor()',  function() {
        it('should return a number', function() {
            var kilo = mco.Prefix.KILO;

            assert.equal(1e3, kilo.getFactor());
        });
    });

    describe('#transformFactor()',  function() {
        it('should return a number', function() {
            var kilo = mco.Prefix.KILO;
            var mega = mco.Prefix.MEGA;

            assert.equal(1e-3, kilo.transformFactor(mega));
        });
    });

    describe('#equals()', function() {
        it ('should return true for equal prefixes', function() {
            var kilo = mco.Prefix.KILO;

            assert.ok(kilo.equals(kilo));
        });

        it ('should return true for un-equal prefixes', function() {
            var kilo = mco.Prefix.KILO;
            var mega = mco.Prefix.MEGA;

            assert.ok(!kilo.equals(mega));
        });
    });

});

