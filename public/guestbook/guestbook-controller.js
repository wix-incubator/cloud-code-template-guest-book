angular.module('guestbook')
	.controller('GuestBookCtrl',['$scope','guestBookService', 'guestBookEntries' , function ($scope, guestBookService, guestBookEntries) {
		'use strict';
		
		this.isSubmitting = false;
		this.isOwner = 'OWNER' === Wix.Utils.getPermissions();
		this.guestBookEntries = guestBookEntries;
		this.currentPage = 1;
		
		this.addEntry = function addEntry(entry) {			
  			if (this.guestBookForm.$invalid) {
  				$scope.$broadcast('show-errors-check-validity');
  				return; 
  			}
	
			this.isSubmitting = true;
			
			var that = this;
			guestBookService.saveEntry(entry).then(function onSuccess() {
				that.isSubmitting = false;
				that.resetForm(entry);
				that.reloadEntries();
			}, onError);
		};
		
		this.removeEntry = function removeEntry(entry) {
			guestBookService.removeEntry(entry).then(this.reloadEntries(), onError);
		};
		
		this.resetForm = function resetForm(entry) {
			$scope.$broadcast('show-errors-reset');
			angular.copy({}, entry);
		};
		
		this.entriesRange = function entriesRange() {
			return new Array(this.guestBookEntries.totalPages);
		};
		
		this.reloadEntries = function reloadEntries() {
			var that = this;
			guestBookService.loadEntries().then(function onSuccess(data) {
				that.guestBookEntries = data;
			}, onError);
		};
		
		this.loadPage = function loadPage(pageNumber) {
			if(pageNumber < 1 || pageNumber > this.guestBookEntries.totalPages) {
				return;
			}
			
			this.currentPage = pageNumber;
			var that = this;
			guestBookService.loadPage(pageNumber).then(function onSuccess(data) {
				that.guestBookEntries = data;
			}, onError);
		};
		
		function onError(data) {
			var that = this;
			//TODO Notify the user!
			that.isSubmitting = false;
			console.log(data);
		}
	}]);