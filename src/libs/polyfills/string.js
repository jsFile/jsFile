String.prototype.includes = String.prototype.includes || function () {
    return this.indexOf.apply(this, arguments) !== -1;
};

export default {};