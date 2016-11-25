var app = angular.module('myApp', ['ngRoute', 'ngCookies'])

app.config(function ($routeProvider) {

$routeProvider
  .when('/', {
    templateUrl: 'partials/login.html'
  })
  .when('/register', {
    templateUrl: 'partials/register.html'
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html'
  })
  .otherwise('/')
})


// *******************End*******************
