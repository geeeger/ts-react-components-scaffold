const fs = require("fs-extra");
const rimraf = require("rimraf");
const paths = require("../../config/paths");

function cleanCompile(done) {
    if (fs.existsSync(paths.appLib)) {
        rimraf.sync(paths.appLib);
    }
    if (fs.existsSync(paths.appEs)) {
        rimraf.sync(paths.appEs);
    }
    done();
}

function cleanBuild(done) {
    if (fs.existsSync(paths.appBuildPath)) {
        rimraf.sync(paths.appBuildPath);
    }
    done();
}

function registerTasks(gulp) {
    gulp.task("clean", gulp.series(cleanCompile, cleanBuild));

    gulp.task("cleanCompile", gulp.series(cleanCompile));

    gulp.task("cleanBuild", gulp.series(cleanBuild));
}

registerTasks.cleanCompile = cleanCompile;
registerTasks.cleanBuild = cleanBuild;

module.exports = registerTasks;
