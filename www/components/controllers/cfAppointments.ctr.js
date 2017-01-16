(function () {
  "use strict";

  angular.module('cfAssistant')
    .controller('cfAppointmentsCtrl', function ($scope, $ionicModal, $ionicPopup, cfmedsFactory) {


      var vm = this;
      vm.editAppointment = editAppointment;
      vm.createAppointment = createAppointment;
      vm.showConfirm = showConfirm;
      vm.showEditModal = showEditModal;

      vm.len;
      vm.appointments;
      vm.selectedAppointment;

      vm.deleteButtonVisible = false;
      vm.deleteVisible = deleteVisible;
      vm.editButtonVisible = false;
      vm.editVisible = editVisible;



      cfmedsFactory.getData().then(function(data) {
        vm.appointments = data.data[0].appointments;
        vm.len = vm.appointments.length;
        //console.log(vm.appointments);  //  console.log(vm.appointments.length);
      });

      $ionicModal.fromTemplateUrl('templates/cfAppointmentsAddModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.addModal = modal;
      });


      $ionicModal.fromTemplateUrl('templates/cfappointments-modal-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.editModal = modal;
      });


      function showEditModal(appointment){
        vm.selectedAppointment = appointment;
        // date might be stored in string format then it may throw an error to avoid that format it to a date.
        vm.selectedAppointment.date = new Date(vm.selectedAppointment.date);
        $scope.editModal.show();
      }

      function editAppointment(appointment){
        var index = vm.appointments.indexOf(appointment);
        // access to array using array[index] then update it.
        vm.appointments[index] = appointment;
      }




      function createAppointment(appointment) {

        appointment.id = (vm.appointments.length + 1).toString(); //store number in string format as to match the format in json data file.
        vm.appointments.push(angular.copy(appointment));          //angular.copy method is used here, to avoid duplicate hashkey issue.

        //clear current data stored in variables.
        appointment.date = "";
        appointment.time = "";
        appointment.person = "";
      }

      function deleteVisible(){
        vm.deleteButtonVisible = vm.deleteButtonVisible ? false : true;
        vm.editButtonVisible = false;
      }

      function editVisible(){
        vm.editButtonVisible = vm. editButtonVisible ? false : true;
        vm.deleteButtonVisible = false;
      }

      //$scope.showConfirm = function() {} <<--< an alternative way of creating function.

      function showConfirm(appointment) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Appointment',
          template: 'Are you sure you want to delete appointment with \<strong\>' + appointment.person + '\</strong\>?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            var index = vm.appointments.indexOf(appointment);
            vm.appointments.splice(index, 1);
          } else {
            //console.log('');
          }
        });
      }




    });

})();
