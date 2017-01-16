(function () {
  "use strict";

  angular.module('cfAssistant')
    .controller('cfTasksCtrl', function ($scope, $ionicModal, $ionicPopup, cfmedsFactory) {


      var vm = this;
      vm.editTask = editTask;
      vm.createTask = createTask;
      vm.showConfirm = showConfirm;
      vm.showEditModal = showEditModal;

      vm.len;
      vm.tasks;
      vm.selectedTask;

      vm.deleteButtonVisible = false;
      vm.deleteVisible = deleteVisible;
      vm.editButtonVisible = false;
      vm.editVisible = editVisible;


      cfmedsFactory.getData().then(function(data) {
        vm.tasks = data.data[0].tasks;
        vm.len = vm.tasks.length;
      });

      // Modal to add tasks/action
      $ionicModal.fromTemplateUrl('templates/cfTasksAddModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.addModal = modal;
      });

      // Modal to edit selected task/action.
      $ionicModal.fromTemplateUrl('templates/cftasks-modal-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.editModal = modal;
      });


      function showEditModal(task){
        vm.selectedTask = task;
        $scope.editModal.show();
      }

      function editTask(task){
        var index = vm.tasks.indexOf(task);
        // access to array using array[index] then update it.
        vm.tasks[index] = task;
      }


      function createTask(task) {
        console.log(task.action);
        task.id = (vm.tasks.length + 1).toString(); //store number in string format as to match the format in json data file.
        task.done = false;
        vm.tasks.push(angular.copy(task));          //angular.copy method is used here, to avoid duplicate hashkey issue.

        //clear current data stored in variables.
        task.action = "";
        task.done = "";
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

      function showConfirm(task) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Task',
          template: 'Are you sure you want to delete \<strong\>' + task.action + '\</strong\>?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            var index = vm.tasks.indexOf(task);
            vm.tasks.splice(index, 1);
          } else {
            console.log('not deleted');
          }
        });
      }

    })

    .filter("checkedItems", function () {
      return function (tasks, showComplete) {
        var resultArr = [];
        angular.forEach(tasks, function (task) {
          if (task.done == false || showComplete == true) {
            resultArr.push(task);
          }
        });
        return resultArr;
      }
    })

})();
