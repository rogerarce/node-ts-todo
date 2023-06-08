import { Express, Response, Request } from "express";
import jwt from "jsonwebtoken";
import jwtauth from "./middleware/auth";
import { success, HttpResponses } from "./utils/response";
import { create, get, update, remove } from "./services/todos.service";

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
	app.get("/api/todo", jwtauth, async (_, res: Response) => {
		const todos = await get();
		
		res.json(success(HttpResponses.OK, todos));
	});

	app.get("/api/todo/:id", jwtauth, async (req: Request, res: Response) => {
		const todo = await get(req.params.id);

		res.json(success(HttpResponses.OK, todo));
	});

	app.post("/api/todo", jwtauth, async (req: Request, res: Response) => {
		const body = req.body;

		const todo = await create(body);

		res.json(success(HttpResponses.OK, todo)).status(200);
	});

	app.delete("/api/todo/:id", jwtauth, async (req: Request, res: Response) => {
		await remove(req.params.id);

		res.json(success(HttpResponses.OK, "Success deleting todo"));
	});

	app.put("/api/todo", jwtauth, async (req: Request, res: Response) => {
		const updated = await update(req.params.id, req.body);

		res.json(success(HttpResponses.OK, "Update success"));
	});
}
