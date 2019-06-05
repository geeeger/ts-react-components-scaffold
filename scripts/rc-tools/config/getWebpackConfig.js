const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const getBabelCommonConfig = require("./getBabelCommonConfig");
const replaceLib = require("./replaceLib");
const fs = require("fs-extra");
const webpack = require("webpack");
const paths = require("./paths");
const path = require("path");
const merge = require("webpack-merge");

const defaultConfig = () => {
    const pkg = require(paths.appPackageJson);
    const babelConfig = getBabelCommonConfig();
    babelConfig.plugins.push(replaceLib);

    const postcssConfig = {
        plugins: require("./postcssConfig")
    };

    const config = {
        mode: "development",
        devtool: "source-map",

        resolveLoader: {
            modules: [paths.appNodeModules]
        },

        output: {
            path: paths.appBuildPath,
            filename: "[name].js"
        },

        resolve: {
            modules: [
                paths.appNodeModules,
                "node_modules",
                path.join(__dirname, "../node_modules")
            ],
            extensions: paths.moduleFileExtensions.map(item => "." + item),
            alias: {
                [pkg.name]: process.cwd()
            }
        },

        node: [
            "child_process",
            "cluster",
            "dgram",
            "dns",
            "fs",
            "module",
            "net",
            "readline",
            "repl",
            "tls"
        ].reduce(
            (acc, name) => Object.assign({}, acc, { [name]: "empty" }),
            {}
        ),

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: babelConfig
                },
                {
                    test: /\.svg$/,
                    loader: "svg-sprite-loader"
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: babelConfig
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        minetype: "application/font-woff"
                    }
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        minetype: "application/octet-stream"
                    }
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader"
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    loader: "url-loader",
                    options: {
                        limit: 10000
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: Object.assign({}, postcssConfig, {
                                sourceMap: true
                            })
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: Object.assign({}, postcssConfig, {
                                sourceMap: true
                            })
                        },
                        {
                            loader: "less-loader",
                            options: {
                                javascriptEnabled: true,
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            new CaseSensitivePathsPlugin(),
            new ProgressBarPlugin(),
            new MiniCssExtractPlugin()
        ],

        performance: {
            hints: false
        }
    };

    return config;
};

module.exports = () => {
    if (fs.existsSync(paths.appWebpackConfig)) {
        return require(paths.appWebpackConfig)(defaultConfig());
    }

    let config = require("./webpack.base.js");

    let webpackConfig = defaultConfig();

    webpackConfig.entry = config.entry;

    let compressedWebpackConfig = merge({}, webpackConfig);
    compressedWebpackConfig.entry = {};
    Object.keys(webpackConfig.entry).forEach(e => {
        compressedWebpackConfig.entry[`${e}.min`] = webpackConfig.entry[e];
    });

    delete config.entry;

    // 4.32.2版本webpack已不使用UglifyJsPlugin
    // 改用config参数配置，已内建
    compressedWebpackConfig.plugins = [].concat([
        ...webpackConfig.plugins,
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "production"
        })
    ]);

    compressedWebpackConfig.mode = "production";

    compressedWebpackConfig.optimization = {};

    compressedWebpackConfig.optimization.minimizer = [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                warnings: false
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    ];

    compressedWebpackConfig = merge(compressedWebpackConfig, config);

    return [compressedWebpackConfig, webpackConfig];
};

module.exports.getConfig = defaultConfig;
