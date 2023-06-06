import { Express, Response, Request } from "express";
import jwt from "jsonwebtoken";
import jwtauth from "./middleware/auth";

const env = process.env;

export const register = (app: Express) => {
	app.post("/login", (req: Request, res: Response) => {
		const { username, password } = req.body;

		if (username === env.ADMIN_USER && password === env.ADMIN_PASSWORD) {
			const credentials: object = { username, password };
			const token_key = process.env.TOKEN_KEY as string;
			const config = { expiresIn: "5m" };
			const accessToken = jwt.sign(credentials, token_key, config);	

			res.status(200).json({
				access_token: accessToken,
				expiresIn: "5m",
			});
		} else {
			res.status(401).send("invalid credentials");
		}
	});

	// protected routes
	app.get("/api/todo", jwtauth, (_, res: Response) => {
		res.send("from todo route");
	});

	app.get("/api/todo/:id", jwtauth, (_: Request, res: Response) => {
		res.send("get single todo");
	});

	app.post("/api/todo", jwtauth, (req: Request, res: Response) => {
		const body = req.body;

		res.json(body).status(200);
	});

	app.delete("/api/todo/:id", jwtauth, (_: Request, res: Response) => {
		res.send("Delete success!");
	});

	app.put("/api/todo", jwtauth, (_: Request, res: Response) => {
		res.send("Update success!");
	});
}
