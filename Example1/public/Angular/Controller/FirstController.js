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
      var formData=new FormData();
        angular.forEach($scope.files,function(file){
           formData.append('file',file);
        });

        var upload=$upload.upload({
            url:'/Service/image-upload',
            file:$scope.files[0]
        }).process(function(evt){

        }).success(function(data,status,headers,config){
            console.log(data);
        });
    };

}]);