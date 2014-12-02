/**
 * Created by antonysamy.j on 12/2/2014.
 */
'use strict';
app.controller("First", ["$scope","$http",function($scope,$http){
    $http.get('/service').success(function(data,status,headers,config){
        $scope.people=data;
    }).error(function(data,status,headers,config){

    });
    $scope.Create=function() {
        $http.post('/Service/Create',{data:$scope.person}).success(function(data,status,headers,config){
            console.log(data);
        }).error(function(data,status,headers,config){

        });
    };
}]);