var Quantity = require('./quantity');
var BaseUnit = require('./base_unit');
var AlternateUnit = require('./alternate_unit');
var MetricSystem = require('./metric_system');


var ONE = new BaseUnit(Quantity.DIMENSIONLESS, '');
var UsCustomarySystem = { };

// see http://en.wikipedia.org/wiki/US_customary_system

// base units
UsCustomarySystem.METER = new BaseUnit(Quantity.LENGTH, 'm');
UsCustomarySystem.FOOT = new BaseUnit(Quantity.LENGTH, 'ft');
UsCustomarySystem.FOOT_SURVEY = new BaseUnit(Quantity.LENGTH, '??');
UsCustomarySystem.YARD = new BaseUnit(Quantity.LENGTH, 'yd');
UsCustomarySystem.INCH = new BaseUnit(Quantity.LENGTH, 'in');
UsCustomarySystem.MILE = new BaseUnit(Quantity.LENGTH, 'mi');
UsCustomarySystem.NAUTICAL_MILE = new BaseUnit(Quantity.LENGTH, 'nmi');

UsCustomarySystem.POUND = new BaseUnit(Quantity.MASS, 'lb');
UsCustomarySystem.OUNCE = new BaseUnit(Quantity.MASS, 'oz');
UsCustomarySystem.TON = new BaseUnit(Quantity.MASS, 'ton');

UsCustomarySystem.RANKINE = new BaseUnit(Quantity.TEMPERATURE, 'R');
UsCustomarySystem.FAHRENHEIT = new BaseUnit(Quantity.TEMPERATURE, '°F');

UsCustomarySystem.REVOLUTION = new BaseUnit(Quantity.ANGLE, '??');
UsCustomarySystem.DEGREE_ANGLE = new BaseUnit(Quantity.ANGLE, '??');
UsCustomarySystem.MINUTE_ANGLE = new BaseUnit(Quantity.ANGLE, '??');
UsCustomarySystem.SECOND_ANGLE = new BaseUnit(Quantity.ANGLE, '??');

UsCustomarySystem.SECOND = new BaseUnit(Quantity.TIME, 's');
UsCustomarySystem.MINUTE = new BaseUnit(Quantity.TIME, 'm');
UsCustomarySystem.HOUR = new BaseUnit(Quantity.TIME, 'h');

UsCustomarySystem.FEET_PER_SECOND = UsCustomarySystem.FOOT.divide(UsCustomarySystem.SECOND);
UsCustomarySystem.MILES_PER_HOUR = UsCustomarySystem.MILE.divide(UsCustomarySystem.HOUR);
UsCustomarySystem.KNOT = UsCustomarySystem.NAUTICAL_MILE.divide(UsCustomarySystem.HOUR);



// derived alternate units
MetricSystem.KATAL = new BaseUnit(Quantity.CATALYTIC_ACTIVITY, 'kat', MetricSystem.MOLE.divide(MetricSystem.SECOND));

// derived product units
MetricSystem.CUBIC_METRE = MetricSystem.METRE.multiply(MetricSystem.METRE).multiply(MetricSystem.METRE);

module.exports = UsCustomarySystem;
