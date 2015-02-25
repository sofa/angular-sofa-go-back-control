angular.module('sofa.goBackControl', [
    'sofa.navigationService',
    'sofa-go-back-control.tpl.html'
])
    .directive('sofaGoBackControl', function ($window, navigationService) {

            'use strict';

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'sofa-go-back-control.tpl.html',
                scope: {
                    category: '=?'
                },
                link: function ($scope, $element, attrs) {

                    var fallbackText = attrs.buttonText || '';

                    var getParentLabel = function () {
                        return $scope.category.parent && !$scope.category.parent.isRoot ? $scope.category.parent.label :
                            $scope.category.parent && $scope.category.parent.isRoot ? fallbackText : '';
                    };

                    $scope.buttonText = $scope.category ? getParentLabel() : fallbackText;

                    $scope.goBack = function () {
                        if ($scope.category) {
                            navigationService.goUp();
                        } else {
                            $window.history.back();
                        }
                    };
                }
            };
        }
    );
