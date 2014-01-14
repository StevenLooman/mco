var mco = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('StringSerializer', function() {
    describe('#registerUnit()', function() {
        it('should be able to register a valid BaseUnit', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var uv = new mco.UnitValue(25, metre);

            var ss = new mco.StringSerializer();
            ss.registerUnit(metre);
        });
    });

    describe('#parseUnit()',  function() {
        it('should be able to parse a registered Unit', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var ss = new mco.StringSerializer();
            ss.registerUnit(metre);

            var r = ss.parseUnit('[m]');

            assert.deepEqual(r, metre);
        });
    });

    describe('#serialize()',  function() {
        it('should be able to serialize a UnitValue to a string', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var uv = new mco.UnitValue(25, metre);
            var ss = new mco.StringSerializer();

            var str = ss.serialize(uv);

            assert.equal(str, "25 [m]");
        });
    });

    describe('#deserialize()',  function() {
        it('should be able to deserialize a string to a UnitValue', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var uv = new mco.UnitValue(25, metre);

            var ss = new mco.StringSerializer();
            ss.registerUnit(metre);
            var r = ss.deserialize('25 [m]');

            assert.deepEqual(r, uv);
        });
    });
});
