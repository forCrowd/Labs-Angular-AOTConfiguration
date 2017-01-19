///<binding ProjectOpened="default" />
"use strict";

/* Varibles */
var exec = require("child_process").exec,
    del = require("del"),
    gulp = require("gulp"),
    path = require("path");

gulp.task("default", ["build"]);

gulp.task("build", function () {
    return del(["aot"]).then(function () {
        return buildAot().then(function () {
            return compileTypescript("./tsconfig-compile-aot.json").then(function () {
                return rollup().then(function () {
                    return compileTypescript("./tsconfig.json").then(function () {
                        console.log("phew!");
                    })
                })
            })
        })
    });
});

gulp.task("build-aot", buildAot);

gulp.task("build-invalid", function () {
    return del(["aot"]).then(function () {
        return buildAot().then(function () {
            return rollup();
        })
    });
});

gulp.task("compile-aot-ts", function () {
    return compileTypescript("./tsconfig-compile-aot.json");
});

gulp.task("compile-app-ts", function () {
    return compileTypescript("./tsconfig.json");
});

gulp.task("rollup", rollup);

function buildAot() {
    return new Promise(function (resolve, reject) {
        return exec("node_modules\\.bin\\ngc -p tsconfig-build-aot.json", function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            resolve();
        });
    });
}

function compileTypescript(projectFile) {
    return new Promise(function (resolve, reject) {
        return exec("node_modules\\.bin\\tsc -p " + projectFile, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            resolve();
        });
    });
}

function rollup() {

    var rollup = require("rollup"),
        commonjs = require("rollup-plugin-commonjs"),
        nodeResolve = require("rollup-plugin-node-resolve");

    return rollup.rollup({
        entry: "./app/main-aot.js",
        plugins: [
            commonjs(),
            nodeResolve({ jsnext: true, module: true })
        ],
    })
      .then(function (bundle) {
          return bundle.write({
              format: "iife",
              moduleName: "app",
              dest: "./app/app.js"
          });
      });
}
