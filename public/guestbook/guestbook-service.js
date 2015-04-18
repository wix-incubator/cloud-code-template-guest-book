//TODO move this into the folders once we have the import bug fixed.
import * as guestBookStorage from 'backend/guestbookstorage'
import wixData from 'wix-data'

angular.module('guestbook')
	.factory('guestBookService',['$q', function ($q) {
		'use strict';

		return {
			saveEntry: function(entry) {				
				return $q.when(guestBookStorage.saveEntry(entry));
			},
			removeEntry: function(entry) {
				return $q.when(guestBookStorage.removeEntry(entry));	
			},
			loadEntries: function() {
				return $q.when(guestBookStorage.loadEntries());	
			},
			loadPage: function(pageId) {
				return $q.when(guestBookStorage.loadPage(pageId));
			}
		};
	}]);