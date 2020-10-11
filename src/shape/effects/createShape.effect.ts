import { act, useContext, matchEvent } from '@marblejs/core';
import { reply, MsgEffect } from '@marblejs/messaging';
import { eventValidator$ } from '@marblejs/middleware-io';
import { mergeMap} from 'rxjs/operators';
import { CreateEllipseCommand } from '../shape.signals';
import { EllipseCreatedEvent } from '../shape.signals';
import {DBConnectionToken} from "../../dependencies";
import {createEllipse, Ellipse} from "../shapes";
import {pipe} from "fp-ts/lib/pipeable";


export const createEllipse$: MsgEffect = (event$, ctx) => {
    const DBConnection = useContext(DBConnectionToken)(ctx.ask);
    const ellipseRepository = DBConnection.getRepository(Ellipse);
    return event$.pipe(
        matchEvent(CreateEllipseCommand),
        act(eventValidator$(CreateEllipseCommand)),
        act(event => pipe(
                event.payload,
                createEllipse,
                ellipseRepository.save,
                mergeMap(ellipse => [
                    EllipseCreatedEvent.create(ellipse),
                    reply(event)(EllipseCreatedEvent.create(ellipse)),
                ]),
        )),
    );
};