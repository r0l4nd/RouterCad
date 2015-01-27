module Utils {
    export interface IObservable<T> {
        get(): T;
        set(object: T);
        addObserver(observer: {(object: T)}):void;
        removeObserver(observer: {(object: T)}):void;
    }

    export class Observable<T> implements IObservable<T>{
        object:T;

        private observers:{(object:T):void}[];

        constructor() {
            this.observers = [];
        }

        get():T {
            return this.object;
        }

        set(val:T) {
            this.object = val;
            this.notify();
        }

        private notify() {
            this.observers.forEach((observer) => {
                observer(this.object);
            });
        }

        addObserver(observer) {
            this.observers.push(observer);
        }

        removeObserver(observer) {
            var indexOfObserver = this.observers.indexOf(observer);

            // remove item at indexOfObserver
            if (indexOfObserver > -1)
                this.observers = this.observers.splice(indexOfObserver,1);
        }
    }
}

