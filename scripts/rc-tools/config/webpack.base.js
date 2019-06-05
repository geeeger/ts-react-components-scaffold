const paths = require("./paths");
module.exports = {
    output: {
        path: paths.appBuildPath,
        filename: "[name].js",
        library: "myComponents",
        libraryTarget: "umd",
        libraryExport: "default"
    },
    externals: [
        {
            react: {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            },
            "react-dom": {
                root: "ReactDOM",
                commonjs2: "react-dom",
                commonjs: "react-dom",
                amd: "react-dom"
            }
        }
    ],
    entry: {
        index: paths.appSrc + "/index.ts"
    }
};
