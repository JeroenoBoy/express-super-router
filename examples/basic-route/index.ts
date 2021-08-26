import express from "express";
import morgan from "morgan";
import { join } from "path";
import { infoText } from '../../scripts/utils';
import superrouter from "../../src";

const app = express();

//	@ts-ignore	This is so there is nice logging with exampels but none in the test 
if(process.env.RUN_EXAMPLE === 'true') app.use(morgan(infoText(':method :url :status :response-time ms')));

app.use(express.json());
app.use(superrouter(join(__dirname, 'routes')));

export default app;