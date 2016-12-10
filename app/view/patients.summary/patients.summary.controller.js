"use strict";
angular.module("AppModule").controller("PatientsSummaryController", PatientsSummaryController);

PatientsSummaryController.$inject = ["$routeParams", "PatientsSummaryService"];

function PatientsSummaryController(routeParams, service) {
  var vm = this;
  var chart = null;
  vm.patient = JSON.parse(routeParams.patient);
  vm.getPatientImage = getPatientImage;
  service.getDataPatient(vm.patient.id).then(function (response) {
    createChartActivity(response.data, 'pie', "#chartPie");
    createChartActivity(response.data, 'bar', "#chartBar");
    createChartActivity(response.data, 'donut', "#chartDonut");
    createChartActivity(response.data, 'line', "#chartLine");

  });

  service.getActivities().then(function (response) {
    console.log(response.data);
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

  function createChartActivity(jsonData, type, id) {
    var json = {};
    jsonData.forEach(function (item) {
      json[item.activity] = [item.minutes];
    });

    var chart = c3.generate({
      bindto: id,
      data: {
        json: json,
        type: type
      }
    });
  }; //createChartActivity

}; // PatientsSummaryController
