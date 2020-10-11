import {Reader} from "fp-ts/Reader";
import {Context, HttpListener} from "@marblejs/core";
import {CreateServerConfig} from "@marblejs/core/dist/http/server/http.server.interface";

export interface AppParameters {
    server_port: number,
    server_host: string,
    db_username: string,
    db_password: string,
    db_name: string,
    db_host: string,
    db_port: number
}
export const createAppConfig = (configParameters:any): AppParameters => { return {
    server_port: Number(configParameters.SERVER_PORT),
    server_host: configParameters.SERVER_HOST,
    db_username: configParameters.POSTGRES_USER,
    db_password: configParameters.POSTGRES_PASSWORD,
    db_name: configParameters.POSTGRES_NAME,
    db_host: configParameters.POSTGRES_HOST,
    db_port: Number(configParameters.POSTGRES_PORT)
}}
export const createServerConfig = (
    appParameters:AppParameters,
    listener: Reader<Context, HttpListener>,
    dependencies?: any): CreateServerConfig => {
    return {
        port: appParameters.server_port,
        hostname: appParameters.server_host,
        listener: listener,
        dependencies: dependencies
    }
}
