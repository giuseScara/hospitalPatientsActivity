"use strict";

angular.module("AppModule").factory("PatientsService", PatientsService);

PatientsService.$inject = ["$http"];


function PatientsService(http) {
  var url = "../mock-api-data/patients.json";

  return {
    getData: getData
  };

  function getData() {

    var promise = http.get(url);

    promise.success(function (response) {
      return response;
    });

    promise.error(function (response) {
      return response;
    });

    return promise;

  } //getData

}; //PatientsService
