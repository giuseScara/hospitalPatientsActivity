"use strict";
angular.module("AppModule").controller("PatientsSummaryController", PatientsSummaryController);

PatientsSummaryController.$inject = ["$routeParams", "PatientsSummaryService"];

function PatientsSummaryController(routeParams, service) {
  var vm = this;
  var chart = null;
  vm.definitionActivity = null;
  vm.patient = JSON.parse(routeParams.patient);
  vm.getPatientImage = getPatientImage;
  service.getDataPatient(vm.patient.id).then(function (response) {
    createChartActivity(response.data, 'donut', "#chartDonut", 'right');
    createChartActivity(response.data, 'bar', "#chartBar", 'right');
    createChartActivity(response.data, 'line', "#chartLine", 'bottom');

  });

  service.getActivities().then(function (response) {
    vm.definitionActivity = response.data;
  });

  function getPatientImage(patient, index) {
    var image = "images/";
    if (patient.gender === "male") {
      image += "male_1";
    } else if (patient.gender === "female") {
      image += "female_1";
    }
    return image + ".png";
  }; //getPatientImage

  function createChartActivity(jsonData, type, id, position) {
    var json = {};
    jsonData.forEach(function (item) {
      json[item.activity] = [item.minutes];
    });

    var chart = c3.generate({
      bindto: id,
      data: {
        json: json,
        type: type
      },
      legend: {
        position: position
      }
    });
  }; //createChartActivity

}; // PatientsSummaryController
