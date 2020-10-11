import {Context, bindTo, createServer, HttpListener, httpListener, createContextToken, reader} from '@marblejs/core';
import { bindEagerlyTo } from '@marblejs/core';

import "./config.helper";
import { IO } from 'fp-ts/lib/IO';
import {logger$} from "@marblejs/middleware-logger";
import {bodyParser$} from "@marblejs/middleware-body";
import {api$} from "./api.effects";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ellipse, rectangle} from "./shape/shapes";
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

const eventBusListener = messagingListener({
  effects: [
    createEllipse$,
  ],
});
createConnection({
  type: "postgres",
  host: appParameters.db_host,
  port: appParameters.db_port,
  username: appParameters.db_username,
  password: appParameters.db_password,
  database: appParameters.db_name,
  entities: [
    Ellipse, rectangle
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
  const serverConfig = createServerConfig(
      appParameters,
      httpListener({ middlewares,  effects, }),
      [
        bindEagerlyTo(EventBusClientToken)(eventBusClient),
        bindEagerlyTo(EventBusToken)(eventBus({ listener: eventBusListener })),
        bindTo(DBConnectionToken)(pipe(reader, R.map(() => connection)))
      ]
  );
  const server = createServer(serverConfig);

  const main: IO<void> = async () =>
      await (await server)();
  main();

}).catch(error => console.log(error));

