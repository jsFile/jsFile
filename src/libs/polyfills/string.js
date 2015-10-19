export default () => {
    String.prototype.includes = String.prototype.includes || function () {
        return this.indexOf.apply(this, arguments) !== -1;
    };
};