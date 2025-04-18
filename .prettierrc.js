export default {
    trailingComma: "all",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    jsxBracketSameLine: false,
    arrowParens: "always",
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",

    tailwindConfig: "./tailwind.config.ts",
    tailwindFunctions: ["clsx"],

    importOrder: ["<THIRD_PARTY_MODULES>", "@/(.*)$", "\\./(.*)$"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderGroupNamespaceSpecifiers: true,

    plugins: ["@trivago/prettier-plugin-sort-imports"],
};
