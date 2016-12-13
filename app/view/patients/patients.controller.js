"use strict";

angular.module("AppModule").controller("PatientsController", PatientsController);

PatientsController.$inject = ["PatientsService"];

function PatientsController(service) {
  var vm = this,
    patients = null;
  vm.patientsFilters = null;
  vm.showFilter = false;
  vm.order = {
    predicate: "name",
    reverse: false
  };
  vm.filters = {
    gender: null,
    heightCm: null,
    weightKg: null,
    bmi: null,
    order: "name"
  };
  vm.getPatientImage = getPatientImage;
  vm.actionOnFilter = actionOnFilter;
  vm.reverseOrder = reverseOrder;
  vm.applyFilters = applyFilters;

  service.getData().then(function (response) {
    patients = response.data;
    vm.patientsFilters = response.data;
  });

  function reverseOrder() {
    vm.order.reverse = !vm.order.reverse;
  }; //reverseOrder

  function applyFilters() {
    vm.order.predicate = vm.filters.order;
    vm.patientsFilters = [];

    //filter list of patients
    patients.forEach(function (item) {
      var insertElement = {
        gender: true,
        heightCm: true,
        weightKg: true,
        bmi: true
      };

      if (vm.filters.gender !== null && vm.filters.gender.trim() !== "") {
        if (item.gender == vm.filters.gender) {
          insertElement.gender = true;
        } else {
          insertElement.gender = false;
        }
      }
      if (vm.filters.heightCm !== null && vm.filters.heightCm.trim() !== "") {
        if (item.heightCm == vm.filters.heightCm) {
          insertElement.heightCm = true;
        } else {
          insertElement.heightCm = false;
        }
      }
      if (vm.filters.weightKg !== null && vm.filters.weightKg.trim() !== "") {
        if (item.weightKg == vm.filters.weightKg) {
          insertElement.weightKg = true;
        } else {
          insertElement.weightKg = false;
        }
      }
      if (vm.filters.bmi !== null && vm.filters.bmi.trim() !== "") {
        if (item.bmi == vm.filters.bmi) {
          insertElement.bmi = true;
        } else {
          insertElement.bmi = false;
        }
      }
      if (insertElement.gender && insertElement.heightCm && insertElement.weightKg && insertElement.bmi) {
        vm.patientsFilters.push(item);
      }
    });

  }; //applyFilters

  //get image based of gender
  function getPatientImage(patient, index) {
    var image = "images/";
    if (patient.gender === "male") {
      image += "male_1";
    } else if (patient.gender === "female") {
      image += "female_1";
    }
    return image + ".png";
  }; //getPatientImage

  function actionOnFilter() {
    vm.showFilter = !vm.showFilter;
  }; //actionOnFilter
}; //PatientsController
