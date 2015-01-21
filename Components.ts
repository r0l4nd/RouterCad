/// <reference path="ThreeViewer/ThreeViewer.ts" />

module Components {

  export class TViewer {
    constructor() {
      return {
        restrict: "E",
        scope: { model: "=" },
        link: ($scope, element) => {
          // create viewer and attach to the parent element
          var viewer = new ThreeViewer.Viewer(element);


          // watch the model and update the viewer when it changes
          $scope.$watch("model", model => {
            if (model) viewer.addScene(model.getThree());
          }, true);

        }
      };
    }
  }

  angular.module("components", [])
    .directive("tviewer", [TViewer]);
}
