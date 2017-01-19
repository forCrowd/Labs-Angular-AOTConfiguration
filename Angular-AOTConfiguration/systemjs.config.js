(function (global) {
    "use strict";

    var config = {
        defaultJSExtensions: true,
        paths: {
            "npm:": "node_modules/"
        },
        map: {

            // app
            "app": "app/main",

            // @angular
            "@angular/core": "npm:@angular/core/bundles/core.umd",
            "@angular/common": "npm:@angular/common/bundles/common.umd",
            "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd",
            "@angular/forms": "npm:@angular/forms/bundles/forms.umd",
            "@angular/http": "npm:@angular/http/bundles/http.umd",
            "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd",
            "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd",

            // rxjs
            "rxjs": "npm:rxjs"
        }
    };

    System.config(config);

})(this);
