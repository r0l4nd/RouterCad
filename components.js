/// <reference path="ThreeViewer/ThreeViewer.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
///<reference path="Utils.ts"/>
var Components;
(function (Components) {
    var TViewer = (function () {
        function TViewer() {
            return {
                restrict: "E",
                scope: { model: "=" },
                link: function ($scope, element) {
                    var model = $scope.model;
                    // create viewer and attach to the parent element
                    var viewer = new ThreeViewer.Viewer(element);
                    var updatePrototype = function (prototype) {
                        if (prototype)
                            viewer.addScene(prototype.mesh);
                    };
                    model.addObserver(updatePrototype);
                    updatePrototype(model.get());
                    $scope.$on('$destroy', function () {
                        model.removeObserver(updatePrototype);
                    });
                }
            };
        }
        return TViewer;
    })();
    Components.TViewer = TViewer;
    angular.module("components", []).directive("tviewer", [TViewer]);
})(Components || (Components = {}));
//# sourceMappingURL=Components.js.map