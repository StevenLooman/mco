var mco = require('..');


module.exports = {
    test_JsonSerializer_serialize_BaseUnit: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');

        var output = mco.JsonSerializer.serialize(metre);
        assert.equal(output, '{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}');
    },

    test_JsonSerializer_serialize_ProductUnit: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var metrePerSecond = metre.divide(second);

        var output = mco.JsonSerializer.serialize(metrePerSecond);
        assert.equal(output, '{"elements":[["",{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}],["/",{"quantity":"Time","prefix":{"symbol":"","name":"","factor":1},"symbol":"s"}]]}');
    },

    test_JsonSerializer_serialize_UnitValue: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var length = new mco.UnitValue(10, metre);

        var output = mco.JsonSerializer.serialize(length);
        assert.equal(output, '{"value":10,"unit":{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}}');
    },

    test_JsonSerializer_serialize_Prefix: function(beforeExit, assert) {
        var prefix = mco.Prefix.KILO;

        var output = mco.JsonSerializer.serialize(prefix);
        assert.equal(output, '{"symbol":"k","name":"kilo","factor":1000}');
    },

    test_JsonSerializer_readBaseUnit: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var input = '{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}';

        var o = JSON.parse(input);
        var output = mco.JsonSerializer.readBaseUnit(o);
        assert.eql(metre, output);
    },

    test_JsonSerializer_readProductUnit: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
        var metrePerSecond = metre.divide(second);
        var input = '{"elements":[["",{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}],["/",{"quantity":"Time","prefix":{"symbol":"","name":"","factor":1},"symbol":"s"}]]}';

        var o = JSON.parse(input);
        var output = mco.JsonSerializer.readProductUnit(o);
        assert.eql(metrePerSecond, output);
    },

    test_JsonSerializer_readUnitValue: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var length = new mco.UnitValue(10, metre);
        var input = '{"value":10,"unit":{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}}';

        var o = JSON.parse(input);
        var output = mco.JsonSerializer.readUnitValue(o);
        assert.eql(length, output);
    },

    test_JsonSerializer_readPrefix: function(beforeExit, assert) {
        var prefix = mco.Prefix.KILO;
        var input = '{"symbol":"k","name":"kilo","factor":1000}';

        var o = JSON.parse(input);
        var output = mco.JsonSerializer.readPrefix(o);
        assert.eql(prefix, output);
    },

    test_JsonSerializer_deserialize: function(beforeExit, assert) {
        var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
        var length = new mco.UnitValue(10, metre);
        var input = '{"value":10,"unit":{"quantity":"Length","prefix":{"symbol":"","name":"","factor":1},"symbol":"m"}}';

        var output = mco.JsonSerializer.deserialize(input);
        assert.eql(length, output);
    },
};
