angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.showsearch = function() {
    $scope.modal.show();
  };

  // Perform the  action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
})

.controller('tasksController', function($scope, $http, $ionicLoading) {
 
  
		getTask(); // Load all available tasks

 function getTask(){
   $ionicLoading.show();

 $http.get("http://psicon.de/discountermarken/ionic/php/testget.php").success(function(data){
 $scope.ProduktTypen = data;
 console.log($scope.ProduktTypen)+"";
       $ionicLoading.hide();

 });
 };
 
 $scope.addTask = function (task) { 
 $http.get("ajax/addTask.php?task="+task).success(function(data){
 getTask();
 $scope.taskInput = "";
 });
 };
 
 $scope.deleteTask = function (task) {
 if(confirm("Are you sure to delete this line?")){
 $http.get("ajax/deleteTask.php?taskID="+task).success(function(data){
 getTask();
 });
 }
 };
 
$scope.toggleStatus = function(item, status, task) {
 if(status=='2'){status='0';}else{status='2';}
 $http.get("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
 getTask();
 });
 };
 
});