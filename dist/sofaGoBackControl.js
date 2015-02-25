/**
 * angular-sofa-go-back-control - v0.1.0 - Wed Feb 25 2015 12:14:58 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-go-back-control.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-go-back-control.tpl.html',
    '<button class="sofa-go-back-control-button" ng-click="goBack()" ng-bind="buttonText"></button>\n' +
    '');
}]);

angular.module('sofa.goBackControl', [
    'sofa.navigationService',
    'sofa-go-back-control.tpl.html'
])
    .directive('sofaGoBackControl', ["$window", "navigationService", function ($window, navigationService) {

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
        }]
    );
}(angular));
