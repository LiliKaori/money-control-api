import { Request } from 'express';

export type BodyRequest<T> = Request<unknown, unknown, T>;
export type QueryRequest<T> = Request<unknown, unknown, unknown, T>;
