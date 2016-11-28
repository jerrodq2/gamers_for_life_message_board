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
  .when('/topic/:id', {
    templateUrl: 'partials/topic.html'
  })
  .when('/category/:name', {
    templateUrl: 'partials/category.html'
  })
  .when('/profile/:id', {
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
  .when('/create', {
    templateUrl: 'partials/create.html'
  })
  .when('/support', {
    templateUrl: 'partials/support.html'
  })
  .otherwise('/')
})


// *******************End*******************
