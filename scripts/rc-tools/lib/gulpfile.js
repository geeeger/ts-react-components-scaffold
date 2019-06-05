const gulp = require("gulp");

// ============================== Clean ==============================
const cleanTasks = require("./gulpTasks/cleanTasks");

cleanTasks(gulp);

// ============================= Package =============================
const packTasks = require("./gulpTasks/packTasks");

packTasks(gulp);

// ============================ Code Style ===========================

const codeStyleTasks = require("./gulpTasks/codeStyleTasks");

codeStyleTasks(gulp);

/**
 * 抓取全局错误，原rc-tools在series处理后不抓错
 * 导致不知道发生了什么
 * 查看gulp源码可知
 * gulp所有done回调摄入的error以及任务产生的错误
 * 会被抓取，然后触发gulp实例的error事件
 * 所以在此打印错误
 */
gulp.on("error", error => {
    console.log(error);
});
