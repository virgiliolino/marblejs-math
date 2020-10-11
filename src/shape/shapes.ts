import {t}  from '@marblejs/middleware-io';
interface shape {}

// export class rectangle implements shape {
//     @PrimaryGeneratedColumn()
//     public id: number;
//
//     @Column()
//     public x: number;
//
//     @Column()
//     public y: number;
//
//     @Column()
//     public width: number;
//
//     @Column()
//     public height: number;
//
//     constructor(x: number, y: number, width: number, height: number, id?: number) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//     }
// }

export const ellipseSchema = t.type({
    x: t.number,
    y: t.number,
    radius: t.number
})

export const createFromPayload = (payload: { x: number, y: number, radius: number}): CreateEllipse => {
    return new CreateEllipse(payload.x, payload.y, payload.radius);
}

export class CreateEllipse implements shape {
    x: number
    y: number
    radius: number

    constructor(x: number, y: number, radius:number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

}

export class Ellipse implements shape {
    id: number;

    x: number;

    y: number;

    radius: number;

    constructor(id: number, x: number, y: number, radius:number) {
        this.id = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}



