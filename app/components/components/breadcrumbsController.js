angular
    .module('altairApp')
    .controller('breadcrumbsCtrl', [
        '$scope',
        '$rootScope',
        function ($scope,$rootScope) {
            $rootScope.toBarActive = true;
        }
    ]);