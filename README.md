MCO
===

The software of the Mars Climate Orbiter (MCO) performed an incorrect calculation due to a conversion error between force in pounds and newton. Resulting, an erroneous trajectory was computed using this incorrect data and communication with the MCO was lost.

The MCO library provides a means to correctly keep track of measured data and conversion between data types without worrying about using different types/units.

MCO is loosely based on [JSR-275][1]. Concepts have been re-used from this library.

[1]: http://www.jcp.org/en/jsr/detail?id=275

Travis-CI
=========
Continuous integration using Travis-CI. Build is: [![Build Status](https://secure.travis-ci.org/StevenLooman/mco.png)](http://travis-ci.org/StevenLooman/mco)

Example usage
=============
The following snippet shows hot to create a unit/value of 10 [m], and divide it by 5 [s]. The result is 2 [m/s]:

```
    var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
    var second = new mco.BaseUnit(mco.Quantity.TIME, 's');
    var unitValue1 = new mco.UnitValue(10, metre);
    var unitValue2 = new mco.UnitValue(5, second);

    var metrePerSecond = metre.divide(second);
    var result = unitValue1.divide(unitValue2);
```

Another snippet showing how to create a unit/value of 10 [km]:

```
    var kilometre = new mco.BaseUnit(mco.Quantity.LENGTH, mco.Prefix.KILO, 'm');
    var unitValue = new mco.UnitValue(10, kilometre);
```

Values of the same unit, but having another prefix are added correctly. The following snippet shows how to add 5 [m] to 10 [km], resulting in 10.005 [km]:

```
    var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
    var kilometre = metre.setPrefix(mco.Prefix.KILO);
    var unitValue1 = new mco.UnitValue(10, kilometre);
    var unitValue2 = new mco.UnitValue(5, metre);

    var result = unitValue1.add(unitValue2);
```

Common transformers are already added to mco. For example, we can easily convert 100 [m] to [ft]:

```
    var metre = new mco.BaseUnit(mco.Quantity.LENGTH, 'm');
    var feet = new mco.BaseUnit(mco.Quantity.LENGTH, 'ft');
    var lengthMetre = new mco.UnitValue(100, metre);

    var result = mco.UnitTransformer.transform(lengthMetre, feet);
```

More examples can be found in the test/ directory.
