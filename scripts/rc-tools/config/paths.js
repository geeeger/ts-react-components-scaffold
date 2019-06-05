const path = require("path");
const fs = require("fs");
const url = require("url");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith("/");
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    } else {
        return inputPath;
    }
}

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
    return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
    "web.mjs",
    "mjs",
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx"
];

const relativePath = {
    dotenv: ".env",
    appPath: ".",
    appEs: "es",
    appLib: "lib",
    appPublic: "public",
    appBuildPath: "dist",
    appBabelrc: ".babelrc",
    appPreitterrc: ".preitterrc",
    appWebpackConfig: "webpack.config.js",
    appPackageJson: "package.json",
    appSrc: "components",
    appTsConfig: "tsconfig.json",
    appJsConfig: "jsconfig.json",
    appNodeModules: "node_modules",
    tools: "scripts/rc-tools",
    componentTemplate: "scripts/rc-tools/template"
};

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp(relativePath.dotenv),
    appPath: resolveApp(relativePath.appPath),
    appEs: resolveApp(relativePath.appEs),
    appLib: resolveApp(relativePath.appLib),
    appPublic: resolveApp(relativePath.appPublic),
    appBuildPath: resolveApp(relativePath.appBuildPath),
    appBabelrc: resolveApp(relativePath.appBabelrc),
    appPreitterrc: resolveApp(relativePath.appPreitterrc),
    appWebpackConfig: resolveApp(relativePath.appWebpackConfig),
    appPackageJson: resolveApp(relativePath.appPackageJson),
    appSrc: resolveApp(relativePath.appSrc),
    appTsConfig: resolveApp(relativePath.appTsConfig),
    appJsConfig: resolveApp(relativePath.appJsConfig),
    appNodeModules: resolveApp(relativePath.appNodeModules),
    tools: resolveApp(relativePath.tools),
    componentTemplate: resolveApp(relativePath.componentTemplate),
    publicUrl: getPublicUrl(resolveApp(relativePath.appPackageJson)),
    servedPath: getServedPath(resolveApp(relativePath.appPackageJson))
};

module.exports.relativePath = relativePath;

module.exports.moduleFileExtensions = moduleFileExtensions;
