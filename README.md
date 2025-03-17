[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/floffah/astrocalc)

TODO:
- [ ] Get birth chart
  - [x] Get sun, moon, and rising sign
  - [ ] Get houses
  - [ ] Get aspects
- [ ] Get transit chart

- [ ] Cleanup & refactor code

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

## Future changes

- Planetary positions are currently calculated based on Keplerian orbital elements (https://stjarnhimlen.se/comp/ppcomp.html#3) but to make the calculations more accurate, the VSOP87 theory will be used (https://en.wikipedia.org/wiki/VSOP_(planets)).
  - VSOP87 Sources to be used can be found here (https://github.com/ctdk/vsop87)