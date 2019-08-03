  'use strict';
  // create the controller and inject Angular's $scope    
    app.controller('mainController', function($scope,$mdSidenav,$location) { 
         $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
     $scope.mandiView = function(text) {
        alert(text);
        $location.path('/mandi');
       
    }

    $scope.contactView = function(text) {
        alert(text);
        $location.path('/contact');
       
    }
     function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };

    } 
        // create a message to display in our view    
        $scope.mainMessage = 'Main Controller Called !!!';  
    }
    );