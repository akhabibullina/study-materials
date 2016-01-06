/**
 * Created by annakh on 1/6/16.
 */
(function (app) {
    app.AppComponent = ng.core
        .Component({
            selector: 'widget',
            template: '<section class="container">' +
            '<div id="box1" (click)="toggle($event)" class="box {{stateClass}}"> Box </div>' +
            '</section>',
        })
        .Class({
            constructor: function () {
                this.state = 'default';
            },
            toggle: function (e) {
                // todo: don't attach to the mouse event
                this.state = this.state === 'default' ? 'full' : 'default';
                this.stateClass = this.state;
            }
        });
})(window.app || (window.app = {}));