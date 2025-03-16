import { ok } from "neverthrow";

export function calculateJulianDate(date: Date) {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    const day =
        date.getUTCDate() +
        (date.getUTCHours() +
            date.getUTCMinutes() / 60 +
            date.getUTCSeconds() / 3600) /
            24;

    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    return ok(
        Math.floor(365.25 * (year + 4716)) +
            Math.floor(30.6001 * (month + 1)) +
            day +
            B -
            1524.5,
    );
}
