/**
 * Created by antonysamy.j on 12/2/2014.
 */
'use strict';
app.controller("First", ["$scope","$http","$upload",function($scope,$http,$upload){
    var GetRecords=function() {
        $http.get('/service').success(function(data,status,headers,config){
            $scope.people=data;
        }).error(function(data,status,headers,config){
        });
        $http({
            method:'GET',
            url:'/service/Users'
        }).success(function(data,status,headers,config){
            $scope.users=data;
        }).error(function(err,status,headers,config){

        })
    };

    GetRecords();
    $scope.person={};
    $scope.Create=function() {
        if(typeof($scope.person._id)=='undefined'){
            $http.post('/Service/Create',{data:$scope.person}).success(function(data,status,headers,config){
                GetRecords();
            }).error(function(data,status,headers,config){
            });
        }else{
            $http.put('/Service/Update/'+$scope.person._id,{data:$scope.person}).success(function(data,status,headers,config){
                GetRecords();
            }).error(function(data,status,headers,config){
                console.log(data);
            });
        }
        $scope.person={};
    };

    $scope.Find=function(id){
      $http.get('/Service/Find/'+ id ).success(function(data,status,headers,config){
          $scope.person=data;
      }).error(function(data,status,headers,config){
         console.log(status);
      });
    };

    $scope.Delete=function(id){
      $http.delete('/Service/Delete/'+id).success(function(data,status,headers,config){
          GetRecords();
      }).error(function(data,status,headers,config){

      })
    };

    $scope.ImageUpload=function(elm){
        $scope.files=elm.files;
        var reader=new FileReader();
        reader.onload=function(e){
            $('#previewImage').attr('src', e.target.result)
        }
        reader.readAsDataURL(elm.files[0]);
    };

    $scope.SaveImage=function(){
        $scope.person.image=$scope.files[0].type;

        var upload=$upload.upload({
            url:'/Service/image-upload',
            file:$scope.files[0],
            data:$scope.person
        }).progress(function(evt){
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data,status,headers,config){
            GetRecords();
        });
    };

}]);