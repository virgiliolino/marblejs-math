import { event } from '@marblejs/core';
import * as t from 'io-ts';
import {ellipseSchema} from "./shapes";

//commands as intentions
export enum ShapeCommandType {
    CREATE_RECTANGLE = 'CREATE_RECTANGLE',
    CREATE_ELLIPSE = 'CREATE_ELLIPSE',
    DESTROY_SHAPE = 'DESTROY_SHAPE',
    MOVE_SHAPE = 'MOVE_SHAPE'
}

export const CreateRectangleCommand =
    event(ShapeCommandType.CREATE_RECTANGLE)(t.type({
        type: t.string,
        x: t.number,
        y: t.number,
        width: t.number,
        height: t.number
    }));

export const CreateEllipseCommand =
    event(ShapeCommandType.CREATE_ELLIPSE)(ellipseSchema);

export const DestroyShapeCommand =
    event(ShapeCommandType.DESTROY_SHAPE)(t.type({
        id: t.number
    }));


export const MoveShapeCommand =
    event(ShapeCommandType.MOVE_SHAPE)(t.type({
        id: t.number,
        to_x: t.number,
        to_y: t.number,
        arrival_time: t.number
    }));


//domain events

export enum ShapeEventType {
    RECTANGLE_CREATED = 'RECTANGLE_CREATED',
    ELLIPSE_CREATED = 'ELLIPSE_CREATED',
    SHAPE_DESTROYED = 'SHAPE_DESTROYED',
    SHAPE_MOVED = 'SHAPE_MODES'
};

export const RectangleCreatedEvent =
    event(ShapeEventType.RECTANGLE_CREATED)(t.type({
        id: t.number,
    }));

export const EllipseCreatedEvent =
    event(ShapeEventType.ELLIPSE_CREATED)(t.type({
        id: t.number
    }));
export const ShapeDestroyed =
    event(ShapeEventType.SHAPE_DESTROYED)(t.type({
        id: t.number
    }));
export const ShapeMoved =
    event(ShapeEventType.SHAPE_MOVED)(t.type({
        id: t.number
    }));