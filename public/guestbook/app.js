angular.module('guestbook', ['ngRoute', 'ngAnimate'])
	.config(function ($routeProvider) {
		'use strict';
		var routeConfig = {
			controller: 'GuestBookCtrl',
			controllerAs: 'guestBook',
			templateUrl: 'guestbook/guestbook-template.html',
			resolve: {
				guestBookEntries: function(guestBookService){
					return guestBookService.loadEntries().then(function onSuccess(data){
						return data;
					}, function onError(exception){
						console.log(exception);
						//TODO Retry or what do we do when we fail?!
						return [];
					});
				}
			}
		};
		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
