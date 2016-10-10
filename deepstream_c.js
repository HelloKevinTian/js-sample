'use strict';
const deepstream = require('deepstream.io-client-js');

let ck = 5;

if (ck === 1) {

	const client = deepstream('localhost:6021').login();

	client.on('error', (error, event, topic) => {
		console.log(error, event, topic);
	});

	console.log(client.getUid()) // 'i9i6db5q-1xak1s2sfzk'

	console.log(client.getConnectionState());

	client.on('connectionStateChanged', connectionState => {
		// will be called with 'CLOSED' once the connection is successfully closed.
	})

	// client.close();

} else if (ck === 2) {

	const client = deepstream('localhost:6020')
		// client.getConnectionState() will now return 'AWAITING_AUTHENTICATION'

	client.login({
		username: 'peter',
		password: 'sesame'
	}, (success, data) => {
		if (success) {
			console.log('login success', client.getConnectionState())
				// start application
				// client.getConnectionState() will now return 'OPEN'
		} else {
			// extra data can be optionaly sent from deepstream for
			// both successful and unsuccesful logins
			console.log(data, client.getConnectionState())

			// client.getConnectionState() will now return
			// 'AWAITING_AUTHENTICATION' or 'CLOSED'
			// if the maximum number of authentication
			// attempts has been exceeded.
		}
	})

	console.log(client.getConnectionState()) //will now return 'AUTHENTICATING'

} else if (ck === 3) {

	const client = deepstream('localhost:6021').login();

	const anonymousRecord = client.record.getAnonymousRecord()

	anonymousRecord.on('nameChanged', (newName) => {
		console.log('nameChanged:', newName)
	})

	anonymousRecord.setName('user/john-snow')

} else if (ck === 4) {

	const client = deepstream('localhost:6020')

	client.login()

	const record = client.record.getRecord('user/johndoe')

	// Set the entire record's data
	record.set({
		personalData: {
			firstname: 'Homer',
			lastname: 'Simpson',
			status: 'married'
		},
		children: ['Bart', 'Maggie', 'Lisa']
	});

	record.get() // Returns entire object
	record.get('children[1]') // 'Maggie'
	record.get('personalData.firstname') // 'Homer'

	// Update only firstname
	record.set('personalData.firstname', 'Marge')

	const beatlesAlbums = client.record.getList('albums')

	beatlesAlbums.whenReady(() => {
		console.log(beatlesAlbums.getEntries())
	})

	var user = client.record.has('user/johndoe', (error, hasRecord) => {
		console.log(error, hasRecord)
	})

} else if (ck === 5) {

	const client = deepstream('localhost:6020')

	client.login()

	const list = client.record.getList('cars');

	list.setEntries([
		'todo/ikfndidw-1973pnhmyk7',
		'todo/ikfndiqx-43jdj23bsdf',
		'todo/ikfndidt-5sdk3zag354'
	]);

	list.whenReady(() => {
		console.log(list.getEntries())
	})

}