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
  .when('/profile', {
    templateUrl: 'partials/admin.html'
  })
  .when('/members', {
    templateUrl: 'partials/members.html'
  })
  .when('/faq', {
    templateUrl: 'partials/faq.html'
  })
  .when('/about', {
    templateUrl: 'partials/about.html'
  })
  .when('/admin', {
    templateUrl: 'partials/admin.html'
  })
  .otherwise('/')
})


// *******************End*******************
