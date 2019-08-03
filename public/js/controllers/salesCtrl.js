      
   'use strict';
   
    app.controller('salesController', function($scope,$location) {  
        $scope.AboutMessage = 'Sales Controller Called !!!';  
        $scope.Aback = function(text) {
        alert(text);
        $location.path('/main'); 
    }
    });  