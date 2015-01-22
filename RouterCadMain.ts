/// <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />
/// <reference path="Processor.ts" />


module RouterCadMain {
    export class MainController {
        code:string;
        prototype:IPrototype;

        constructor(private processor:Processor.IProcessor) {

            this.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";


            this.updatePrototype();
        }

        updatePrototype() {
            this.prototype = this.processor.makePrototype(this.code);
        }
    }

    angular.module("routerCadMain", ["Processor", 'ngAnimate', 'ngMaterial', "components", "ui.ace"])
        .controller("mainController", ['MaterialProcessor', MainController]);

}


