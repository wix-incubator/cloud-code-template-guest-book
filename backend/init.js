import wixData from 'wix-data';

wixData.beforeInsert('entries', validateEntry);

function validateEntry(entry) {

	if (entry.name && entry.country && entry.email && entry.message && entry.message.length <= 600) {
		return entry;
	}

	return Promise.reject(new Error('Failed to validate entry'));
}
