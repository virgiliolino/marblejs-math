import { createContextToken, reader, createReader } from '@marblejs/core';
import { pipe } from 'fp-ts/lib/pipeable';
import * as R from 'fp-ts/lib/Reader';
import * as O from 'fp-ts/lib/Option';
import { Connection } from "typeorm";

export const Dependency1Token = createContextToken<string>('DBConnection');
export const Dependency2Token = createContextToken<string>('Dependency2');

export const Dependency1 = pipe(reader, R.map(() => 'Hello'));
export const Dependency2 = pipe(reader, R.map(ask => pipe(
    ask(Dependency1Token),
    O.map(v => v + ', world!'),
    O.getOrElse(() => ''),
)));

export const DBConnectionToken = createContextToken<Connection>('DBConnection');
//export const DBConnection = createReader(ask => )
//export const Dependency2 = createReader(ask =>
 //   useContext(Dependency1Token)(ask) + ', world!');