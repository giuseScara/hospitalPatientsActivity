"use strict";

angular.module("AppModule").config(ConfigRoutes);

ConfigRoutes.$inject = ['$routeProvider', '$httpProvider'];

function ConfigRoutes(routeProvider, httpProvider) {

  routeProvider
    .when("/patients", {
      templateUrl: "./view/patients/patients.html",
      controller: "PatientsController",
      controllerAs: 'patCtrl'
    })
    .when("/patientsSummary/:id", {
      templateUrl: "./view/patients.summary/patients.summary.html",
      controller: "PatientsSummaryController",
      controllerAs: 'patSumCtrl'
    })
    .otherwise({
      redirectTo: "/patients",
    })
}; //configRoutes