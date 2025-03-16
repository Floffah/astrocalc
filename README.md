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


## LFS

I utilise Git LFS to store large files such as the VSOP87 data. To install Git LFS, run the following two commands:

```bash
brew install git-lfs
git lfs install
```

The files needed are:
- `data/VSOP87_full.nc` (1.1gb) sourced from the LASP Interactive Solar Irradiance Datacenter (LISIRD) (https://lasp.colorado.edu/lisird/data/lasp_vsop87_1au_correction_PT1M)

## Third Party Licenses

### VSOP87 Data

The results presented in this document rely on data produced by the Laboratory for Atmospheric and Space Physics (LASP) which implement the VSOP87 model described in Bretagnon et al. 1988 (https://adsabs.harvard.edu/full/1988A%26A...202..309B). These data were accessed via the LASP Interactive Solar Irradiance Datacenter (LISIRD) (https://lasp.colorado.edu/lisird/).
