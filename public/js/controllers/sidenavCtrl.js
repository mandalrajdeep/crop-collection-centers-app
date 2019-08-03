'use strict';

    app.controller('sidenavController', function($scope,$location) {  
        $scope.menuItems = [
        {
        label: 'Project Management',
        link: 'projectmgmt.crop'
    },

    {
        label: 'Sales Management',
        link: 'sales'
    },
    
    {
        label: 'Main View',
        link: 'main'
    }
    ];

    $scope.navaClass = function (page) {
        var currentRoute = $location.path().substring(0);
        return page === currentRoute ? 'active' : '';
    };
 
    });  