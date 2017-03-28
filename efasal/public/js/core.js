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
        templateUrl: '../public/views/mainvw.html',
        controller: 'mainController'
      })
    .state("projectmgmt", {
        url:'/projectmgmt',
        templateUrl: '../public/views/projectmgmt.html',
        controller: 'projectController'
      })
    .state("projectmgmt.mandi", {
        url:'/mandi',
        templateUrl: '../public/views/projectmgmt-mandi.html',
        controller: 'projectMandiController'
      })
    .state("projectmgmt.crop", {
        url:'/crop',
        templateUrl: '../public/views/projectmgmt-crop.html',
        controller: 'projectController'
      })
    .state("projectmgmt.contact", {
        url:'/contact',
        templateUrl: '../public/views/projectmgmt-contact.html',
        controller: 'projectContactController'
      })
    .state("cropdetails", {
        url:'/cropdetails',
        templateUrl: '../public/views/projectmgmt-cropdetails.html',
        controller: 'cropDetailsController'
      })
    .state("addcrop", {
        url:'/addcrop',
        templateUrl: '../public/views/projectmgmt-addcrop.html',
        controller: 'addCropController'
      })
    .state("editcrop", {
        url:'/editcrop',
        templateUrl: '../public/views/projectmgmt-editcrop.html',
        controller: 'editCropController'
      })
    .state("mandi", {
        url:'/mandi',
        templateUrl: '../public/views/mandi.html',
        controller: 'mandiController'
      })
    .state("sales", {
        url:'/sales',
        templateUrl: '../public/views/salesMain.html',
        controller: 'salesController'
      });

  }
);




      

 






























































































































































































































