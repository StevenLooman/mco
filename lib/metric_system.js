var Quantity = require('./Quantity');
var BaseUnit = require('./base_unit');

var MetricSystem = { };

// base units
MetricSystem.AMPERE = new BaseUnit(Quantity.ELECTRIC_CURRENT, 'A');
MetricSystem.CANDELA = new BaseUnit(Quantity.LUMINOUS_INTENSITY, 'cd');
MetricSystem.KELVIN = new BaseUnit(Quantity.TEMPERATURE, 'K');
MetricSystem.KILOGRAM = new BaseUnit(Quantity.MASS, 'kg');
MetricSystem.METRE = new BaseUnit(Quantity.LENGTH, 'm');
MetricSystem.MOLE = new BaseUnit(Quantity.AMOUNT_OF_SUBSTANCE, 'mol');
MetricSystem.SECOND = new BaseUnit(Quantity.TIME, 's');


MetricSystem.AMPERE_TURN = new BaseUnit(Quantity.MAGNETOMOTIVE_FORCE, 'At');
//MetricSystem.GRAM = MetricSystem.KILOGRAM.divide(1000); // XXX: TODO: use PrefixedUnit
MetricSystem.RADIAN = new BaseUnit(Quantity.ANGLE, 'rad');
MetricSystem.STERADIAN = new BaseUnit(Quantity.SOLID_ANGLE, 'sr');
MetricSystem.BIT = new BaseUnit(Quantity.DATA_AMOUNT, 'bit');
MetricSystem.HERTZ = new BaseUnit(Quantity.FREQUENCY, 'Hz');
MetricSystem.NEWTON = new BaseUnit(Quantity.FORCE, 'N');
MetricSystem.PASCAL = new BaseUnit(Quantity.PRESSURE, 'Pa');
MetricSystem.JOULE = new BaseUnit(Quantity.ENERGY, 'J');
MetricSystem.WATT = new BaseUnit(Quantity.POWER, 'W');
MetricSystem.COULOMB = new BaseUnit(Quantity.ELECTRIC_CHARGE, 'C');
MetricSystem.VOLT = new BaseUnit(Quantity.ELECTRIC_POTENTIAL, 'V');
MetricSystem.FARAD = new BaseUnit(Quantity.ELECTRIC_CAPACITANCE, 'F');
MetricSystem.OHM = new BaseUnit(Quantity.ELECTRIC_RESISTANCE, 'Ω');
MetricSystem.SIEMENS = new BaseUnit(Quantity.ELECTRIC_CONDUCTANCE, 'S');
MetricSystem.WEBER = new BaseUnit(Quantity.MAGNETIC_FLUX, 'Wb');
MetricSystem.TESLA = new BaseUnit(Quantity.MAGNETIC_FLUX_DENSITY, 'T');
MetricSystem.HENRY = new BaseUnit(Quantity.ELECTRIC_INDUCTANCE, 'H');
MetricSystem.CELSIUS = new BaseUnit(Quantity.TEMPERATURE, '°C');
MetricSystem.LUMEN = new BaseUnit(Quantity.LUMINOUS_FLUX, 'lm');
MetricSystem.LUX = new BaseUnit(Quantity.ILLUMINANCE, 'lx');
MetricSystem.BECQUEREL = new BaseUnit(Quantity.RADIOACTIVE_ACTIVITY, 'Bq');
MetricSystem.GRAY = new BaseUnit(Quantity.RADIATION_DOSE_ABSORBED, 'Gy');
MetricSystem.SIEVERT = new BaseUnit(Quantity.RADIATION_DOSE_EFFECTIVE, 'Sv');
MetricSystem.KATAL = new BaseUnit(Quantity.CATALYTIC_ACTIVITY, 'kat');

MetricSystem.METRES_PER_SECOND = MetricSystem.METRE.divide(MetricSystem.SECOND);
MetricSystem.METRES_PER_SQUARE_SECOND = MetricSystem.METRE.divide(MetricSystem.SECOND).divide(MetricSystem.SECOND);;
MetricSystem.SQUARE_METRE = MetricSystem.METRE.multiply(MetricSystem.METRE);
MetricSystem.CUBIC_METRE = MetricSystem.METRE.multiply(MetricSystem.METRE).multiply(MetricSystem.METRE);

module.exports = MetricSystem;
