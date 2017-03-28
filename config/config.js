'use strict';


    // create the module and name it app    
    var app = angular.module('efasal', ['ui.router','ngRoute','ngMaterial','ngAnimate']);  
app.run(function ($state) {
    $state.go('main');
});
    app.config(
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("main", {
        url:'/main',
        templateUrl: './assets/views/blank.html',
        controller: 'mainController'
      })
    .state("contact", {
        url:'/contact',
        templateUrl: './assets/views/1.html',
        controller: 'prqojectController'
      })
    .state("about", {
        url:'/about',
        templateUrl: './assets/views/2.html',
        controller: 'salesController'
      });
  }
);
      
    // configure our routes    
  /* app.config(function($routeProvider,$locationProvider) {  
        $routeProvider  
      
        // route for the home page    
            .when('/main', {  
            templateUrl: './assets/views/blank.html',  
            controller: 'mainController'  
        })  
      
        // route for the about page    
        .when('/about', {  
            templateUrl: './assets/views/2.html',  
            controller: 'salesController'  
        })  
      
        // route for the contact page    
        .when('/contact', {  
            templateUrl: './assets/views/1.html',  
            controller: 'resourceController'  
        });  
      
    }); */
      
    // create the controller and inject Angular's $scope    
    app.controller('mainController', function($scope,$mdSidenav) { 
         $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
     function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    } 
        // create a message to display in our view    
        $scope.HomeMessage = 'Home Controller Called !!!';  
    }

    );  
      
    app.controller('salesController', function($scope,$location) {  
        $scope.AboutMessage = 'Sales Controller Called !!!';  
        $scope.Aback = function(text) {
        alert(text);
        $location.path('/main');
       
    }
    });  
      
    app.controller('projectController', function($scope) {  
        $scope.ContactMessage = 'project Controller Called !!!';  
    });

     app.controller('footerController', function($scope) {  
        $scope.FooterMessage = 'i m footer !!!';  
    });   

    app.controller('sidenavController', function($scope) {  
        $scope.menuItems = [
        {
        label: 'Project Management',
        link: 'contact'
    },

    {
        label: 'Sales Management',
        link: 'about'
    },
    
    {
        label: 'Main View',
        link: 'main'
    }
    ]; 
    });   


