'use strict';


    // create the module and name it app    
    var app = angular.module('efasal', ['ui.router','ngRoute','ngMaterial','ngAnimate']);  
    app.run(function ($state) {
    $state.go('main');
    });
    app.config(
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("main", {
        url:'/main',
        templateUrl: '../partials/mainview.html',
        controller: 'mainController'
      })
    .state("projectmgmt", {
        url:'/projectmgmt',
        templateUrl: '../partials/project.html',
        controller: 'projectController'
      })
    .state("projectmgmt.mandi", {
        url:'/mandi',
        templateUrl: '../partials/project-mandi.html',
        controller: 'projectMandiController'
      })
    .state("projectmgmt.crop", {
        url:'/crop',
        templateUrl: '../partials/project-crop.html',
        controller: 'projectController'
      })
    .state("projectmgmt.contact", {
        url:'/contact',
        templateUrl: '../partials/project-contact.html',
        controller: 'projectContactController'
      })
    .state("cropdetails", {
        url:'/cropdetails',
        templateUrl: '../partials/project-cropdetails.html',
        controller: 'cropDetailsController'
      })
    .state("addcrop", {
        url:'/addcrop',
        templateUrl: '../partials/project-addcrop.html',
        controller: 'addCropController'
      })
    .state("editcrop", {
        url:'/editcrop',
        templateUrl: '../partials/project-editcrop.html',
        controller: 'editCropController'
      })
    .state("mandi", {
        url:'/mandi',
        templateUrl: '../partials/mandi.html',
        controller: 'mandiController'
      })
    .state("sales", {
        url:'/sales',
        templateUrl: '../partials/salesMain.html',
        controller: 'salesController'
      });

  }
);




      

 






























































































































































































































