/**
 * Created by annakh on 12/24/15.
 */
myApp.directive('widget', [function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        template:
        '<section class="container">' +
           '<div id="box1" class="box" ng-click="toggle()" ng-class="stateClass"> Box </div>' +
        '</section>',
        link: function ($scope, element, attrs) {
            $scope.state = 'default';
            $scope.toggle = function (inp) {
                $scope.state = $scope.state === 'default'? 'full': 'default';
                $scope.stateClass = $scope.state;
            };
        }
    }
}]);