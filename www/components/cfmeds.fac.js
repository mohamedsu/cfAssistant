

angular.module('cfAssistant')
  .factory('cfmedsFactory', ['$http', function ($http) {


    function getData() {
      //return $http.get('data/cfmeds.json');
      return $http.get('js/cfassistant.json');
    }

    return {
      getData: getData
    }
  }]);
