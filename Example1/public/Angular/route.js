/**
 * Created by antonysamy.j on 12/2/2014.
 */
"use strict";
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"Angular/templates/First.html",
        controller:"First"
    }).when("/home",{
        templateUrl:"Angular/templates/Home.html",
        controller:"Home"
    }).otherwise({redirectTo:"/"});
}]);