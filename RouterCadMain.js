/// <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
var RouterCadMain;
(function (RouterCadMain) {
    var MainController = (function () {
        function MainController() {
            this.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";
            this.updatePrototype();
        }
        MainController.prototype.updatePrototype = function () {
            var material;
            eval(this.code);
            // material may be updated in eval
            if (material)
                this.prototype = material.getPrototype();
        };
        return MainController;
    })();
    RouterCadMain.MainController = MainController;
    angular.module("routerCadMain", ['ngAnimate', 'ngMaterial', "components", "ui.ace"]).controller("mainController", [MainController]);
})(RouterCadMain || (RouterCadMain = {}));
