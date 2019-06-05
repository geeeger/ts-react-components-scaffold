const getBabelCommonConfig = require("../../config/getBabelCommonConfig");
const through2 = require("through2");
const babel = require("gulp-babel");
const merge2 = require("merge2");
const transformLess = require("../transformLess");
const tsConfig = require("../../config/getTSCommonConfig")();
const ts = require("gulp-typescript");
const webpack = require("webpack");
const rimraf = require("rimraf");
const getWebpackConfig = require("../../config/getWebpackConfig");
const {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild
} = require("../FileSizeReporter");
const { printResult } = require("./util");
const paths = require("../../config/paths");
const tsDefaultReporter = ts.reporter.defaultReporter();

function babelifyPipe(gulp) {
    return function babelify(js) {
        const babelConfig = getBabelCommonConfig();
        delete babelConfig.cacheDirectory;
        babelConfig.plugins.push(
            require.resolve("babel-plugin-add-module-exports")
        );
        let stream = js
            .pipe(babel(babelConfig))
            .on("error", error => console.log(error));
        return stream.pipe(gulp.dest(paths.appLib));
    };
}

function lessPipe(gulp) {
    return gulp
        .src([`${paths.appSrc}/**/*.less`])
        .pipe(
            through2.obj(function(file, encoding, next) {
                this.push(file.clone());
                if (file.path.match(/\.less$/)) {
                    transformLess(file.path)
                        .then(css => {
                            file.contents = Buffer.from(css);
                            file.path = file.path.replace(/\.less$/, ".css");
                            this.push(file);
                            next();
                        })
                        .catch(e => {
                            console.error(e);
                        });
                } else {
                    next();
                }
            })
        )
        .pipe(gulp.dest(paths.appLib))
        .on("error", error => console.log(error));
}

function assetsPipe(gulp) {
    return gulp
        .src([`${paths.appSrc}/**/*.@(png|svg|jpg|jpeg)`])
        .pipe(gulp.dest(paths.appLib))
        .on("error", error => console.log(error));
}

function tsPipe(gulp) {
    let error = 0;
    const source = [
        `${paths.appSrc}/**/*.tsx`,
        `${paths.appSrc}/**/*.ts`,
        "typings/**/*.d.ts",
        `!${paths.appSrc}/**/story/**/*`
    ];
    // allow jsx file in components/xxx/
    if (tsConfig.allowJs) {
        source.unshift(`${paths.appSrc}/**/*.jsx`);
    }

    // console.log(source, tsConfig)

    const tsResult = gulp
        .src(source)
        // .pipe(
        //   through2.obj(function(file, encoding, next) {
        //     console.log(file.path);
        //     next();
        //   })
        // )
        .pipe(
            ts(tsConfig, {
                error(e) {
                    tsDefaultReporter.error(e);
                    error = e;
                },
                finish: tsDefaultReporter.finish
            })
        )
        .on("error", error => console.log(error));

    function check() {
        if (error) {
            console.log(error);
            process.exit(1);
        }
    }

    tsResult.on("finish", check);
    tsResult.on("end", check);
    // console.log(tsResult.js);
    const tsFilesStream = babelifyPipe(gulp)(tsResult.js);
    const tsd = tsResult.dts.pipe(gulp.dest(paths.appLib));

    return { tsFilesStream, tsd };
}

function compilePipe(gulp) {
    return function compile() {
        rimraf.sync(paths.appLib);
        let less = lessPipe(gulp);
        let { tsFilesStream, tsd } = tsPipe(gulp);
        let assets = assetsPipe(gulp);
        return merge2([less, tsFilesStream, tsd, assets]);
    };
}

function dist(done) {
    process.env.NODE_ENV = "production";
    let webpackConfig = getWebpackConfig();
    let buildFolder = paths.appBuildPath;
    measureFileSizesBeforeBuild(buildFolder).then(previousFileSizes => {
        rimraf.sync(buildFolder);
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                done(err);
                return;
            }
            stats.toJson().children.forEach(printResult);
            printFileSizesAfterBuild(stats, previousFileSizes, buildFolder);
            done(err);
        });
    });
}

module.exports = gulp => {
    gulp.task("js", () => {
        console.log("[Parallel] compile js...");
        process.env.BABEL_ENV = "production";
        process.env.NODE_ENV = "production";
        return compilePipe(gulp)();
    });

    gulp.task("compile", gulp.series("cleanCompile", gulp.parallel("js")));
    gulp.task("dist", gulp.series(dist));
};
