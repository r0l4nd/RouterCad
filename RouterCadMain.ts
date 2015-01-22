/// <reference path="components.ts" />
/// <reference path="DSL/baselib.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />

module RouterCadMain {
    export class MainController {
      code: string;
      prototype: IPrototype;

        constructor() {
            this.code = "material = new WoodFlat([0, 0, 0], [200, 200, 25]);\r\nmaterial.makeCut(new RectPocket([0, 50, 0], [100, 100, 100] ));";


            this.updatePrototype();
        }

        updatePrototype() {
          var material: WoodFlat;
          eval(this.code);
          // material may be updated in eval
          if (material) this.prototype = material.getPrototype();
        }
    }

    angular.module("routerCadMain", ['ngAnimate', 'ngMaterial', "components", "ui.ace"])
        .controller("mainController", [MainController]);
}
