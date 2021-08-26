import express from "express";
import routeFlow from "../../src";



const app = express();
app.use(express.json());
app.use(routeFlow('test/util/routes'));

export default app;