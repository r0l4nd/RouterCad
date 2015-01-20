/// <reference path="iviewer.ts" />
/// <reference path="SimpleViewer/simpleviewer.ts" />
/// <reference path="ThreeViewer/ThreeViewer.ts" />
var Components;
(function (Components) {
    var Viewer = (function () {
        function Viewer() {
            return {
                restrict: "E",
                scope: { model: "=" },
                link: function ($scope, element) {
                    // create viewer and attach to the parent element
                    var viewer = new SimpleViewer(200, 100, 1000);
                    element.append(viewer.getCanvas());
                    // watch the model and update the viewer when it changes
                    $scope.$watch("model", function (model) {
                        if (model)
                            viewer.setContents(model.getCSG());
                    }, true);
                    // resize the viewer when the window size changes
                    // DAMN YOU webGL for not supporting css sizing
                    function resizeViewer(vr) {
                        var w = $(window).width() - 650;
                        var h = $(window).height() - 130;
                        vr.setSize(w, h);
                        $("#code").css("max-height", h - 30);
                    }
                    $(window).resize(function () {
                        resizeViewer(viewer);
                        window.setTimeout(function () {
                            resizeViewer(viewer);
                        }, 500);
                    });
                    resizeViewer(viewer);
                }
            };
        }
        return Viewer;
    })();
    Components.Viewer = Viewer;
    angular.module("components", []).directive("viewer", [Viewer]);
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
                    /*// resize the viewer when the window size changes
                    // DAMN YOU webGL for not supporting css sizing
                    function resizeViewer(vr: any) {
                      var w = $(window).width() - 650;
    
                      var h = $(window).height() - 130;
                      vr.setSize(w, h);
    
                      $("#code").css("max-height", h - 30);
                    }
    
                    $(window).resize(() => {
                      resizeViewer(viewer);
                      window.setTimeout(() => { resizeViewer(viewer); }, 500);
                      });
    
                      resizeViewer(viewer);*/
                }
            };
        }
        return TViewer;
    })();
    Components.TViewer = TViewer;
    angular.module("components", []).directive("tviewer", [TViewer]);
})(Components || (Components = {}));
