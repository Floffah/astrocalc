import { addDays, differenceInCalendarDays } from "date-fns";

import type {
    AspectObject,
    PlanetPositionObject,
    ZodiacMoonSignObject,
} from "@/defs";
import { Aspect, Planet, ZodiacSign } from "@/defs/enums.ts";
import type { CalculateTransitRangeResponse } from "@/defs/responses.ts";
import { calculateBirthChart } from "@/lib/birthCharts/calculateBirthChart.ts";
import {
    ASPECTS,
    computeAspects,
    computeAspectsBetweenCharts,
} from "@/lib/calculateAspects.ts";

type ChartBody = Pick<
    PlanetPositionObject,
    | "id"
    | "name"
    | "longitude"
    | "isRetrograde"
    | "degree"
    | "houseNumber"
    | "zodiac"
>;

type RangeAspectSample = {
    date: string;
    orb: number;
    applying: boolean | null;
    transitSign: ZodiacSign;
    transitHouse: number | null;
    natalSign: ZodiacSign | null;
    natalHouse: number | null;
};

type TransitNatalEventDraft = {
    transitPlanet: Planet;
    natalBody: Planet;
    aspect: AspectObject["aspect"];
    natalHouse: number | null;
    natalSign: ZodiacSign;
    transitHouse: number | null;
    transitSign: ZodiacSign;
    samples: RangeAspectSample[];
};

type TransitTransitEventDraft = {
    planet1: Planet;
    planet2: Planet;
    aspect: AspectObject["aspect"];
    planet1House: number | null;
    planet1Sign: ZodiacSign;
    planet2House: number | null;
    planet2Sign: ZodiacSign;
    samples: RangeAspectSample[];
};

type DailyRangeSample = {
    date: Date;
    dateKey: string;
    chart: ReturnType<typeof calculateBirthChart>;
};

const TONE_BY_ASPECT: Partial<Record<Aspect, number>> = {
    [Aspect.Conjunction]: 0,
    [Aspect.Opposition]: -0.6,
    [Aspect.Square]: -0.7,
    [Aspect.SemiSquare]: -0.4,
    [Aspect.Sesquiquadrate]: -0.4,
    [Aspect.Trine]: 0.8,
    [Aspect.Sextile]: 0.6,
    [Aspect.SemiSextile]: 0.2,
    [Aspect.Quincunx]: -0.2,
    [Aspect.Quintile]: 0.3,
    [Aspect.BiQuintile]: 0.3,
};

const PLANET_IMPORTANCE: Partial<Record<Planet, number>> = {
    [Planet.Sun]: 1.15,
    [Planet.Moon]: 1.05,
    [Planet.Mercury]: 0.95,
    [Planet.Venus]: 1,
    [Planet.Mars]: 1.05,
    [Planet.Jupiter]: 1.1,
    [Planet.Saturn]: 1.2,
    [Planet.Uranus]: 1.15,
    [Planet.Neptune]: 1.1,
    [Planet.Pluto]: 1.2,
    [Planet.Ascendant]: 1.15,
    [Planet.MidHeaven]: 1.15,
    [Planet.Descendant]: 1.1,
    [Planet.Nadir]: 1.1,
};

function dateKey(date: Date) {
    return date.toISOString().slice(0, 10);
}

function isoDate(year: number, month: number, day: number) {
    return new Date(Date.UTC(year, month - 1, day));
}

function getAspectOrb(aspectName: Aspect) {
    return ASPECTS.find((aspect) => aspect.name === aspectName)?.orb ?? 10;
}

function findBody(bodies: ChartBody[], name: Planet) {
    return bodies.find((body) => body.name === name);
}

function aspectKey(...parts: (string | number)[]) {
    return parts.join("|");
}

function withApplying(samples: RangeAspectSample[]) {
    return samples.map((sample, index) => {
        const previous = samples[index - 1];
        const next = samples[index + 1];

        if (previous) {
            return {
                ...sample,
                applying: sample.orb < previous.orb,
            };
        }

        if (next) {
            return {
                ...sample,
                applying: next.orb < sample.orb,
            };
        }

        return sample;
    });
}

function scoreEvent(
    samples: RangeAspectSample[],
    aspectName: Aspect,
    bodies: Planet[],
) {
    const aspectOrb = getAspectOrb(aspectName);
    const minimumOrb = Math.min(...samples.map((sample) => sample.orb));
    const exactness = Math.max(0.1, 1 - minimumOrb / aspectOrb);
    const duration = Math.min(1.5, samples.length / 7);
    const planetScore =
        bodies.reduce(
            (total, planet) => total + (PLANET_IMPORTANCE[planet] ?? 0.9),
            0,
        ) / bodies.length;

    return Number((exactness * duration * planetScore * 100).toFixed(3));
}

