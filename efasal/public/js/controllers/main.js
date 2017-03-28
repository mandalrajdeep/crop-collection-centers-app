// js/controllers/main.js
    
angular.module('cropController', [])

    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/crop')
                .success(function(data) {
                        $scope.todos = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
                $http.post('/crop', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
                $http.delete('/crop' + id)
                        .success(function(data) {
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

    });