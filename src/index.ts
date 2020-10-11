import {Context, bindTo, createServer, HttpListener, httpListener, createContextToken, reader} from '@marblejs/core';
import { bindEagerlyTo } from '@marblejs/core';

import "./config.helper";
import { IO } from 'fp-ts/lib/IO';
import {logger$} from "@marblejs/middleware-logger";
import {bodyParser$} from "@marblejs/middleware-body";
import {api$} from "./api.effects";
import { PrismaClient } from "@prisma/client"
import {Ellipse} from "./shape/shapes";
import {AppParameters, createAppConfig, createServerConfig} from "./config.helper";
import {DBConnectionToken} from "./dependencies";
import {postShape$} from "./shape/effects/postShape.effect";
import {eventBus, eventBusClient, EventBusClientToken, EventBusToken, messagingListener} from "@marblejs/messaging";
import {createEllipse$} from "./shape/effects/createShape.effect";
import {pipe} from "fp-ts/pipeable";
import * as R from "fp-ts/Reader";

require('dotenv').config()

const middlewares = [ logger$(), bodyParser$(), ];
const effects = [ api$, postShape$];
const appParameters: AppParameters = createAppConfig(process.env);
const prisma = new PrismaClient()

const eventBusListener = messagingListener({
  effects: [
    createEllipse$,
  ],
});
const serverConfig = createServerConfig(
    appParameters,
    httpListener({ middlewares,  effects, }),
    [
      bindEagerlyTo(EventBusClientToken)(eventBusClient),
      bindEagerlyTo(EventBusToken)(eventBus({ listener: eventBusListener })),
      bindTo(DBConnectionToken)(pipe(reader, R.map(() => prisma)))
    ]
);
const server = createServer(serverConfig);

const main: IO<void> = async () =>
    await (await server)();
main();


