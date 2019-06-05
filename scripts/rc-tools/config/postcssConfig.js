const autoprefixer = require("./getAutoprefixer")();

module.exports = function() {
    return {
        plugins: [autoprefixer]
    };
};
