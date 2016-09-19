angular
    .module('altairApp')
    .controller('footerCtrl', [
        '$scope',
        '$rootScope',
        function ($scope,$rootScope) {
            $rootScope.footerActive = true;
            $rootScope.page_full_height = true;
        }
    ]);