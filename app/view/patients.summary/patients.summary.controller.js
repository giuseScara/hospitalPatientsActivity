"use strict";
angular.module("AppModule").controller("PatientsSummaryController", PatientsSummaryController);

PatientsSummaryController.$inject = ["$routeParams", "PatientsSummaryService"];

function PatientsSummaryController(routeParams, service) {
  var vm = this;
  var chart = null;
  vm.definitionActivity = null;
  vm.patientActivity = null;
  vm.patient = null;
  vm.getPatientImage = getPatientImage;
  vm.showActivityDefintion = false;
  vm.actionOnActivityDefinition = actionOnActivityDefinition;
  vm.convertActivity = convertActivity;

  if (routeParams.patient) {
    vm.patient = JSON.parse(routeParams.patient);

    service.getDataPatient(vm.patient.id).then(function (response) {
      vm.patientActivity = response.data;
      createChartActivity(response.data, 'donut', "#chartDonut", 'right');
    });

    service.getActivities().then(function (response) {
      vm.definitionActivity = response.data;
    });
  }
  
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

  function actionOnActivityDefinition() {
    vm.showActivityDefintion = !vm.showActivityDefintion;
  }; //actionOnActivityDefinition

  function convertActivity(minutes) {
    return minutes < 60 ? minutes + " min" : (minutes / 60) + " h";
  }; //convertActivity

}; // PatientsSummaryController
