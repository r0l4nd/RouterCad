/// <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
/// <reference path="Processor.ts" />
///<reference path="Utils.ts"/>
var RouterCadMain;
(function (RouterCadMain) {
    var MainController = (function () {
        function MainController(processor) {
            this.processor = processor;
            this.initCode();
            this.prototype = new Utils.Observable();
            this.updatePrototype();
        }
        MainController.prototype.initCode = function () {
            this.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";
        };
        MainController.prototype.updatePrototype = function () {
            this.prototype.set(this.processor.makePrototype(this.code));
        };
        return MainController;
    })();
    RouterCadMain.MainController = MainController;
    angular.module("routerCadMain", ["Processor", 'ngAnimate', 'ngMaterial', "components", "ui.ace"]).controller("mainController", ['MaterialProcessor', MainController]);
})(RouterCadMain || (RouterCadMain = {}));
//# sourceMappingURL=RouterCadMain.js.map