import { r, HttpStatus, useContext, use } from '@marblejs/core';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { EventBusClientToken } from '@marblejs/messaging';
import { requestValidator$, t } from '@marblejs/middleware-io';
import {CreateEllipseCommand} from '../shape.signals';
import { pipe } from 'fp-ts/lib/pipeable';
import {CreateEllipse, createFromPayload, Ellipse, ellipseSchema} from "../shapes";

const validateRequest = requestValidator$({
    body: ellipseSchema,
});

export const postShape$ = r.pipe(
    r.matchPath('/ellipse'),
    r.matchType('POST'),
    r.useEffect((req$, ctx) => {
        const eventBusClient = useContext(EventBusClientToken)(ctx.ask);
        return req$.pipe(
            validateRequest,
            mergeMap(req => {
                //const newEllipse: CreateEllipse = createFromPayload(req.body);
                const { x, y, radius } = req.body;
                return pipe(
                    CreateEllipseCommand.create({x: x, y: y, radius: radius}),
                    eventBusClient.send,
                );
            }),
            mapTo({ status: HttpStatus.CREATED }),
        );
    }));