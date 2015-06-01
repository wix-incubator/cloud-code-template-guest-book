import wixData from 'wix-data';

angular.module('guestbook')
	.factory('guestBookService',['$q', function ($q) {
		'use strict';
		var collectionName = 'entries';

		var guestBookEntries, currentCount, totalCount, hasMoreEntries;

		function saveEntry(entry) {
			return wixData.save(collectionName, entry).
				then(function success(data) {
					//TODO remove the copy when the dual object is fixed
					var dataCopy = {};
					angular.copy(data, dataCopy);

					currentCount += 1;
					totalCount += 1;
					guestBookEntries.unshift(dataCopy);

					return guestBookEntries;
				});
		}

		function removeEntry(entry) {
			return wixData.remove(collectionName, entry._id).
				then(function success() {
					guestBookEntries.splice(guestBookEntries.indexOf(entry), 1);
					currentCount -= 1;
					totalCount -= 1;

					return guestBookEntries;
				});
		}

		function loadEntries() {
			return wixData.query(collectionName)
				.descending('_createdDate')
				.limit(3)
				.find()
				.then(function success(data){
					totalCount = data.totalCount;
					currentCount = 3;
					hasMoreEntries = currentCount < totalCount;
					guestBookEntries = data.items;
					return guestBookEntries;
				});
		}

		function loadNext() {
			if(hasMoreEntries){
				return wixData.query(collectionName)
					.descending('_createdDate')
					.skip(currentCount)
					.limit(3)
					.find()
					.then(function success(data) {
						currentCount += 3;
						hasMoreEntries = currentCount < totalCount;
						guestBookEntries = guestBookEntries.concat(data.items);
						return guestBookEntries;
					});
			} else {
				return guestBookEntries;
			}
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
			loadNext: function() {
				return $q.when(loadNext());
			},
			hasMoreEntries: function() {
				return hasMoreEntries;
			}
		};
	}]);