function finaliseEventBase(
    samples: RangeAspectSample[],
    aspectName: Aspect,
    bodies: Planet[],
) {
    const samplesWithMotion = withApplying(samples);
    const peak = samplesWithMotion.reduce((best, sample) =>
        sample.orb < best.orb ? sample : best,
    );
    const firstSample = samplesWithMotion[0]!;
    const lastSample = samplesWithMotion[samplesWithMotion.length - 1]!;
    const importance = scoreEvent(samplesWithMotion, aspectName, bodies);

    return {
        firstSeen: firstSample.date,
        activeFrom: firstSample.date,
        exactPeakTime: peak.orb <= 0.25 ? `${peak.date}T12:00:00.000Z` : null,
        activeUntil: lastSample.date,
        minimumOrb: peak.orb,
        minimumOrbDate: peak.date,
        orbAtStart: firstSample.orb,
        orbAtEnd: lastSample.orb,
        applyingAtStart: firstSample.applying,
        separatingAtEnd:
            lastSample.applying === null ? null : !lastSample.applying,
        exactInRange: peak.orb <= 0.25,
        importance,
        rank: 0,
        samples: samplesWithMotion,
    };
}

function addSummary(
    counts: Map<string, { count: number; score: number }>,
    key: string | number | null,
    score: number,
) {
    if (key === null) {
        return;
    }

    const name = String(key);
    const current = counts.get(name) ?? { count: 0, score: 0 };

    counts.set(name, {
        count: current.count + 1,
        score: Number((current.score + score).toFixed(3)),
    });
}

function rankedCounts(counts: Map<string, { count: number; score: number }>) {
    return [...counts.entries()]
        .map(([name, value]) => ({
            name,
            count: value.count,
            score: value.score,
        }))
        .sort((a, b) => b.score - a.score || b.count - a.count)
        .slice(0, 8);
}

function sortAndRank<T extends { importance: number; rank: number }>(
    events: T[],
) {
    return events
        .sort((a, b) => b.importance - a.importance)
        .map((event, index) => ({
            ...event,
            rank: index + 1,
        }));
}

function getStationType(wasRetrograde: boolean, isRetrograde: boolean) {
    return !wasRetrograde && isRetrograde ? "retrograde" : "direct";
}

function calculateToneScore(
    events: { aspect: { name: Aspect }; importance: number }[],
) {
    const totalWeight = events.reduce(
        (total, event) => total + event.importance,
        0,
    );

    if (totalWeight === 0) {
        return null;
    }

    const weightedTone = events.reduce(
        (total, event) =>
            total + (TONE_BY_ASPECT[event.aspect.name] ?? 0) * event.importance,
        0,
    );

    return Number((weightedTone / totalWeight).toFixed(3));
}

function collectNatalEvents(
    dailySamples: DailyRangeSample[],
    natalBodies: ChartBody[],
) {
    const eventMap = new Map<string, TransitNatalEventDraft>();

    for (const sample of dailySamples) {
        const transitBodies = sample.chart.planets;
        const aspects = computeAspectsBetweenCharts(natalBodies, transitBodies);

        for (const aspect of aspects) {
            const natalBody = findBody(natalBodies, aspect.planet1.name);
            const transitBody = findBody(transitBodies, aspect.planet2.name);

            if (!natalBody || !transitBody) {
                continue;
            }

            const key = aspectKey(
                aspect.planet2.name,
                aspect.planet1.name,
                aspect.aspect.name,
            );
            const existing = eventMap.get(key);
            const draft =
                existing ??
                ({
                    transitPlanet: transitBody.name,
                    natalBody: natalBody.name,
                    aspect: aspect.aspect,
                    natalHouse: natalBody.houseNumber,
                    natalSign: natalBody.zodiac.name,
                    transitHouse: transitBody.houseNumber,
                    transitSign: transitBody.zodiac.name,
                    samples: [],
                } satisfies TransitNatalEventDraft);

            draft.samples.push({
                date: sample.dateKey,
                orb: Number(aspect.orb.toFixed(6)),
                applying: null,
                transitSign: transitBody.zodiac.name,
                transitHouse: transitBody.houseNumber,
                natalSign: natalBody.zodiac.name,
                natalHouse: natalBody.houseNumber,
            });
            eventMap.set(key, draft);
        }
    }

    return sortAndRank(
        [...eventMap.values()].map((draft) => ({
            transitPlanet: draft.transitPlanet,
            natalBody: draft.natalBody,
            aspect: draft.aspect,
            natalHouse: draft.natalHouse,
            natalSign: draft.natalSign,
            transitHouse: draft.transitHouse,
            transitSign: draft.transitSign,
            ...finaliseEventBase(draft.samples, draft.aspect.name, [
                draft.transitPlanet,
                draft.natalBody,
            ]),
        })),
    );
}

