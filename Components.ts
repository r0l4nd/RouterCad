/// <reference path="ThreeViewer/ThreeViewer.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
///<reference path="Utils.ts"/>

module Components {

    export class TViewer {
        constructor() {
            return {
                restrict: "E",
                scope: {model: "="},
                link: ($scope, element:Element) => {
                    var model:Utils.IObservable<IPrototype> = $scope.model;

                    // create viewer and attach to the parent element
                    var viewer = new ThreeViewer.Viewer(element);

                    var updatePrototype = (prototype: IPrototype) => {
                        if (prototype) viewer.addScene(prototype.mesh);
                    }

                    model.addObserver(updatePrototype);

                    updatePrototype(model.get());

                    $scope.$on('$destroy', () =>{
                        model.removeObserver(updatePrototype);
                    });
                }


            };
        }
    }

    angular.module("components", [])
        .directive("tviewer", [TViewer]);
}
