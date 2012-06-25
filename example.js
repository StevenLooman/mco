var mco = require('./');
var MetricSystem = mco.MetricSystem;
var UsCustomarySystem = mco.UsCustomarySystem;


// trying to add two values with different types
try {
    var m = new mco.UnitValue(5, MetricSystem.METRE);
    var ft = new mco.UnitValue(10, new mco.BaseUnit(mco.Quantity.LENGTH, 'ft'));
    m.add(ft);
} catch (err) {
    console.log('cannot add ft to m');
}


// homework: Sally is riding her bicycle with a speec of 5 [m/s]. What distance has she traveled after 15 minutes?
var sallySpeed = new mco.UnitValue(5, MetricSystem.METRES_PER_SECOND);
var sallyTimeMinutes = new mco.UnitValue(15, new mco.BaseUnit(mco.Quantity.TIME, 'min'));
var sallyTimeSeconds = mco.UnitTransformer.transform(sallyTimeMinutes, MetricSystem.SECOND);
var sallyDistance = sallySpeed.multiply(sallyTimeSeconds);

console.log('Sally\'s speed', sallySpeed.toString());
console.log('Sally\'s time in minutes', sallyTimeMinutes.toString());
console.log('Sally\'s time in seconds', sallyTimeSeconds.toString());
console.log('Sally\'s distance', sallyDistance.toString());


// homework: Hank is accelerating with 10 m/s^2. How fast is he going after 25 seconds?
var hankAcceleration = new mco.UnitValue(10, MetricSystem.METRES_PER_SQUARE_SECOND);
var hankTime = new mco.UnitValue(25, MetricSystem.SECOND);
var hankSpeed = hankAcceleration.multiply(hankTime);

console.log('Hank\'s acceleration', hankAcceleration.toString());
console.log('Hank\'s time', hankTime.toString());
console.log('Hank\'s speed', hankSpeed.toString());


// homework: John travels two kilometer, and then another 350 feet. How much did he travel, in km?
var johnFirst = new mco.UnitValue(2, mco.Prefix.KILO, MetricSystem.METRE);
var johnSecondFeet = new mco.UnitValue(350, UsCustomarySystem.FOOT);
var johnSecondMetre = mco.UnitTransformer.transform(johnSecondFeet, MetricSystem.METRE);
var johnDistance = johnFirst.add(johnSecondMetre);
console.log('John\'s total distance', johnDistance.toString());
