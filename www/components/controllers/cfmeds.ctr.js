(function () {
  "use strict";

  angular.module('cfAssistant')
    .controller('cfmedsCtrl', function ($scope, $ionicModal, $ionicPopup, cfmedsFactory) {


      var vm = this;
      vm.editMed = editMed;
      vm.createMed = createMed;
      vm.showConfirm = showConfirm;
      vm.showEditModal = showEditModal;

      vm.len;
      vm.meds;
      vm.selectedMed;

      vm.deleteButtonVisible = false;
      vm.deleteVisible = deleteVisible;
      vm.editButtonVisible = false;
      vm.editVisible = editVisible;


      cfmedsFactory.getData().then(function(data) {
        vm.meds = data.data[0].medicines;
        vm.len = vm.meds.length;
        //console.log(vm.meds);  //  console.log(vm.meds.length);
      });

      $ionicModal.fromTemplateUrl('templates/cfMedsAddModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.addModal = modal;
      });


      $ionicModal.fromTemplateUrl('templates/cfmeds-modal-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.editModal = modal;
      });


      function showEditModal(med){
        vm.selectedMed = med;
        console.log(vm.selectedMed.description);
        $scope.editModal.show();
      }

      function editMed(med){
        var index = vm.meds.indexOf(med);
        // access to array using array[index] then update it.
        vm.meds[index] = med;
      }




      function createMed(med) {

        med.id = (vm.meds.length + 1).toString(); //store number in string format as to match the format in json data file.
        vm.meds.push(angular.copy(med));          //angular.copy method is used here, to avoid duplicate hashkey issue.

        //clear current data stored in variables.
        med.description = "";
        med.dosage = "";
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

      function showConfirm(med) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Medicine',
          template: 'Are you sure you want to delete \<strong\>' + med.description + '\</strong\>?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            var index = vm.meds.indexOf(med);
            vm.meds.splice(index, 1);
          } else {
            //console.log('');
          }
        });
      }

    });

})();
