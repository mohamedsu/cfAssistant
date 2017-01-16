(function () {
  "use strict";

  angular.module('cfAssistant')
    .controller('cfContactsCtrl', function ($scope, $ionicModal, $ionicPopup, cfmedsFactory) {


      var vm = this;
      vm.editContact = editContact;
      vm.createContact = createContact;
      vm.showConfirm = showConfirm;
      vm.showEditModal = showEditModal;

      vm.len;
      vm.contacts;
      vm.selectedContact;

      vm.deleteButtonVisible = false;
      vm.deleteVisible = deleteVisible;
      vm.editButtonVisible = false;
      vm.editVisible = editVisible;


      cfmedsFactory.getData().then(function(data) {
        vm.contacts = data.data[0].contacts;
        vm.len = vm.contacts.length;
        //console.log(vm.contacts);  //  console.log(vm.contacts.length);
      });

      $ionicModal.fromTemplateUrl('templates/cfContactsAddModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.addModal = modal;
      });


      $ionicModal.fromTemplateUrl('templates/cfcontacts-modal-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.editModal = modal;
      });


      function showEditModal(contact){
        vm.selectedContact = contact;
        console.log(vm.selectedContact.Address);
        $scope.editModal.show();
      }

      function editContact(contact){
        var index = vm.contacts.indexOf(contact);
        // access to array using array[index] then update it.
        vm.contacts[index] = contact;
      }




      function createContact(contact) {

        contact.id = (vm.contacts.length + 1).toString(); //store number in string format as to match the format in json data file.
        vm.contacts.push(angular.copy(contact));          //angular.copy method is used here, to avoid duplicate hashkey issue.

        //clear current data stored in variables.
        contact.Address = "";
        contact.phone = "";
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

      function showConfirm(contact) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Contact',
          template: 'Are you sure you want to delete \<strong\>' + contact.Address + '\</strong\>?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            var index = vm.contacts.indexOf(contact);
            vm.contacts.splice(index, 1);
          } else {
            //console.log('');
          }
        });
      }

    });

})();
