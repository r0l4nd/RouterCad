/// <reference path="ThreeViewer/ThreeViewer.ts" />
var Components;
(function (Components) {
    var TViewer = (function () {
        function TViewer() {
            return {
                restrict: "E",
                scope: { model: "=" },
                link: function ($scope, element) {
                    // create viewer and attach to the parent element
                    var viewer = new ThreeViewer.Viewer(element);
                    // watch the model and update the viewer when it changes
                    $scope.$watch("model", function (model) {
                        if (model)
                            viewer.addScene(model.getThree());
                    }, true);
                }
            };
        }
        return TViewer;
    })();
    Components.TViewer = TViewer;
    angular.module("components", []).directive("tviewer", [TViewer]);
})(Components || (Components = {}));
