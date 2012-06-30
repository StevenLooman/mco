function Prefix(symbol, name, factor) {
    this.symbol = symbol;
    this.name = name;
    this.factor = factor;
}

Prefix.prototype.getSymbol = function() {
    return this.symbol;
};

Prefix.prototype.getName = function() {
    return this.name;
};

Prefix.prototype.getFactor = function() {
    return this.factor;
};

Prefix.prototype.transformFactor = function(other) {
    return this.factor / other.factor;
};

Prefix.prototype.toString = function() {
    return this.getSymbol();
};

Prefix.prototype.equals = function(other) {
    if (this === other) {
        return true;
    }

    if (this.symbol !== other.symbol) {
        return false;
    }

    if (this.name !== other.name) {
        return false;
    }

    if (this.factor !== other.factor) {
        return false;
    }

    return true;
};


Prefix.YOTTA = new Prefix('Y', 'yotta', 1e24);
Prefix.ZETTA = new Prefix('Z', 'zetta', 1e21);
Prefix.EXA = new Prefix('E', 'exa', 1e18);
Prefix.PETA = new Prefix('P', 'peta', 1e15);
Prefix.TERA = new Prefix('T', 'tera', 1e12);
Prefix.GIGA = new Prefix('G', 'giga', 1e9);
Prefix.MEGA = new Prefix('M', 'mega', 1e6);
Prefix.KILO = new Prefix('k', 'kilo', 1e3);
Prefix.HECTO = new Prefix('h', 'hecto', 1e2);
Prefix.DECA = new Prefix('da', 'deca', 1e1);

Prefix.ONE = new Prefix('', '', 1e0);

Prefix.DECI = new Prefix('d', 'deci', 1e-1);
Prefix.CENTI = new Prefix('c', 'centi', 1e-2);
Prefix.MILLI = new Prefix('m', 'milli', 1e-3);
Prefix.MICRO = new Prefix('μ', 'micro', 1e-6);
Prefix.NANO = new Prefix('n', 'nano', 1e-9);
Prefix.PICO = new Prefix('p', 'pico', 1e-12);
Prefix.FEMTO = new Prefix('f', 'femto', 1e-15);
Prefix.ATTO = new Prefix('a', 'atto', 1e-18);
Prefix.ZEPTO = new Prefix('z', 'zepto', 1e-21);
Prefix.YOCTO = new Prefix('y', 'yocto', 1e-24);


module.exports = Prefix;
