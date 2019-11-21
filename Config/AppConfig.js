module.exports = {

	database: {
		name: 'PROD',
		username: 'robotics',
		password: 'Admin@123',
		host: '192.168.1.83',
		dialect: 'mssql',
		pollConfig: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	},
	database2: {
		name: 'Test_BP',
		username: 'robotics',
		password: 'Admin@123',
		host: '192.168.1.83',
		dialect: 'mssql',
		pollConfig: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	},
	application: {
		port: 4000,
		secret: 'ARB@2019'
	}
}