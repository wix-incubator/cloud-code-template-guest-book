import wixData from 'wix-data';

// Signature of hooks changed, so disabling it for the meantime
//wixData.registerBeforeInsertHook('entries', validateEntry);

function validateEntry(entry) {

	if (entry.name && entry.country && entry.email && entry.message && entry.message.length <= 600) {
		return entry;
	}

	return Promise.reject(new Error('Failed to validate entry'));
}
