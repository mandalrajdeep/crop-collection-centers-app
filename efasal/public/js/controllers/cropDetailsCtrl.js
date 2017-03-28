'use strict';

    app.controller('cropDetailsController',function($scope,$location,$rootScope,sharedService){
        $scope.Backtocrop = function(text) {
        alert(text);
        $location.path('/projectmgmt/crop'); 
    }  

    $scope.gotoEdit = function(text) {
        alert(text);
        $location.path('/editcrop'); 
    }
      $scope.item = {};
        $rootScope.$on("handleBroadcast", function(){
            $scope.item = sharedService.obj;        
        });
        
        $scope.loadDetails = function() {
            $scope.item = sharedService.obj;
        };
    });