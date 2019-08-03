'use strict';


    app.controller('editCropController', function($scope,$location,$rootScope,sharedService) {  
        
        $scope.editCropmsg = 'edit fields ...';  

        $scope.BacktocropDetails = function(text) {
        alert(text);
        $location.path('/cropdetails'); 
    }

        $scope.item = {};
        $rootScope.$on("handleBroadcast", function(){
            $scope.itemList = sharedService.obj;        
        });
        
        $scope.loadDetails1 = function() {
            $scope.item = sharedService.obj;
        };
            $scope.item.parameters = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    //var newItemNo = $scope.key.parameters.length+1;
    var newItemNo = angular.element(this).scope();
    $scope.parameters.push({'id':'key'+newItemNo});
  };
    
  $scope.removeChoice = function(i) {
    var index = $scope.item.indexOf(i);
    $scope.item.splice(index,1);
    
  };
  $scope.addItem = function(){
   var newItemNo = $scope.item.parameters.length+1;
    $scope.item.push({'id':'key'+newItemNo});
    $scope.newItem = null;
  }

  $scope.removeItem = function(item){
    var index = $scope.item.indexOf(item);
    $scope.item.splice(index,1);
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