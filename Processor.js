/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
var Processor;
(function (Processor) {
    var MaterialProcessor = (function () {
        function MaterialProcessor() {
        }
        MaterialProcessor.prototype.makePrototype = function (code) {
            var material;
            eval(code);
            // material may be updated in eval
            if (material)
                return material.getPrototype();
            return null;
        };
        MaterialProcessor.prototype.makeOther = function () {
        };
        return MaterialProcessor;
    })();
    Processor.MaterialProcessor = MaterialProcessor;
    angular.module("Processor", []).service('MaterialProcessor', [MaterialProcessor]);
})(Processor || (Processor = {}));
