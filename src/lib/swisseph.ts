import { resolve } from "path";
import sweph from "sweph";

export function setSwissephPath() {
    const ephePath = resolve(process.cwd(), "swisseph", "ephe");

    sweph.set_ephe_path(ephePath);
}
