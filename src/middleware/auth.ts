import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const authorizer = (token_key: string) => async (accessToken: string) => jwt.verify(accessToken, token_key);

const jwtauth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;
		const token = authorization?.split(' ')[1] as string;
		const basicAuthorizer = authorizer(process.env.TOKEN_KEY as string);
		await basicAuthorizer(token);
		next();
	} catch (error) {
		if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
			res.status(401).send("not authorized!");
		}

		res.status(500).send("internal server error");
	}
}

export default jwtauth;
