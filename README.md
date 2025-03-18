[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/floffah/astrocalc)

Links:
- Production deployment - https://astrocalc-api.onrender.com (note that this is on the free plan, if no one has visited the site in a while it may take up to 50 seconds to load)
- API Docs - https://floffah.github.io/astrocalc/

TODO:
- [x] Get birth chart
  - [x] Get sun, moon, and rising sign
  - [x] Get houses
  - [x] Get aspects, angles, & declinations
- [ ] Get transit chart

- [ ] Cleanup & refactor code

## Astrological systems used

- Western Astrology
- Zodiac: Tropical
- Planets: Traditional (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) + Uranus, Neptune, Pluto. Additionally, Chiron, Lillith, True North Node, True South Node
- Aspects: Conjunction, Opposition, Trine, Square, Sextile, Semi Square, Sesquiquadrate, Semi Sextile, Quincunx, Quintile, Bi Quintile, Parallel, Contra Parallel
- Houses: Placidius (Swiss Ephemeris)
- Calculations based on VSOP87 data (astronomia)

# astrocalc

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Development

- Although this project uses bun, it requires node 22 to be installed (node gyp 127) so the native modules build correctly.

## (important) Licensing

This project is licensed under the AGPL license. I do not have a swiss ephemeris license, however I am using the OSS version of it and its associated data, which is published under a combination of the GNU GPL and GNU AGPL licenses, **if making a derivative work of this project, you must also publish your source code under that same license**. This is a legal requirement of the GNU GPL and GNU AGPL licenses. If you are unsure about the licensing of this project, please contact me at floffah@floffah.dev.
No code or data from Swiss Ephemeris is included in this project, instead it is provided as an NPM dependency and git submodule linking directly to the official astro.com published data. This project is not affiliated with astro.com or the Swiss Ephemeris project.
