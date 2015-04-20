import wixData from 'wix-data';

angular.module('guestbook')
	.factory('guestBookService',['$q', function ($q) {
		'use strict';
		
		function saveEntry(entry) {
			return wixData.save('entries', entry)
				.then(function success(data) {
					return data;
				});
		}
		
		function removeEntry(entry) {
			return wixData.remove('entries', entry._id)
				.then(function success(data) {
					return data;
				});
		}
		
		function loadEntries() {
			return wixData.query('entries')
				.descending('_createdDate')
				.limit(3)
				.find()
				.then(function success(data){
					return data;
				});
		}
		
		function loadPage(pageNumber) {
			if(pageNumber === 1){
				return loadEntries();
			}
			
			return wixData.query('entries')
				.descending('_createdDate')
				.skip(pageNumberToSkip(pageNumber))
				.limit(3)
				.find()
				.then(function success(data) {
					return data;
				});
		}
		
		function pageNumberToSkip(pageNumber) {
			return 3 * (pageNumber-1);
		}

		return {
			saveEntry: function(entry) {				
				return $q.when(saveEntry(entry));
			},
			removeEntry: function(entry) {
				return $q.when(removeEntry(entry));	
			},
			loadEntries: function() {
				return $q.when(loadEntries());	
			},
			loadPage: function(pageId) {
				return $q.when(loadPage(pageId));
			}
		};
	}]);