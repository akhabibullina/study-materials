/**
 * Created by annakh on 12/24/15.
 */
myApp.directive('widget', [function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        template:
        '<section class="container">' +
        '<div id="box1" class="box show-bottom5" ng-click="toggle(1)" ng-init="count1=\'show-bottom5\'" ng-class="count1">' +
        '<figure class="front"></figure>' +
        '<figure class="back"></figure>' +
        '<figure class="right"></figure>' +
        '<figure class="left"></figure>' +
        '<figure class="top"></figure>' +
        '<figure class="bottom">1-A</figure>' +
        '</div>' +
        '</section>',
        link: function ($scope, element, attrs) {

            // todo: add
            $scope.state = {
                'default': 1,
                'full': 0
            };

            $scope.toggle = function (inp) {
                console.log(inp);
                console.log($scope.last);

                $scope.count1 = 'show-bottom5';
                $scope.count2 = 'show-bottom6';
                $scope.count3 = 'show-bottom2';
                $scope.count4 = 'show-bottom';
                $scope.count5 = 'show-bottom3';
                $scope.count6 = 'show-bottom4';

                if (inp != $scope.last) {
                    switch (inp) {
                        case 1:
                            $scope.count1 = 'show-front';
                            break;
                        case 2:
                            $scope.count2 = 'show-front';
                            break;
                        case 3:
                            $scope.count3 = 'show-front';
                            break;
                        case 4:
                            $scope.count4 = 'show-front';
                            break;
                        case 5:
                            $scope.count5 = 'show-front';
                            break;
                        case 6:
                            $scope.count6 = 'show-front';
                            break;
                    }

                    $scope.last = inp;
                    $scope.show = true;
                } else {
                    $scope.last = 0;
                    $scope.show = false;
                }

            };
        }
    }
}]);