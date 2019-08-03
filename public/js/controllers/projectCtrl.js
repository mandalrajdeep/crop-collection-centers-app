   
   'use strict';
   
    app.controller('projectController', function($state,$scope,$location,$rootScope,sharedService) {  
        $scope.ContactMessage = 'project Controller Called !!!'; 
        $scope.searchCrop   = '';
        $state.go('projectmgmt.crop');
          $scope.croplist = [
    {
        name: 'Orange',
        variety: 'Variety-X',
        color: '#3F51B5',
        notes: 'California Orange',
        parameters : 
                {
                'a0' : 'mm1',
                'a1' : 'mm2',
                'a3' : 'mm3',
                'a4' : 'mm4'
            }
        
    },
     {
        name: 'Grapes',
        variety: 'Variety-G',
        color: '#69F0AE',
        notes: 'Goa grapes',
        parameters : 
                {'a0' : 'mm1',
                'a1' : 'mm2'
            }
        
    },
     {
        name: 'Banana',
        variety: 'Variety-B',
        color: '#4A148C',
        notes: 'Wild Banana',
        parameters : 
                {'a0' : 'mm1',
                'a1' : 'mm2'
            }
        
    },
     {
        name: 'Tomatoes',
        variety: 'Variety-T',
        color: '#7E57C2',
        notes: 'Green tomatoes',
        parameters: {
                'a0' : 'mm1',
                'a1' : 'mm2'
            },
    },
     {
        name: 'Wheat',
        variety: 'Variety-W',
        color: '#0097A7',
        notes: 'none'
    },
     {
        name: 'Stroberry',
        variety: 'Variety-S',
        color: '#1DE9B6',
        notes: 'none'
    }, {
        name: 'Orange',
        variety: 'Variety-XZ',
        color: '#E65100',
        notes: 'none'
    }
    ]; 
     $scope.Addcrop = function(text) {
        alert(text);
        $location.path('/addcrop'); 
    }
   $rootScope.showDetails = function(obj) {
        sharedService.getDetails(obj);
        $rootScope.$on("handleBroadcast", function(){
            $scope.item = sharedService.obj;
            //$state.go('index.projectDetail'); 
            $location.path('/cropdetails');
        });
    }

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

   
    });