module.exports = {
	apps: [
		{
			name: 'nest-template',
			script: 'dist/src/main.js',
			log: "/path/to/nest-template/out.log",
			env: {
				NODE_ENV: 'development',
				JWT_SECRET: "123456",
				JWT_EXPIRES_IN: "3600s",
				PORT: 4001,
				DB_HOST: "localhost",
				DB_PORT: "3306",
				DB_USERNAME: "root",
				DB_PASSWORD: "123456",
				DB_NAME: "dbName"
			},
		},
	],
};
