import { act, useContext, matchEvent } from '@marblejs/core';
import { reply, MsgEffect } from '@marblejs/messaging';
import { eventValidator$ } from '@marblejs/middleware-io';
import { mergeMap} from 'rxjs/operators';
import { CreateEllipseCommand } from '../shape.signals';
import { EllipseCreatedEvent } from '../shape.signals';
import {DBConnectionToken} from "../../dependencies";
import {CreateEllipse, createFromPayload, Ellipse} from "../shapes";
import {pipe} from "fp-ts/lib/pipeable";
import {Observable} from "rxjs";


export const createEllipse$: MsgEffect = (event$, ctx) => {
    const DBConnection = useContext(DBConnectionToken)(ctx.ask);
    //const ellipseRepository = DBConnection.ellipse;
    const saveEllipse = (payload:{x: number, y:number, radius: number}): Observable<Ellipse> => {
        return new Observable<Ellipse>(subscriber => {
            const ellipse = DBConnection.ellipse.create(
                { data: {x: payload.x, y: payload.y, radius: payload.radius}}
            );
            subscriber.next(ellipse);
        });
    }
    return event$.pipe(
        matchEvent(CreateEllipseCommand),
        act(eventValidator$(CreateEllipseCommand)),
        act(event => pipe(
                event.payload,
                saveEllipse,
                mergeMap(ellipse => [
                    EllipseCreatedEvent.create({id: ellipse.id}),
                    reply(event)(EllipseCreatedEvent.create({id: ellipse.id})),
                ]),
        )),
    );
};