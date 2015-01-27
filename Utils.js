var Utils;
(function (Utils) {
    var Observable = (function () {
        function Observable() {
            this.observers = [];
        }
        Observable.prototype.get = function () {
            return this.object;
        };
        Observable.prototype.set = function (val) {
            this.object = val;
            this.notify();
        };
        Observable.prototype.notify = function () {
            var _this = this;
            this.observers.forEach(function (observer) {
                observer(_this.object);
            });
        };
        Observable.prototype.addObserver = function (observer) {
            this.observers.push(observer);
        };
        Observable.prototype.removeObserver = function (observer) {
            var indexOfObserver = this.observers.indexOf(observer);
            // remove item at indexOfObserver
            if (indexOfObserver > -1)
                this.observers = this.observers.splice(indexOfObserver, 1);
        };
        return Observable;
    })();
    Utils.Observable = Observable;
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map