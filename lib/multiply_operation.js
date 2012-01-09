function MultiplyOperation(factor) {
    this.factor = factor;
}

MultiplyOperation.prototype.apply = function(value) {
    return value * this.factor;
}

MultiplyOperation.prototype.inverse = function() {
    var inverseFactor = -this.factor;
    return new MultiplyOperation(inverseFactor);
}

MultiplyOperation.prototype.toString = function() {
    return 'MultiplyOperation: ' + this.factor;
}

module.exports = MultiplyOperation;
