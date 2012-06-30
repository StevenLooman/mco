function AddOperation(offset) {
    this.offset = offset;
}

AddOperation.prototype.apply = function(value) {
        return value + this.offset;
};

AddOperation.prototype.inverse = function() {
    var inverseOffset = -this.offset;
    return new AddOperation(inverseOffset);
};

AddOperation.prototype.toString = function() {
    return 'AddOperation: ' + this.offset;
};

module.exports = AddOperation;
