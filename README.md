MCO
===

The software of the Mars Climate Orbiter (MCO) performed an incorrect calculation due to a conversion error between force in pounds and newton. Resulting, an erroneous trajectory was computed using this incorrect data and communication with the MCO was lost.

The MCO library provides a means to correctly keep track of measured data and conversion between data types without worrying about using different types/units.

MCO is loosely based on [JSR-275][1]. Concepts have been re-used from this library.

[1]: http://www.jcp.org/en/jsr/detail?id=275

Travis-CI
=========
Continuous integration using Travis-CI. Build is: [![Build Status](https://secure.travis-ci.org/StevenLooman/mco.png)](http://travis-ci.org/StevenLooman/mco)
