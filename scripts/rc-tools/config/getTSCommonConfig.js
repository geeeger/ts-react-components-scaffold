const fs = require("fs-extra");
const paths = require("./paths");

// get `compilerOptions`
function getCompilerOptions() {
    let customizeConfig = {};
    if (fs.existsSync(paths.appTsConfig)) {
        customizeConfig = require(paths.appTsConfig);
    }
    return Object.assign(
        {
            strictNullChecks: true,
            moduleResolution: "node",
            esModuleInterop: true,
            experimentalDecorators: true,
            jsx: "preserve",
            noUnusedParameters: true,
            noUnusedLocals: true,
            noImplicitAny: true,
            target: "es6"
        },
        customizeConfig.compilerOptions
    );
}

module.exports = getCompilerOptions;
