#!/usr/bin/env node
const program = require("commander");

program.on("--help", () => {
    console.log("  Usage:");
    console.log();
    console.log("    $", "rc-tools run js", "compile component to lib use tsc");
    console.log("    $", "rc-tools run compile", "compile component");
    console.log("    $", "rc-tools run dist", "build umd component");
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
