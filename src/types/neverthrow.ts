import type { Err } from "neverthrow";

export type ExtractError<T> = T extends Err<any, infer E> ? E : never;
