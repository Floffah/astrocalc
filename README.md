[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/floffah/astrocalc)

Links:
- Production deployment - https://astrocalc-api.onrender.com (note that this is on the free plan, if no one has visited the site in a while it may take up to 50 seconds to load)
- API Docs - https://floffah.github.io/astrocalc/

TODO:
- [ ] Get birth chart
  - [x] Get sun, moon, and rising sign
  - [x] Get houses
  - [ ] Get aspects
- [ ] Get transit chart

- [ ] Cleanup & refactor code

## Astrological systems used

- Western Astrology
- Zodiac: Tropical
- Planets: Traditional (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) + Uranus, Neptune, Pluto
- Aspects: Conjunction, Opposition, Trine, Square, Sextile
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