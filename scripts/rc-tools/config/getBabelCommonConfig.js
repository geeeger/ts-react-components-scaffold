const fs = require("fs-extra");
const paths = require("./paths");
module.exports = function() {
    let babelrc = {
        presets: [
            [
                "react-app",
                {
                    absoluteRuntime: false
                }
            ]
        ]
    };
    if (fs.existsSync(paths.appBabelrc)) {
        babelrc = JSON.parse(fs.readFileSync(paths.appBabelrc, "utf8"));
    }
    if (!babelrc.plugins) {
        babelrc.plugins = [];
    }
    return babelrc;
};
