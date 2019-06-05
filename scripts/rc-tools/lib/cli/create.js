require("colorful").colorful();
const program = require("commander");
const fs = require("fs-extra");
const paths = require("../../config/paths");
const { resolve } = require("path");

program.on("--help", () => {
    console.log("  Usage:".to.bold.blue.color);
    console.log();
    console.log("-n, --name [name]".to.magenta.color, "component name");
    console.log();
});

program
    .option("-n, --name [name]".to.magenta.color, "component name")
    .action(function({ name }) {
        if (typeof name !== "string") {
            program.help();
            return;
        }
        const dir = resolve(paths.appSrc, name);
        if (fs.existsSync(dir)) {
            console.log(`Component ${name} already exist!`.to.bold.red.color);
            return;
        }
        fs.copy(paths.componentTemplate, dir);
    });

program.parse(process.argv);
