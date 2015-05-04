angular.module('guestbook')
	.controller('GuestBookCtrl',['$scope','guestBookService', 'guestBookEntries' , function ($scope, guestBookService, guestBookEntries) {
		'use strict';
		var self = this;

		this.isSubmitting = false;
		this.isOwner = 'OWNER' === Wix.Utils.getPermissions();
		this.guestBookEntries = guestBookEntries;
		this.hasMoreEntries = guestBookService.hasMoreEntries;

		this.addEntry = function addEntry(entry) {
  			if (this.guestBookForm.$invalid) {
  				$scope.$broadcast('show-errors-check-validity');
  				return;
  			}

			this.isSubmitting = true;

			guestBookService.saveEntry(entry).then(function onSuccess(data) {
				self.isSubmitting = false;
				self.resetForm(entry);
				self.guestBookEntries = data;
			}, onError);
		};

		this.removeEntry = function removeEntry(entry) {
			guestBookService.removeEntry(entry).then(onSuccess, onError);
		};

		this.resetForm = function resetForm(entry) {
			$scope.$broadcast('show-errors-reset');
			angular.copy({}, entry);
		};

		this.loadNext = function loadNext() {
			guestBookService.loadNext().then(onSuccess, onError);
		};

		function onSuccess(data) {
			self.guestBookEntries = data;
		}

		function onError(data) {
			//TODO Notify the user!
			console.log(data);
		}
	}]);