function collectTransitTransitEvents(dailySamples: DailyRangeSample[]) {
    const eventMap = new Map<string, TransitTransitEventDraft>();

    for (const sample of dailySamples) {
        const transitBodies = sample.chart.planets;
        const aspects = computeAspects(transitBodies, "transit-to-transit");

        for (const aspect of aspects) {
            const body1 = findBody(transitBodies, aspect.planet1.name);
            const body2 = findBody(transitBodies, aspect.planet2.name);

            if (!body1 || !body2) {
                continue;
            }

            const key = aspectKey(body1.name, body2.name, aspect.aspect.name);
            const existing = eventMap.get(key);
            const draft =
                existing ??
                ({
                    planet1: body1.name,
                    planet2: body2.name,
                    aspect: aspect.aspect,
                    planet1House: body1.houseNumber,
                    planet1Sign: body1.zodiac.name,
                    planet2House: body2.houseNumber,
                    planet2Sign: body2.zodiac.name,
                    samples: [],
                } satisfies TransitTransitEventDraft);

            draft.samples.push({
                date: sample.dateKey,
                orb: Number(aspect.orb.toFixed(6)),
                applying: null,
                transitSign: body1.zodiac.name,
                transitHouse: body1.houseNumber,
                natalSign: body2.zodiac.name,
                natalHouse: body2.houseNumber,
            });
            eventMap.set(key, draft);
        }
    }

    return sortAndRank(
        [...eventMap.values()].map((draft) => ({
            planet1: draft.planet1,
            planet2: draft.planet2,
            aspect: draft.aspect,
            planet1House: draft.planet1House,
            planet1Sign: draft.planet1Sign,
            planet2House: draft.planet2House,
            planet2Sign: draft.planet2Sign,
            ...finaliseEventBase(draft.samples, draft.aspect.name, [
                draft.planet1,
                draft.planet2,
            ]),
        })),
    );
}

function collectIngresses(dailySamples: DailyRangeSample[]) {
    const ingresses: CalculateTransitRangeResponse["ingresses"] = [];

    for (let i = 1; i < dailySamples.length; i++) {
        const previous = dailySamples[i - 1]!;
        const current = dailySamples[i]!;

        for (const planet of current.chart.planets) {
            const previousPlanet = findBody(
                previous.chart.planets,
                planet.name,
            );

            if (
                !previousPlanet ||
                previousPlanet.zodiac.name === planet.zodiac.name
            ) {
                continue;
            }

            ingresses.push({
                planet: planet.name,
                fromSign: previousPlanet.zodiac.name,
                toSign: planet.zodiac.name,
                exactTimestamp: null,
                firstSeenDate: current.dateKey,
                houseAfterIngress: planet.houseNumber,
            });
        }
    }

    return ingresses;
}

function collectRetrogrades(dailySamples: DailyRangeSample[]) {
    const retrogrades: CalculateTransitRangeResponse["retrogrades"] = [];

    for (let i = 1; i < dailySamples.length; i++) {
        const previous = dailySamples[i - 1]!;
        const current = dailySamples[i]!;

        for (const planet of current.chart.planets) {
            const previousPlanet = findBody(
                previous.chart.planets,
                planet.name,
            );

            if (
                !previousPlanet ||
                previousPlanet.isRetrograde === planet.isRetrograde
            ) {
                continue;
            }

            retrogrades.push({
                planet: planet.name,
                stationType: getStationType(
                    previousPlanet.isRetrograde,
                    planet.isRetrograde,
                ),
                exactTimestamp: null,
                firstSeenDate: current.dateKey,
                sign: planet.zodiac.name,
                degree: planet.degree,
            });
        }
    }

    return retrogrades;
}

function collectMoonEvents(dailySamples: DailyRangeSample[]) {
    return dailySamples.slice(1).map((sample) => {
        const majorMoonAspects = sample.chart.aspects.filter(
            (aspect) =>
                (aspect.planet1.name === Planet.Moon ||
                    aspect.planet2.name === Planet.Moon) &&
                aspect.aspect.id <= 6,
        );

        return {
            date: sample.dateKey,
            moonSign: sample.chart.signs.moon as ZodiacMoonSignObject,
            voidOfCourseWindows: [],
            majorMoonAspects,
        };
    });
}

