import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    writeFileSync,
} from "fs";
import { join } from "path";

const inputDir = "vsop87";
const outputBaseDir = "vsop87-json";
const outputDir = join(outputBaseDir, "c");

// Ensure output directory exists
if (!existsSync(outputBaseDir)) {
    mkdirSync(outputBaseDir);
}

if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
}

// Parser function to process VSOP87C files into X,Y,Z coordinates
function parseVSOP87C(content: string) {
    const lines = content.split("\n");
    const result: any = { X: [], Y: [], Z: [] };

    let currentVar = "";

    for (const line of lines) {
        if (line.trim().startsWith("VSOP87 VERSION")) {
            if (line.includes("VARIABLE 1")) currentVar = "X";
            else if (line.includes("VARIABLE 2")) currentVar = "Y";
            else if (line.includes("VARIABLE 3")) currentVar = "Z";
            continue;
        }

        if (!currentVar || line.trim() === "") continue;

        const parts = line.trim().split(/\s+/);

        if (parts.length >= 18) {
            const term = {
                index: parseInt(parts[1]!),
                coefficients: parts.slice(2, 14).map(Number),
                amplitude: parseFloat(parts[14]!),
                phase: parseFloat(parts[15]!),
                frequency: parseFloat(parts[15]!),
                reference: parseFloat(parts[17]!),
            };

            result[currentVar].push(term);
        }
    }

    return result;
}

// Process and convert each VSOP87C faidhle
const files = readdirSync(inputDir).filter((file) =>
    file.startsWith("VSOP87C."),
);

files.forEach((file) => {
    const content = readFileSync(join(inputDir, file), "utf-8");
    const parsedData = parseVSOP87C(content);

    const planetName = file
        .replace("VSOP87C.", "")
        .toLowerCase()
        .replace(".", "_");
    const outputPath = join(
        outputDir,
        `${parsedData.planet?.toLowerCase() || planetName}.json`,
    );

    writeFileSync(
        outputDir + "/" + file.replace("VSOP87C.", "").toLowerCase() + ".json",
        JSON.stringify(parsedData, null, 2),
    );

    console.log(
        `✅ Processed ${file} → ${outputDir}/${file.replace("VSOP87C.", "").toLowerCase()}.json`,
    );
});

console.log("🎉 VSOP87C files successfully converted to structured JSON!");
