var mco = require('./');
var MetricSystem = mco.MetricSystem;

// homework: Sally is riding her bicycle with a speec of 5 [m/s]. What distance has she traveled after 15 minutes?
var sallySpeed = new mco.UnitValue(5, MetricSystem.METRES_PER_SECOND);
var sallyTimeMinutes = new mco.UnitValue(15, new mco.BaseUnit(mco.Quantity.TIME, 'min'));
var sallyTimeSeconds = mco.UnitTransformer.transform(sallyTimeMinutes, MetricSystem.SECOND);
var sallyDistance = sallySpeed.multiply(sallyTimeSeconds);

console.log('Sally\'s speed', sallySpeed.toString());
console.log('Sally\'s time in minutes', sallyTimeMinutes.toString());
console.log('Sally\'s time in seconds', sallyTimeSeconds.toString());
console.log('Sally\'s distance', sallyDistance.toString());
console.log('Sally\'s distance simplified', sallyDistance.getSimplified().toString());
