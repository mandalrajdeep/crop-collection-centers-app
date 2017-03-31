'use strict';

    app.controller('addCropController', function($scope,$location) {  
        $scope.msg = 'add crop msg ...';  
         $scope.Backtocrop = function(text) {
        alert(text);
        $location.path('/projectmgmt/crop'); 
    } 

    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function(item) {
    var index = $scope.choices.indexOf(item);
    $scope.choices.splice(index,1);
    
  };
 
    });