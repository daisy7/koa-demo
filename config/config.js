'use strict';
module.exports = {
	port: 3001,
	dbUrl: "mongodb://localhost/test",
	redis: {
		enable: false,
		host: "10.146.173.156",
		port: 6379,
		expired: 300
	},
	sms: {
		enable: false,
		accessKeyId: '',
		secretAccessKey: '',
		expired: 5000
	}
}
