const fs = require("fs-extra");
const prettier = require("gulp-prettier");
const paths = require("../../config/paths");

function prettierTaskPipe(gulp) {
    return function prettierTask() {
        let fileList = [`./${paths.appSrc}/**/*.{js,jsx,ts,tsx,less}`];
        console.log(`Prettier:\n${fileList.join("\n")}`);

        const prettierrcContent = fs.readFileSync(paths.appPreitterrc, "utf8");
        return gulp
            .src(fileList)
            .pipe(
                prettier(JSON.parse(prettierrcContent), {
                    reporter: "error"
                })
            )
            .pipe(gulp.dest(file => file.base));
    };
}
module.exports = gulp => {
    gulp.task("prettier", gulp.series(prettierTaskPipe(gulp)));
};
