import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as routes from "./routes";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
dotenv.config();

const APP_PORT = process.env.PORT;

app.get('/', function(_, res: Response) {
	res.send('Hello World!');
});

routes.register( app );

app.use((_, res: Response) => {
	res.status(404).send("not found!");
});

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
	/** Catch All Errors */
	res.status(500).send(error.message);
});

app.listen(APP_PORT, () => console.log(`Server listening to http://localhost:${APP_PORT}`));
