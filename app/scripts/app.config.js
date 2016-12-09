"use strict";

angular.module("AppModule").config(ConfigInterceptor);

ConfigInterceptor.$inject = ['$httpProvider'];

function ConfigInterceptor(httpProvider) {
  // alternatively, register the interceptor via an anonymous factory
  httpProvider.interceptors.push(['$q', function ($q) {
    return {
      // optional method
      'request': function (config) {
        //angular.element(".overlay").show();
        //console.log(config);
        return config;
      },

      // optional method
      'requestError': function (rejection) {
        // do something on error
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }
        return $q.reject(rejection);
      },

      // optional method
      'response': function (response) {
        // do something on success
        //angular.element(".overlay").hide();
        //console.log(response);
        return response;
      },

      // optional method
      'responseError': function (rejection) {
        // do something on error

        return $q.reject(rejection);
      }
    };
  }]);
}; //configInterceptor
