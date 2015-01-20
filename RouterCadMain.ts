/// <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />

module RouterCadMain {
    export interface IMyObject {
        prop: String;
    }

    export interface ITestControllerScope {
        code: string;
        prototype: IPrototype;
        updatePrototype: Function;
    }

    export class MainController {
        constructor($scope: ITestControllerScope) {
            $scope.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";

            $scope.updatePrototype = () => {
                var material: WoodFlat;
                eval($scope.code);
                // material may be updated in eval
                // ReSharper disable once ConditionIsAlwaysConst
                // ReSharper disable once HeuristicallyUnreachableCode
                if (material) $scope.prototype = material.getPrototype();
            };
            $scope.updatePrototype();
        }
    }

    angular.module("routerCadMain", ['ngAnimate', 'ngMaterial', "components", "ui.ace"])
        .controller("mainController", ["$scope", MainController]);
}
