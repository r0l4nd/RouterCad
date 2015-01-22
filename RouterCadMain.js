// / <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
var RouterCadMain;
(function (RouterCadMain) {
    var MainController = (function () {
        function MainController($scope) {
            $scope.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";
            $scope.updatePrototype = function () {
                var material;
                eval($scope.code);
                // material may be updated in eval
                if (material)
                    $scope.prototype = material.getPrototype();
            };
            $scope.updatePrototype();
        }
        return MainController;
    })();
    RouterCadMain.MainController = MainController;
    angular.module("routerCadMain", ['ngAnimate', 'ngMaterial', "components", "ui.ace"]).controller("mainController", ["$scope", MainController]);
})(RouterCadMain || (RouterCadMain = {}));
//# sourceMappingURL=RouterCadMain.js.map