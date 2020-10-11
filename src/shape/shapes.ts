import {Entity, Column, PrimaryGeneratedColumn, Repository} from "typeorm";
import 'reflect-metadata';
import {t}  from '@marblejs/middleware-io';
import {AppParameters} from "../config.helper";
interface shape {}

export class rectangle implements shape {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public x: number;

    @Column()
    public y: number;

    @Column()
    public width: number;

    @Column()
    public height: number;
}

export const ellipseSchema = t.type({
    x: t.number,
    y: t.number,
    radius: t.number
})
export const createEllipse = (payload:any): Ellipse => {
    return new Ellipse(payload.x, payload.y, payload.radius);
}
@Entity()
export class Ellipse implements shape {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    x: number
    @Column()
    y: number
    @Column()
    radius: number

    constructor(x: number, y: number, radius:number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}


export const saveEllipse = async (repository:Repository<Ellipse>, ellipse: Ellipse): Promise<Ellipse> => {
    return repository.save(ellipse).then(elem => { return elem });
}

