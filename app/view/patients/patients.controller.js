"use strict";

angular.module("AppModule").controller("PatientsController", PatientsController);

PatientsController.$inject = ["PatientsService"];

function PatientsController(service) {
  var vm = this;
  vm.patients = null;
  vm.showFilter = false;
  vm.order = {
    predicate: "name",
    reverse: false
  };
  vm.filters = {
    name: null,
    gender: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    bmi: null
  };
  vm.getPatientImage = getPatientImage;
  vm.actionOnFilter = actionOnFilter;
  vm.reverseOrder = reverseOrder;

  service.getData().then(function (response) {
    vm.patients = response.data;
  });

  function reverseOrder() {
    vm.order.reverse = !vm.order.reverse;
  }; //reverseOrder

  function getPatientImage(patient, index) {
    var image = "images/";
    if (patient.gender === "male") {
      image += "male";
    } else if (patient.gender === "female") {
      image += "female";
    }
    image += index % 2 == 0 ? "_2" : "_1";
    return image + ".png";
  }; //getPatientImage

  function actionOnFilter() {
    vm.showFilter = !vm.showFilter;
  }; //actionOnFilter
}; //PatientsController
