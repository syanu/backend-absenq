import express from "express";
const appMiddleware = express();
import cors from "cors";
import routers from "../routes";

appMiddleware.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
appMiddleware.options("*", cors());
appMiddleware.use(express.json());
appMiddleware.use(routers);

export default appMiddleware;