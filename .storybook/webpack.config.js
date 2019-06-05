const path = require("path");
module.exports = ({ config, mode }) => {
    config.module.rules = config.module.rules.concat([
        {
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["react-app", { flow: false, typescript: true }]
                        ]
                    }
                },
                {
                    loader: "react-docgen-typescript-loader"
                }
            ]
        },
        {
            test: /\.less$/,
            include: path.resolve(__dirname, "../"),
            use: [
                "style-loader",
                {
                    loader: require.resolve("css-loader"),
                    options: {
                        sourceMap: true,
                        importLoaders: 1
                    }
                },
                {
                    loader: require.resolve("postcss-loader"),
                    options: {
                        sourceMap: true,
                        plugins: [require("autoprefixer")],
                        ident: "postcss",
                        postcss: {}
                    }
                },
                {
                    loader: require.resolve("less-loader"),
                    options: {
                        javascriptEnabled: true,
                        sourceMap: true
                    }
                }
            ]
        }
    ]);
    config.resolve.extensions.push(".ts", ".tsx");
    console.log(config);
    // throw new Error(123);
    return config;
};
