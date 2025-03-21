import type { Err } from "neverthrow";

export type ExtractError<T> = T extends Err<unknown, infer E> ? E : never;
