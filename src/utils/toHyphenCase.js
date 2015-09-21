export default (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
