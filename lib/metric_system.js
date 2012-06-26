var Quantity = require('./quantity');
var BaseUnit = require('./base_unit');
var AlternateUnit = require('./alternate_unit');


var ONE = new BaseUnit(Quantity.DIMENSIONLESS, '');
var MetricSystem = { };

// base units
MetricSystem.AMPERE = new BaseUnit(Quantity.ELECTRIC_CURRENT, 'A');
MetricSystem.CANDELA = new BaseUnit(Quantity.LUMINOUS_INTENSITY, 'cd');
MetricSystem.KELVIN = new BaseUnit(Quantity.TEMPERATURE, 'K');
MetricSystem.KILOGRAM = new BaseUnit(Quantity.MASS, 'kg');
MetricSystem.METRE = new BaseUnit(Quantity.LENGTH, 'm');
MetricSystem.MOLE = new BaseUnit(Quantity.AMOUNT_OF_SUBSTANCE, 'mol');
MetricSystem.SECOND = new BaseUnit(Quantity.TIME, 's');

// derived alternate units
MetricSystem.AMPERE_TURN = new AlternateUnit(Quantity.MAGNETOMOTIVE_FORCE, 'At', MetricSystem.AMPERE);
//MetricSystem.GRAM = MetricSystem.KILOGRAM.divide(1000); // XXX: TODO: use PrefixedUnit
MetricSystem.RADIAN = new AlternateUnit(Quantity.ANGLE, 'rad', ONE);
MetricSystem.STERADIAN = new AlternateUnit(Quantity.SOLID_ANGLE, 'sr', ONE);
MetricSystem.BIT = new AlternateUnit(Quantity.DATA_AMOUNT, 'bit', ONE);
MetricSystem.HERTZ = new AlternateUnit(Quantity.FREQUENCY, 'Hz', ONE);
MetricSystem.NEWTON = new AlternateUnit(Quantity.FORCE, 'N', MetricSystem.METRE.multiply(MetricSystem.KILOGRAM).divide(MetricSystem.SECOND).divide(MetricSystem.SECOND));
MetricSystem.PASCAL = new AlternateUnit(Quantity.PRESSURE, 'Pa', MetricSystem.NEWTON.divide(MetricSystem.METRE).divide(MetricSystem.METRE));
MetricSystem.JOULE = new AlternateUnit(Quantity.ENERGY, 'J', MetricSystem.NEWTON.multiply(MetricSystem.METRE));
MetricSystem.WATT = new AlternateUnit(Quantity.POWER, 'W', MetricSystem.JOULE.divide(MetricSystem.SECOND));
MetricSystem.COULOMB = new AlternateUnit(Quantity.ELECTRIC_CHARGE, 'C', MetricSystem.SECOND.multiply(MetricSystem.AMPERE));
MetricSystem.VOLT = new AlternateUnit(Quantity.ELECTRIC_POTENTIAL, 'V', MetricSystem.WATT.divide(MetricSystem.AMPERE));
MetricSystem.FARAD = new AlternateUnit(Quantity.ELECTRIC_CAPACITANCE, 'F', MetricSystem.COULOMB.divide(MetricSystem.VOLT));
MetricSystem.OHM = new AlternateUnit(Quantity.ELECTRIC_RESISTANCE, 'Ω', MetricSystem.VOLT.divide(MetricSystem.AMPERE));
MetricSystem.SIEMENS = new AlternateUnit(Quantity.ELECTRIC_CONDUCTANCE, 'S', MetricSystem.AMPERE.divide(MetricSystem.VOLT));
MetricSystem.WEBER = new AlternateUnit(Quantity.MAGNETIC_FLUX, 'Wb', MetricSystem.VOLT.multiply(MetricSystem.SECOND));
MetricSystem.TESLA = new AlternateUnit(Quantity.MAGNETIC_FLUX_DENSITY, 'T', MetricSystem.WEBER.divide(MetricSystem.METRE).divide(MetricSystem.METRE));
MetricSystem.HENRY = new AlternateUnit(Quantity.ELECTRIC_INDUCTANCE, 'H', MetricSystem.WEBER.divide(MetricSystem.AMPERE));
MetricSystem.CELSIUS = new BaseUnit(Quantity.TEMPERATURE, '°C');
MetricSystem.LUMEN = new AlternateUnit(Quantity.LUMINOUS_FLUX, 'lm', MetricSystem.CANDELA.multiply(MetricSystem.STERADIAN));
MetricSystem.LUX = new BaseUnit(Quantity.ILLUMINANCE, 'lx', MetricSystem.LUMEN.divide(MetricSystem.METRE).divide(MetricSystem.METRE));
MetricSystem.BECQUEREL = new BaseUnit(Quantity.RADIOACTIVE_ACTIVITY, 'Bq', ONE.divide(MetricSystem.SECOND));
MetricSystem.GRAY = new BaseUnit(Quantity.RADIATION_DOSE_ABSORBED, 'Gy', MetricSystem.JOULE.divide(MetricSystem.KILOGRAM));
MetricSystem.SIEVERT = new BaseUnit(Quantity.RADIATION_DOSE_EFFECTIVE, 'Sv', MetricSystem.JOULE.divide(MetricSystem.KILOGRAM));
MetricSystem.KATAL = new BaseUnit(Quantity.CATALYTIC_ACTIVITY, 'kat', MetricSystem.MOLE.divide(MetricSystem.SECOND));

// derived product units
MetricSystem.METRES_PER_SECOND = MetricSystem.METRE.divide(MetricSystem.SECOND);
MetricSystem.METRES_PER_SQUARE_SECOND = MetricSystem.METRE.divide(MetricSystem.SECOND).divide(MetricSystem.SECOND);
MetricSystem.SQUARE_METRE = MetricSystem.METRE.multiply(MetricSystem.METRE);
MetricSystem.CUBIC_METRE = MetricSystem.METRE.multiply(MetricSystem.METRE).multiply(MetricSystem.METRE);

module.exports = MetricSystem;
