import * as joi from "joi";

export const configuration = () => ({
	NODE_ENV: process.env.NODE_ENV,
	port: parseInt(process.env.PORT, 10) || 3001,
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	}
});

export const configSchema = joi.object({
	NODE_ENV: joi.string(),
	port: joi.number(),
	jwt: joi.object({
		secret: joi.string(),
		expiresIn: joi.string(),
	})
});
