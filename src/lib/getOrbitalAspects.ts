// These calculations are based on the work of Paul Schlyter
// https://stjarnhimlen.se/comp/ppcomp.html#3
import { ok } from "neverthrow";

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (rad: number) => (rad * 180) / Math.PI;

export function getOrbitalAspects(
    // 3. The time scale
    julianDate: number,
    observerLatitude: number,
    observerLongitude: number,
    extraAccuracy = false,
) {
    // 4. The orbital elements
    const ecl = 23.4393 - 3.563e-7 * julianDate;

    const sunBaseElements = {
        N: 0.0,
        i: 0.0,
        w: 282.9404 + 4.70935e-5 * julianDate,
        a: 1.0,
        e: 0.016709 - 1.151e-9 * julianDate,
        M: 356.047 + 0.9856002585 * julianDate,
    };

    const moonBaseElements = {
        N: 125.1228 - 0.0529538083 * julianDate,
        i: 5.1454,
        w: 318.0634 + 0.1643573223 * julianDate,
        a: 60.2666,
        e: 0.0549,
        M: 115.3654 + 13.0649929509 * julianDate,
    };

    const mercuryBaseElements = {
        N: 48.3313 + 3.24587e-5 * julianDate,
        i: 7.0047 + 5.0e-8 * julianDate,
        w: 29.1241 + 1.01444e-5 * julianDate,
        a: 0.387098,
        e: 0.205635 + 5.59e-10 * julianDate,
        M: 168.6562 + 4.0923344368 * julianDate,
    };

    const venusBaseElements = {
        N: 76.6799 + 2.4659e-5 * julianDate,
        i: 3.3946 + 2.75e-8 * julianDate,
        w: 54.891 + 1.38374e-5 * julianDate,
        a: 0.72333,
        e: 0.006773 - 1.302e-9 * julianDate,
        M: 48.0052 + 1.6021302244 * julianDate,
    };

    const marsBaseElements = {
        N: 49.5574 + 2.11081e-5 * julianDate,
        i: 1.8497 - 1.78e-8 * julianDate,
        w: 286.5016 + 2.92961e-5 * julianDate,
        a: 1.523688,
        e: 0.093405 + 2.516e-9 * julianDate,
        M: 18.6021 + 0.5240207766 * julianDate,
    };

    const jupiterBaseElements = {
        N: 100.4542 + 2.76854e-5 * julianDate,
        i: 1.303 + 1.557e-7 * julianDate,
        w: 273.8777 + 1.64505e-5 * julianDate,
        a: 5.20256,
        e: 0.048498 + 4.469e-9 * julianDate,
        M: 19.895 + 0.0830853001 * julianDate,
    };

    const saturnBaseElements = {
        N: 113.6634 + 2.3898e-5 * julianDate,
        i: 2.4886 - 1.081e-7 * julianDate,
        w: 339.3939 + 2.97661e-5 * julianDate,
        a: 9.55475,
        e: 0.055546 - 9.499e-9 * julianDate,
        M: 316.967 + 0.0334442282 * julianDate,
    };

    const uranusBaseElements = {
        N: 74.0005 + 1.3978e-5 * julianDate,
        i: 0.7733 + 1.9e-8 * julianDate,
        w: 96.6612 + 3.0565e-5 * julianDate,
        a: 19.18171 - 1.55e-8 * julianDate,
        e: 0.047318 + 7.45e-9 * julianDate,
        M: 142.5905 + 0.011725806 * julianDate,
    };

    const neptuneBaseElements = {
        N: 131.7806 + 3.0173e-5 * julianDate,
        i: 1.77 - 2.55e-7 * julianDate,
        w: 272.8461 - 6.027e-6 * julianDate,
        a: 30.05826 + 3.313e-8 * julianDate,
        e: 0.008606 + 2.15e-9 * julianDate,
        M: 260.2471 + 0.005995147 * julianDate,
    };

    function getSiderealTime() {
        // 5b. The sidereal time
        const Ls = (sunBaseElements.M + sunBaseElements.w) % 360;

        const JD0 = Math.floor(julianDate - 0.5) + 0.5;
        const UT = (julianDate - JD0) * 24;

        const GMST0 = Ls / 15 + 12;
        const GMST = GMST0 + UT;
        const LST = GMST + observerLongitude / 15;

        return ok({
            GMST0,
            GMST,
            LST,
        });
    }

    const siderealTime = getSiderealTime().value;

    function getSunPosition() {
        // 5. The position of the sun
        const ecl = 23.4393 - 3.563e-7 * julianDate;

        // Eccentric anomaly (degrees)
        const E =
            sunBaseElements.M +
            deg(
                sunBaseElements.e *
                    Math.sin(rad(sunBaseElements.M)) *
                    (1 + sunBaseElements.e * Math.cos(rad(sunBaseElements.M))),
            );

        // Coordinates in orbital plane (AU)
        const xv = Math.cos(rad(E)) - sunBaseElements.e;
        const yv = Math.sqrt(1.0 - sunBaseElements.e ** 2) * Math.sin(rad(E));

        // True anomaly and distance (degrees, AU)
        const v = deg(Math.atan2(yv, xv));
        const r = Math.sqrt(xv ** 2 + yv ** 2);

        // Ecliptic longitude (degrees)
        const lon = (v + sunBaseElements.w) % 360;

        // Rectangular coordinates (AU)
        const xs = r * Math.cos(rad(lon));
        const ys = r * Math.sin(rad(lon));

        // Ecliptic to equatorial (degrees)
        const xe = xs;
        const ye = ys * Math.cos(rad(ecl));
        const ze = ys * Math.sin(rad(ecl));

        // Equatorial coordinates (degrees)
        const RA = (deg(Math.atan2(ye, xe)) + 360) % 360;
        const Dec = deg(Math.atan2(ze, Math.sqrt(xe ** 2 + ye ** 2)));

        // Hour Angle (degrees)
        const HA = (siderealTime.LST * 15 - RA + 360) % 360;

        // Rectangular coordinates (degrees)
        const x = Math.cos(rad(HA)) * Math.cos(rad(Dec));
        const y = Math.sin(rad(HA)) * Math.cos(rad(Dec));
        const z = Math.sin(rad(Dec));

        // Horizontal coordinates (degrees)
        const xhor =
            x * Math.sin(rad(observerLatitude)) -
            z * Math.cos(rad(observerLatitude));
        const yhor = y;
        const zhor =
            x * Math.cos(rad(observerLatitude)) +
            z * Math.sin(rad(observerLatitude));

        const az = (deg(Math.atan2(yhor, xhor)) + 180) % 360;
        const alt = deg(Math.asin(zhor));

        let alt_topoc = alt;
        let topRA = RA;
        let topDec = Dec;
        let g = 0;

        if (extraAccuracy) {
            // 13. The Moon's topocentric position

            const mpar = Math.asin(1 / r);
            alt_topoc = alt - mpar * Math.cos(alt);

            const gclat =
                observerLatitude - 0.1924 * Math.sin(2 * observerLatitude);
            const rho = 0.99833 - 0.00167 * Math.cos(2 * observerLatitude);

            g = Math.atan(Math.tan(gclat) / Math.cos(HA));

            topRA =
                RA -
                (mpar * rho * Math.cos(gclat) * Math.sin(HA)) / Math.cos(Dec);
            topDec = Dec - mpar * rho * Math.sin(-Dec) * Math.cos(HA);
        }

        return ok({
            E,
            xv,
            yv,
            v,
            r,
            lon,
            xs,
            ys,
            xe,
            ye,
            ze,
            RA,
            Dec,
            x,
            y,
            z,
            xhor,
            yhor,
            zhor,
            az,
            alt,
            alt_topoc,
            topRA,
            topDec,
            g,
        });
    }

    const sunFullPosition = getSunPosition().value;

    function planetWithPosition(
        elements: typeof moonBaseElements,
        name: string,
    ) {
        // 6. The position of the Moon and of the planets

        // Mean anomaly correction (degrees)
        let E =
            elements.M +
            deg(
                elements.e *
                    Math.sin(rad(elements.M)) *
                    (1 + elements.e * Math.cos(rad(elements.M))),
            );
        let E0 = E;
        let E1 = 0.0;

        if (elements.e > 0.006) {
            while (Math.abs(E0 - E1) > 0.0005) {
                E1 = E0;
                E0 =
                    E -
                    (E - deg(elements.e * Math.sin(rad(E))) - elements.M) /
                        (1 - elements.e * Math.cos(rad(E)));
            }
            E = E0;
        }

        // Orbital coordinates (AU)
        const xv = elements.a * (Math.cos(rad(E)) - elements.e);
        const yv =
            elements.a * Math.sqrt(1 - elements.e ** 2) * Math.sin(rad(E));

        // True anomaly and distance (degrees, AU)
        const v = deg(Math.atan2(yv, xv));
        const r = Math.sqrt(xv ** 2 + yv ** 2);

        // Heliocentric coordinates (AU)
        const xh =
            r *
            (Math.cos(rad(elements.N)) * Math.cos(rad(v + elements.w)) -
                Math.sin(rad(elements.N)) *
                    Math.sin(rad(v + elements.w)) *
                    Math.cos(rad(elements.i)));
        const yh =
            r *
            (Math.sin(rad(elements.N)) * Math.cos(rad(v + elements.w)) +
                Math.cos(rad(elements.N)) *
                    Math.sin(rad(v + elements.w)) *
                    Math.cos(rad(elements.i)));
        const zh =
            r * (Math.sin(rad(v + elements.w)) * Math.sin(rad(elements.i)));

        // Ecliptic coordinates (degrees)
        let lonecl = deg(Math.atan2(yh, xh));
        let latecl = deg(Math.atan2(zh, Math.sqrt(xh ** 2 + yh ** 2)));

        let a_corrected = elements.a;

        if (name === "moon") {
            // 9. Perturbations of the Moon
            const Ms = sunBaseElements.M;
            const Mm = elements.M;
            const Nm = 125.1228 - 0.0529538083 * julianDate;
            const ws = sunBaseElements.w;
            const wm = elements.w;
            const Ls = (Ms + ws) % 360;
            const Lm = (Mm + wm + Nm) % 360;
            const D = (Lm - Ls + 360) % 360;
            const F = (Lm - Nm + 360) % 360;

            lonecl +=
                -1.274 * Math.sin(rad(Mm - 2 * D)) +
                0.658 * Math.sin(rad(2 * D)) -
                0.186 * Math.sin(rad(Ms)) -
                0.059 * Math.sin(rad(2 * Mm - 2 * D)) -
                0.057 * Math.sin(rad(Mm - 2 * D + Ms)) +
                0.053 * Math.sin(rad(Mm + 2 * D)) +
                0.046 * Math.sin(rad(2 * D - Ms)) +
                0.041 * Math.sin(rad(Mm - Ms)) -
                0.035 * Math.sin(rad(D)) -
                0.031 * Math.sin(rad(Mm + Ms)) -
                0.015 * Math.sin(rad(2 * F - 2 * D)) +
                0.011 * Math.sin(rad(Mm - 4 * D));

            latecl +=
                -0.173 * Math.sin(rad(F - 2 * D)) -
                0.055 * Math.sin(rad(Mm - F - 2 * D)) -
                0.046 * Math.sin(rad(Mm + F - 2 * D)) +
                0.033 * Math.sin(rad(F + 2 * D)) +
                0.017 * Math.sin(rad(2 * Mm + F));

            a_corrected += -0.58 * Math.cos(Mm - 2 * D);
            a_corrected += -0.46 * Math.cos(2 * D);
        } else if (name === "jupiter") {
            // 10. Perturbations of Jupiter, Saturn, and Uranus
            const Mj = elements.M;
            const Ms = sunBaseElements.M;

            lonecl += -0.332 * Math.sin(2 * Mj - 5 * Ms - 67.6);
            lonecl += -0.056 * Math.sin(2 * Mj - 2 * Ms + 21);
            lonecl += 0.042 * Math.sin(3 * Mj - 5 * Ms + 21);
            lonecl += -0.036 * Math.sin(Mj - 2 * Ms);
            lonecl += 0.022 * Math.cos(Mj - Ms);
            lonecl += 0.023 * Math.sin(2 * Mj - 3 * Ms + 52);
            lonecl += -0.016 * Math.sin(Mj - 5 * Ms - 69);
        } else if (name === "saturn") {
            // 10. Perturbations of Jupiter, Saturn, and Uranus
            const Mj = elements.M;
            const Ms = sunBaseElements.M;

            lonecl += 0.812 * Math.sin(2 * Mj - 5 * Ms - 67.6);
            lonecl += -0.229 * Math.cos(2 * Mj - 4 * Ms - 2);
            lonecl += 0.119 * Math.sin(Mj - 2 * Ms - 3);
            lonecl += 0.046 * Math.sin(2 * Mj - 6 * Ms - 69);
            lonecl += 0.014 * Math.sin(Mj - 3 * Ms + 32);

            latecl += -0.02 * Math.cos(2 * Mj - 4 * Ms - 2);
            latecl += 0.018 * Math.sin(2 * Mj - 6 * Ms - 49);
        } else if (name === "uranus") {
            // 10. Perturbations of Jupiter, Saturn, and Uranus
            const Mu = elements.M;
            const Ms = sunBaseElements.M;
            const Mj = jupiterBaseElements.M;

            lonecl += 0.04 * Math.sin(Ms - 2 * Mu + 6);
            lonecl += 0.035 * Math.sin(Ms - 3 * Mu + 33);
            lonecl += -0.015 * Math.sin(Mj - Ms + 20);
        }

        // 11. Geocentric (Earth-centered) coordinates
        const xh2 = r * Math.cos(lonecl) * Math.cos(latecl);
        const yh2 = r * Math.sin(lonecl) * Math.cos(latecl);
        const zh2 = r * Math.sin(latecl);

        let xg = xh2;
        let yg = yh2;
        const zg = zh2;

        if (name !== "moon") {
            const xs = sunFullPosition.r * Math.cos(sunFullPosition.lon);
            const ys = sunFullPosition.r * Math.sin(sunFullPosition.lon);

            xg = xh2 + xs;
            yg = yh2 + ys;
        }

        // 12. Equatorial coordinates
        const xe = xg;
        const ye = yg * Math.cos(ecl) - zg * Math.sin(ecl);
        const ze = yg * Math.sin(ecl) + zg * Math.cos(ecl);

        const RA = Math.atan2(ye, xe);
        const Dec = Math.atan2(ze, Math.sqrt(xe * xe + ye * ye));
        const rg = Math.sqrt(xe * xe + ye * ye + ze * ze);

        // 12b. Azimuthal coordinates
        const HA = siderealTime.LST - RA;

        const x = Math.cos(HA) * Math.cos(Dec);
        const y = Math.sin(HA) * Math.cos(Dec);
        const z = Math.sin(Dec);

        const xhor =
            x * Math.sin(observerLatitude) - z * Math.cos(observerLatitude);
        const yhor = y;
        const zhor =
            x * Math.cos(observerLatitude) + z * Math.sin(observerLatitude);

        const az = Math.atan2(yhor, xhor) + Math.PI;
        const alt = Math.asin(zhor);

        let alt_topoc = alt;
        let topRA = RA;
        let topDec = Dec;
        let g = 0;

        if (name === "moon" || extraAccuracy) {
            // 13. The Moon's topocentric position

            const mpar = Math.asin(1 / r);
            alt_topoc = alt - mpar * Math.cos(alt);

            const gclat =
                observerLatitude - 0.1924 * Math.sin(2 * observerLatitude);
            const rho = 0.99833 - 0.00167 * Math.cos(2 * observerLatitude);

            g = Math.atan(Math.tan(gclat) / Math.cos(HA));

            topRA =
                RA -
                (mpar * rho * Math.cos(gclat) * Math.sin(HA)) / Math.cos(Dec);
            topDec = Dec - mpar * rho * Math.sin(-Dec) * Math.cos(HA);
        }

        return ok({
            ...elements,
            a: a_corrected,
            E,
            xv,
            yv,
            v,
            r,
            xh,
            yh,
            zh,
            lonecl,
            latecl,
            xg,
            yg,
            zg,
            xe,
            ye,
            ze,
            RA,
            Dec,
            rg,
            HA,
            x,
            y,
            z,
            xhor,
            yhor,
            zhor,
            az,
            alt_topoc,
            alt,
            g,
            topRA,
            topDec,
        });
    }

    function getPlutoPosition() {
        // 14. The position of Pluto
        const S = (50.03 + 0.033459652 * julianDate) % 360;
        const P = (238.95 + 0.003968789 * julianDate) % 360;

        const lonecl =
            238.9508 +
            0.00400703 * julianDate -
            19.799 * Math.sin(P) +
            19.848 * Math.cos(P) +
            0.897 * Math.sin(2 * P) -
            4.956 * Math.cos(2 * P) +
            0.61 * Math.sin(3 * P) +
            1.211 * Math.cos(3 * P) -
            0.341 * Math.sin(4 * P) -
            0.19 * Math.cos(4 * P) +
            0.128 * Math.sin(5 * P) -
            0.034 * Math.cos(5 * P) -
            0.038 * Math.sin(6 * P) +
            0.031 * Math.cos(6 * P) +
            0.02 * Math.sin(S - P) -
            0.01 * Math.cos(S - P);

        const latecl =
            -3.9082 -
            5.453 * Math.sin(P) -
            14.975 * Math.cos(P) +
            3.527 * Math.sin(2 * P) +
            1.673 * Math.cos(2 * P) -
            1.051 * Math.sin(3 * P) +
            0.328 * Math.cos(3 * P) +
            0.179 * Math.sin(4 * P) -
            0.292 * Math.cos(4 * P) +
            0.019 * Math.sin(5 * P) +
            0.1 * Math.cos(5 * P) -
            0.031 * Math.sin(6 * P) -
            0.026 * Math.cos(6 * P) +
            0.011 * Math.cos(S - P);

        const r =
            40.72 +
            6.68 * Math.sin(P) +
            6.9 * Math.cos(P) -
            1.18 * Math.sin(2 * P) -
            0.03 * Math.cos(2 * P) +
            0.15 * Math.sin(3 * P) -
            0.14 * Math.cos(3 * P);

        // 11. Geocentric (Earth-centered) coordinates
        const xh2 = r * Math.cos(lonecl) * Math.cos(latecl);
        const yh2 = r * Math.sin(lonecl) * Math.cos(latecl);
        const zh2 = r * Math.sin(latecl);

        const xg = xh2;
        const yg = yh2;
        const zg = zh2;

        // 12. Equatorial coordinates
        const xe = xg;
        const ye = yg * Math.cos(ecl) - zg * Math.sin(ecl);
        const ze = yg * Math.sin(ecl) + zg * Math.cos(ecl);

        const RA = Math.atan2(ye, xe);
        const Dec = Math.atan2(ze, Math.sqrt(xe * xe + ye * ye));
        const rg = Math.sqrt(xe * xe + ye * ye + ze * ze);

        // 12b. Azimuthal coordinates
        const HA = siderealTime.LST - RA;

        const x = Math.cos(HA) * Math.cos(Dec);
        const y = Math.sin(HA) * Math.cos(Dec);
        const z = Math.sin(Dec);

        const xhor =
            x * Math.sin(observerLatitude) - z * Math.cos(observerLatitude);
        const yhor = y;
        const zhor =
            x * Math.cos(observerLatitude) + z * Math.sin(observerLatitude);

        const az = Math.atan2(yhor, xhor) + Math.PI;
        const alt = Math.asin(zhor);

        let alt_topoc = alt;
        let topRA = RA;
        let topDec = Dec;
        let g = 0;

        if (extraAccuracy) {
            // 13. The Moon's topocentric position

            const mpar = Math.asin(1 / r);
            alt_topoc = alt - mpar * Math.cos(alt);

            const gclat =
                observerLatitude - 0.1924 * Math.sin(2 * observerLatitude);
            const rho = 0.99833 - 0.00167 * Math.cos(2 * observerLatitude);

            g = Math.atan(Math.tan(gclat) / Math.cos(HA));

            topRA =
                RA -
                (mpar * rho * Math.cos(gclat) * Math.sin(HA)) / Math.cos(Dec);
            topDec = Dec - mpar * rho * Math.sin(-Dec) * Math.cos(HA);
        }

        return ok({
            lonecl,
            latecl,
            r,
            xh2,
            yh2,
            zh2,
            xg,
            yg,
            zg,
            xe,
            ye,
            ze,
            RA,
            Dec,
            rg,
            HA,
            x,
            y,
            z,
            xhor,
            yhor,
            zhor,
            az,
            alt_topoc,
            alt,
            g,
            topRA,
            topDec,
        });
    }

    return ok({
        sun: {
            ...sunBaseElements,
            ...sunFullPosition,
        },
        moon: planetWithPosition(moonBaseElements, "moon").value,
        mercury: planetWithPosition(mercuryBaseElements, "mercury").value,
        venus: planetWithPosition(venusBaseElements, "venus").value,
        mars: planetWithPosition(marsBaseElements, "mars").value,
        jupiter: planetWithPosition(jupiterBaseElements, "jupiter").value,
        saturn: planetWithPosition(saturnBaseElements, "saturn").value,
        uranus: planetWithPosition(uranusBaseElements, "uranus").value,
        neptune: planetWithPosition(neptuneBaseElements, "neptune").value,
        pluto: getPlutoPosition().value,
        siderealTime: siderealTime,
    });
}
