#!/usr/bin/env node
require("colorful").colorful();
const program = require("commander");

program.on("--help", () => {
    console.log("  Usage:".to.bold.blue.color);
    console.log();
    console.log(
        "    $",
        "rc-tools run test".to.magenta.color,
        "lint source within lib"
    );
    console.log(
        "    $",
        "rc-tools run compile".to.magenta.color,
        "compile component"
    );
    console.log(
        "    $",
        "rc-tools run dist".to.magenta.color,
        "build umd component"
    );
    console.log(
        "    $",
        "rc-tools run pretter".to.magenta.color,
        "pretter all code"
    );
    console.log();
});

program.parse(process.argv);

function runTask(toRun) {
    const gulp = require("gulp");

    const metadata = { task: toRun };
    // Gulp >= 4.0.0 (doesn't support events)
    const taskInstance = gulp.task(toRun);
    if (taskInstance === undefined) {
        gulp.emit("task_not_found", metadata);
        return;
    }
    const start = process.hrtime();
    gulp.emit("task_start", metadata);
    try {
        taskInstance.apply(gulp);
        metadata.hrDuration = process.hrtime(start);
        gulp.emit("task_stop", metadata);
        gulp.emit("stop");
    } catch (err) {
        err.hrDuration = process.hrtime(start);
        err.task = metadata.task;
        gulp.emit("task_err", err);
    }
}

const task = program.args[0];

if (!task) {
    program.help();
} else {
    console.log("rc-tools run", task);

    if (task === "test") {
        require("./test");
        return;
    }
    require("../gulpfile");
    runTask(task);
}