function buildSummary(
    sampleCount: number,
    natalEvents: CalculateTransitRangeResponse["transitNatalEvents"],
    transitEvents: CalculateTransitRangeResponse["transitTransitEvents"],
) {
    const planetCounts = new Map<string, { count: number; score: number }>();
    const houseCounts = new Map<string, { count: number; score: number }>();
    const signCounts = new Map<string, { count: number; score: number }>();
    const aspectCounts = new Map<string, { count: number; score: number }>();

    for (const event of natalEvents) {
        addSummary(planetCounts, event.transitPlanet, event.importance);
        addSummary(planetCounts, event.natalBody, event.importance);
        addSummary(houseCounts, event.transitHouse, event.importance);
        addSummary(houseCounts, event.natalHouse, event.importance);
        addSummary(signCounts, event.transitSign, event.importance);
        addSummary(signCounts, event.natalSign, event.importance);
        addSummary(aspectCounts, event.aspect.name, event.importance);
    }

    for (const event of transitEvents) {
        addSummary(planetCounts, event.planet1, event.importance);
        addSummary(planetCounts, event.planet2, event.importance);
        addSummary(houseCounts, event.planet1House, event.importance);
        addSummary(houseCounts, event.planet2House, event.importance);
        addSummary(signCounts, event.planet1Sign, event.importance);
        addSummary(signCounts, event.planet2Sign, event.importance);
        addSummary(aspectCounts, event.aspect.name, event.importance);
    }

    return {
        dominantPlanets: rankedCounts(planetCounts).map((item) => ({
            planet: item.name as Planet,
            count: item.count,
            score: item.score,
        })),
        dominantHouses: rankedCounts(houseCounts).map((item) => ({
            houseNumber: Number(item.name),
            count: item.count,
            score: item.score,
        })),
        dominantSigns: rankedCounts(signCounts).map((item) => ({
            sign: item.name as ZodiacSign,
            count: item.count,
            score: item.score,
        })),
        dominantAspectTypes: rankedCounts(aspectCounts).map((item) => ({
            aspect: item.name as Aspect,
            count: item.count,
            score: item.score,
        })),
        overallToneScore: calculateToneScore([
            ...natalEvents,
            ...transitEvents,
        ]),
        sampleCount,
    };
}

export function calculateTransitsForRange(
    birthDate: Date,
    birthLat: number,
    birthLon: number,
    transitStartDate: Date,
    transitEndDate: Date,
    transitLat: number,
    transitLon: number,
    timezone = "UTC",
) {
    if (transitStartDate > transitEndDate) {
        throw new Error(
            "Transit start date must be before or equal to end date",
        );
    }

    const totalDays = differenceInCalendarDays(
        transitEndDate,
        transitStartDate,
    );

    if (totalDays > 31) {
        throw new Error("Transit range cannot exceed 31 days");
    }

    const natalChart = calculateBirthChart(birthDate, birthLat, birthLon);
    const natalBodies = [...natalChart.planets, ...natalChart.angles];
    const dailySamples: DailyRangeSample[] = [];
    const samplingStart = addDays(transitStartDate, -1);

    for (let offset = 0; offset <= totalDays + 1; offset++) {
        const date = addDays(samplingStart, offset);
        dailySamples.push({
            date,
            dateKey: dateKey(date),
            chart: calculateBirthChart(date, transitLat, transitLon),
        });
    }

    const activeSamples = dailySamples.slice(1);
    const transitNatalEvents = collectNatalEvents(activeSamples, natalBodies);
    const transitTransitEvents = collectTransitTransitEvents(activeSamples);

    return {
        range: {
            startDate: dateKey(transitStartDate),
            endDate: dateKey(transitEndDate),
            timezone,
        },
        summaryData: buildSummary(
            activeSamples.length,
            transitNatalEvents,
            transitTransitEvents,
        ),
        transitNatalEvents,
        transitTransitEvents,
        ingresses: collectIngresses(dailySamples).filter(
            (ingress) => ingress.firstSeenDate >= dateKey(transitStartDate),
        ),
        retrogrades: collectRetrogrades(dailySamples).filter(
            (retrograde) =>
                retrograde.firstSeenDate >= dateKey(transitStartDate),
        ),
        moonEvents: collectMoonEvents(dailySamples),
    } satisfies CalculateTransitRangeResponse;
}

export function createUtcDate(year: number, month: number, day: number) {
    return isoDate(year, month, day);
}
