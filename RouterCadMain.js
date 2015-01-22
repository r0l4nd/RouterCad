/// <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
/// <reference path="Processor.ts" />
var RouterCadMain;
(function (RouterCadMain) {
    var MainController = (function () {
        function MainController(processor) {
            this.processor = processor;
            this.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";
            this.updatePrototype();
        }
        MainController.prototype.updatePrototype = function () {
            this.prototype = this.processor.makePrototype(this.code);
        };
        return MainController;
    })();
    RouterCadMain.MainController = MainController;
    angular.module("routerCadMain", ["Processor", 'ngAnimate', 'ngMaterial', "components", "ui.ace"]).controller("mainController", ['MaterialProcessor', MainController]);
})(RouterCadMain || (RouterCadMain = {}));
