/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="IPrototype.ts" />

module Processor {
    export interface IProcessor {
        makePrototype(code:string): IPrototype;
    }

    export class MaterialProcessor implements IProcessor {
        makePrototype(code:string) {
            var material:WoodFlat;
            eval(code);
            // material may be updated in eval
            if (material) return material.getPrototype();
            return null;
        }

        makeOther() {
        }
    }

    angular.module("Processor",[])
        .service('MaterialProcessor', [MaterialProcessor]);
}