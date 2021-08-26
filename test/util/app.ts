import express from "express";
import superrouter from "../../src";

const app = express();
app.use(express.json());
app.use(superrouter('test/util/routes'));

export default app;