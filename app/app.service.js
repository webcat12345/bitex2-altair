altairApp
    .service('detectBrowser', [
        '$window',
        function($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function() {
                var userAgent = $window.navigator.userAgent,
                    browsers  = {
                        chrome  : /chrome/i,
                        safari  : /safari/i,
                        firefox : /firefox/i,
                        ie      : /internet explorer/i
                    };

                for ( var key in browsers ) {
                    if ( browsers[key].test(userAgent) ) {
                        return key;
                    }
                }
                return 'unknown';
            }
        }
    ])
    .service('preloaders', [
        '$rootScope',
        '$timeout',
        'utils',
        function($rootScope,$timeout,utils) {
            $rootScope.content_preloader_show = function(style,container) {
                var $body = $('body');
                if(!$body.find('.content-preloader').length) {
                    var image_density = utils.isHighDensity() ? '@2x' : '' ;

                    var preloader_content = (typeof style !== 'undefined' && style == 'regular')
                        ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                        : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                    var thisContainer = (typeof container !== 'undefined') ? container : $body;

                    thisContainer.append('<div class="content-preloader">' + preloader_content + '</div>');
                    $timeout(function() {
                        $('.content-preloader').addClass('preloader-active');
                    });
                }
            };
            $rootScope.content_preloader_hide = function() {
                var $body = $('body');
                if($body.find('.content-preloader').length) {
                    // hide preloader
                    $('.content-preloader').removeClass('preloader-active');
                    // remove preloader
                    $timeout(function() {
                        $('.content-preloader').remove();
                    }, 500);
                }
            };

        }
    ])
    .service('api_sender' , [
        '$http',
        function($http) {

            var self = this;

            self.sendApiRequest = function sendApiRequest(httpMethod , ApiMethod , data){
                var request = {
                    method : httpMethod,
                    url : ApiMethod ,
                    data : data , 
                    headers : {
                    }
                }
                return $http(request);
            };

        }
    ])
    .service('public_apis' , [
        'api_sender',
        function(api_sender) {

            var self = this;

            var server_url = 'http://13.75.147.191/';
        // get bids list
            self.GetBidsList = function (count , callback) {
                
                var api_url = 'api/public/orderbook/btc-aud/bids/?page_size=' + count;

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {   
                        callback(res.data);  
                    },
                    function(res) {
                        callback(false);
                    }
                );                                 
            };
        // get asks list
            self.GetAsksList = function (count , callback) {
                
                var api_url = 'api/public/orderbook/btc-aud/asks/?page_size=' + count;

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {   
                        callback(res.data);  
                    },
                    function(res) {
                        callback(false);
                    }
                );                                 
            };
        // get trades history
            self.GetTradesHistory = function (count , callback) {

                var api_url = 'api/public/trades-history/?page_size=' + count;

                api_sender.sendApiRequest('GET' , server_url + api_url).then(
                    function(res) {
                        callback(res.data);
                    },
                    function(res) {
                        callback(false);
                    }
                );
            };
        }
    ])
;