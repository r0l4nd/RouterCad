/// <reference path="ThreeViewer/ThreeViewer.ts" />
/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />

module Components {

    export class TViewer {
        constructor() {
            return {
                restrict: "E",
                scope: {model: "="},
                link: ($scope:ng.IScope, element:Element) => {
                    // create viewer and attach to the parent element
                    var viewer = new ThreeViewer.Viewer(element);

                    // watch the model and update the viewer when it changes
                    $scope.$watch("model", (model: IPrototype) => {
                        if (model) viewer.addScene(model.getThree());
                    }, false);

                }
            };
        }
    }

    angular.module("components", [])
        .directive("tviewer", [TViewer]);
}
