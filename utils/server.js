import express from "express";
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';


const app = express();
injectRoutes(app);
injectMiddlewares(app);
startServer(app);

export default app;