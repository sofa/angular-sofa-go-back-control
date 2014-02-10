angular
    .module('sdk.directives.ccImageFullScreen')
    .directive('ccImageFullScreen', function (deviceService, ccImageFullScreenService) {

            'use strict';

            return {
                restrict: 'A',
                link: function (scope, $element) {

                    if (!ccImageFullScreenService.enabled) {
                        return;
                    }

                    $element.bind('click', function () {
                        ccImageFullScreenService.toFullScreen($element);
                    });
                }
            };
        }
    );