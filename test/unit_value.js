var mco = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('UnitValue', function() {
    describe('#toString()',  function() {
        it('should return a string, containing the value and the unit encapsulated with brackets', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue = new mco.UnitValue(10, metre);

            assert.deepEqual('10 [m]', unitValue.toString());
        });
    });

    describe('#getValue()',  function() {
        it('should return the value', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue = new mco.UnitValue(10, metre);

            assert.deepEqual(10, unitValue.getValue());
        });

        it('should return the prefixed value, when the unit is prefixed', function() {
            var kilometre = new mco.BaseUnit(mco.Quantity.LENGTH, mco.Prefix.KILO, 'm');
            var unitValue = new mco.UnitValue(10, kilometre);

            assert.deepEqual(10, unitValue.getValue());
        });

        it('should return the value, when the unit is prefixed, but another prefix is asked', function() {
            var kilometre = new mco.BaseUnit(mco.Quantity.LENGTH, mco.Prefix.KILO, 'm');
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue = new mco.UnitValue(10, kilometre);

            var one = mco.Prefix.ONE;
            assert.deepEqual(10000, unitValue.getValue(one));
        });
    });

    describe('#add()', function() {
        it('should be able to add one UnitValue to another of the same unit and prefix', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(5, metre);

            var result = unitValue1.add(unitValue2);

            assert.equal(15, result.getValue());
            assert.equal(result.getUnit(), metre);
        });

        it('should be able to add one UnitValue to another of the same unit, different prefix', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var kilometre = metre.setPrefix(mco.Prefix.KILO);
            var unitValue1 = new mco.UnitValue(10, kilometre);
            var unitValue2 = new mco.UnitValue(5, metre);

            var result = unitValue1.add(unitValue2);

            assert.equal(10.005, result.getValue());
            assert.equal(result.getUnit(), kilometre);
        });
    });

    describe('#subtract()', function() {
        it('should be able to subtract one UnitValue from another of the same unit and prefix', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(5, metre);

            var result = unitValue1.subtract(unitValue2);

            assert.equal(5, result.getValue());
            assert.equal(result.getUnit(), metre);
        });
    });

    describe('#multiply()', function() {
        it('should be able to multiply one UnitValue with another', function() {
            var newton = new mco.BaseUnit(mco.Quantity.FORCE, 'N');
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue1 = new mco.UnitValue(10, newton);
            var unitValue2 = new mco.UnitValue(5, metre);

            var newtonMetre = newton.multiply(metre);
            var result = unitValue1.multiply(unitValue2);

            assert.equal(50, result.getValue());
            assert.deepEqual(newtonMetre, result.getUnit());
        });
    });

    describe('#divide()', function() {
        it('should be able to divide one UnitValue by another', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(5, second);

            var metrePerSecond = metre.divide(second);
            var result = unitValue1.divide(unitValue2);

            assert.equal(2, result.getValue());
            assert.deepEqual(metrePerSecond, result.getUnit());
        });
    });

    describe('#equals()', function() {
        it ('should return true for equal units', function() {
            var metre1 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var metre2 = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var unitValue1 = new mco.UnitValue(10, metre1);
            var unitValue2 = new mco.UnitValue(10, metre2);

            assert.ok(unitValue1.equals(unitValue2));
        });

        it ('should return false for equal units', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(10, second);

            assert.ok(!unitValue1.equals(unitValue2));
        });
    });

    describe('#getSimplified()', function() {
        it('should be able to simplify division and multiplication', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(10, second);

            var result = unitValue1.divide(unitValue2).multiply(unitValue2);

            assert.ok(result.equals(result.getSimplified()));
        });

        it('should be able to simplify multiplication and division', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(10, second);

            var result = unitValue1.multiply(unitValue2).divide(unitValue2);

            assert.ok(result.equals(result.getSimplified()));
        });

        it('should not automatically simplify when auto-simplification is off', function() {
            var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
            var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
            var unitValue1 = new mco.UnitValue(10, metre);
            var unitValue2 = new mco.UnitValue(10, second);

            mco.UnitValue.autoSimplify = false;
            var result = unitValue1.divide(unitValue2).multiply(unitValue2);

            assert.ok(!result.equals(result.getSimplified()));
            mco.UnitValue.autoSimplify = true;
        });
    });
});
