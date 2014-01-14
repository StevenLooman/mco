var mco = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('JsonSerializer', function() {
    describe('#serialize()',  function() {
        it('should serialize a BaseUnit to json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

            var output = mco.JsonSerializer.serialize(metre);
            assert.equal(output, '{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}');
        });

        it('should serialize a ProductUnit to json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);

            var output = mco.JsonSerializer.serialize(metrePerSecond);
            assert.equal(output, '{"elements":[["",{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}],["/",{"quantity":"Time","prefix":{"symbol":"","name":"","factor":1},"symbol":"s"}]]}');
        });

        it('should serialize a UnitValue to json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var length = new mco.UnitValue(10, metre);

            var output = mco.JsonSerializer.serialize(length);
            assert.equal(output, '{"value":10,"unit":{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}}');
        });

        it('should serialize a Prefix to json', function() {
            var prefix = mco.Prefix.KILO;

            var output = mco.JsonSerializer.serialize(prefix);
            assert.equal(output, '{"symbol":"k","name":"kilo","factor":1000}');
        });
    });

    describe('#readBaseUnit()',  function() {
        it('should de-serialize a BaseUnit from json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var input = '{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}';

            var o = JSON.parse(input);
            var output = mco.JsonSerializer.readBaseUnit(o);
            assert.deepEqual(metre, output);
        });
    });

    describe('#readProductUnit()',  function() {
        it('should de-serialize a ProductUnit from json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);
            var input = '{"elements":[["",{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}],["/",{"quantity":"Time","prefix":{"symbol":"","name":"","factor":1},"symbol":"s"}]]}';

            var o = JSON.parse(input);
            var output = mco.JsonSerializer.readProductUnit(o);
            assert.deepEqual(metrePerSecond, output);
        });
    });

    describe('#readUnitValue()',  function() {
        it('should de-serialize a ProductUnit from json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var length = new mco.UnitValue(10, metre);
            var input = '{"value":10,"unit":{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}}';

            var o = JSON.parse(input);
            var output = mco.JsonSerializer.readUnitValue(o);
            assert.deepEqual(length, output);
        });
    });

    describe('#readPrefix()',  function() {
        it('should de-serialize a Prefix from json', function() {
            var prefix = mco.Prefix.KILO;
            var input = '{"symbol":"k","name":"kilo","factor":1000}';

            var o = JSON.parse(input);
            var output = mco.JsonSerializer.readPrefix(o);
            assert.deepEqual(prefix, output);
        });
    });

    describe('#deserialize()',  function() {
        it('should de-serialize a BaseUnit from json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var input = '{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}';

            var output = mco.JsonSerializer.deserialize(input);
            assert.deepEqual(metre, output);
        });

        it('should de-serialize a ProductUnit from json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var metrePerSecond = metre.divide(second);
            var input = '{"elements":[["",{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}],["/",{"quantity":"Time","prefix":{"symbol":"","name":"","factor":1},"symbol":"s"}]]}';

            var output = mco.JsonSerializer.deserialize(input);
            assert.deepEqual(metrePerSecond, output);
        });

        it('should de-serialize a Prefix from json', function() {
            var kilo = mco.Prefix.KILO;
            var input = '{"symbol":"k","name":"kilo","factor":1000}';

            var output = mco.JsonSerializer.deserialize(input);
            assert.deepEqual(kilo, output);
        });

        it('should de-serialize a UnitValue from json', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var length = new mco.UnitValue(10, metre);
            var input = '{"value":10,"unit":{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}}';

            var output = mco.JsonSerializer.deserialize(input);
            assert.deepEqual(length, output);
        });
    });
});
